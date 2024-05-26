<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\User;
use App\Message\EmailVerifyMessage;
use App\Security\EmailVerifier;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

/**
 * @implements ProcessorInterface<User, User|void>
 */
final readonly class UserRegistrationProcessor implements ProcessorInterface
{
    public function __construct(
        #[Autowire(service: 'api_platform.doctrine.orm.state.persist_processor')]
        private ProcessorInterface $processor,
        private UserPasswordHasherInterface $passwordHasher,
        private UrlGeneratorInterface $router,
        private MessageBusInterface $bus
    ){
    }

    /**
     * @param User $data
     */
    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): User|null
    {
        if (!$data->getPlainPassword()) {
            return $this->processor->process($data, $operation, $uriVariables, $context);
        }

        $hashedPassword = $this->passwordHasher->hashPassword(
            $data,
            $data->getPlainPassword()
        );
        $data->setPassword($hashedPassword);
        $data->eraseCredentials();

        $result = $this->processor->process($data, $operation, $uriVariables, $context);

        $requestContext = $this->router->getContext();
        $this->bus->dispatch(new EmailVerifyMessage($data->getId(), $requestContext->getHttpPort(), $requestContext->getHttpsPort()));

        return $result;
    }
}
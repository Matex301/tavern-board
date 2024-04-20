<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\Quest;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Bundle\SecurityBundle\Security;

class QuestRegistrationProcessor implements ProcessorInterface
{
    public function __construct(
        #[Autowire(service: 'api_platform.doctrine.orm.state.persist_processor')]
        private ProcessorInterface $processor,
        private Security $security
    ){
    }

    /**
     * @param Quest $data
     */
    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): Quest|null
    {
        $user = $this->security->getUser();
        if (!$user) {
            return $this->processor->process($data, $operation, $uriVariables, $context);
        }

        $data->setCreator($user);

        return $this->processor->process($data, $operation, $uriVariables, $context);
    }
}
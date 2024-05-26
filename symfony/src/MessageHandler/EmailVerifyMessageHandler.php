<?php

namespace App\MessageHandler;

use App\Message\EmailVerifyMessage;
use App\Repository\UserRepository;
use App\Security\EmailVerifier;
use Symfony\Component\Messenger\Attribute\AsMessageHandler;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mime\Address;

#[AsMessageHandler]
class EmailVerifyMessageHandler
{
    public function __construct(
        private UrlGeneratorInterface $router,
        private UserRepository $userRepository,
        private EmailVerifier $emailVerifier
    ){
    }

    public function __invoke(EmailVerifyMessage $verifyMessage): void
    {
        $user = $this->userRepository->find($verifyMessage->getUserId());
        $this->router->setContext($this->router->getContext()->setHttpPort($verifyMessage->getHttpPort()));
        $this->router->setContext($this->router->getContext()->setHttpsPort($verifyMessage->getHttpsPort()));

        $this->emailVerifier->sendEmailConfirmation('api_verify', $user,
            (new TemplatedEmail())
                ->from(new Address('mailer@tavern-board.local', 'Tavern Board'))
                ->to($user->getEmail())
                ->subject('Please confirm your email')
                ->htmlTemplate('registration/confirmation_email.html.twig')
        );
    }
}
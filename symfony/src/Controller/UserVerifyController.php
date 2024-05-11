<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Security\EmailVerifier;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\AsController;
use SymfonyCasts\Bundle\VerifyEmail\Exception\VerifyEmailExceptionInterface;
use Symfony\Component\Routing\Attribute\Route;

#[AsController]
class UserVerifyController extends AbstractController
{
    public function __construct(
        private EmailVerifier $emailVerifier
    ){
    }

    #[Route('/api/verify', name: 'api_verify')]
    public function __invoke(Request $request, UserRepository $userRepository): Response
    {
        $id = $request->query->get('id');

        if (null === $id) {
            return new Response(null, Response::HTTP_NOT_FOUND);
        }

        $user = $userRepository->find($id);

        if (null === $user) {
            return new Response(null, Response::HTTP_NOT_FOUND);
        }

        try {
            $this->emailVerifier->handleEmailConfirmation($request, $user);
        } catch (VerifyEmailExceptionInterface $exception) {
            return new Response($exception, Response::HTTP_NOT_FOUND);
        }

        return new Response(null, Response::HTTP_OK);
    }
}
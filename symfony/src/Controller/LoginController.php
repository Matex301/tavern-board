<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use App\Entity\User;
use Symfony\Component\Security\Http\Attribute\CurrentUser;

class LoginController extends AbstractController
{
    #[Route('/api/login', name: 'api_login', methods: ['POST'])]
    public function login(#[CurrentUser] ?User $user): JsonResponse
    {
        if (null === $user) {
            return $this->json([
                'message' => 'Missing credentials.',
            ], JsonResponse::HTTP_UNAUTHORIZED);
        }

        if(false === $user->isVerified()) {
            return $this->json([
                'message' => 'Check your email to verify the account.',
            ], JsonResponse::HTTP_UNAUTHORIZED);
        }

        return $this->json([
            'uuid'  => $user->getId()
        ]);
    }

    #[Route('/api/logout', name: 'api_logout', methods: ['GET', 'POST'])]
    public function logout(#[CurrentUser] ?User $user, Security $security): JsonResponse
    {
        if (null === $user) {
            return $this->json([
                null
            ], JsonResponse::HTTP_NO_CONTENT);
        }

        $response = $security->logout(false);

        return $this->json([
            'message' => 'Successfully logged out.',
        ], JsonResponse::HTTP_OK);
    }
}

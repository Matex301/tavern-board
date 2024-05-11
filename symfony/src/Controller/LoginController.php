<?php

namespace App\Controller;

use ApiPlatform\Metadata\ApiResource;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use App\Entity\User;
use Symfony\Component\Security\Http\Attribute\CurrentUser;

class LoginController extends AbstractController
{/*
    #[Route('/api/login', name: 'api_login', methods: ['POST'])]
    public function login(#[CurrentUser] ?User $user): JsonResponse
    {
        return $this->json([
            'uuid'  => $user->getId()
        ]);
    }*/
    /*
    #[Route('/api/logout', name: 'api_logout', methods: ['GET', 'POST'])]
    public function logout(#[CurrentUser] ?User $user, Security $security): JsonResponse
    {
        $response = $security->logout(false);

        return $this->json([
            'message' => 'Successfully logged out.',
        ], Response::HTTP_OK);
    }*/
}

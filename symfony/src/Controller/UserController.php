<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Uid\Uuid;

class UserController extends AbstractController
{
    #[Route('/api/users', name: 'api_users', methods: ['GET'])]
    public function users(Request $request ,UserRepository $userRepository) : JsonResponse
    {
        $page = $request->query->getInt('page', 1);
        $pagination = $userRepository->findAllPagination($page);

        return $this->json([
            $pagination,
        ], Response::HTTP_OK);
    }

    #[Route('/api/users/{id}', name: 'api_users_id', methods: ['GET'])]
    public function user(UserRepository $userRepository, String $id) : JsonResponse
    {
        if(!Uuid::isValid($id)) {
            return $this->json([
                'message' => 'Invalid uuid',
            ], Response::HTTP_CONFLICT);
        }

        $user = $userRepository->find($id);

        if(!$user) {
            return $this->json([
                'message' => 'User not found',
            ], Response::HTTP_NOT_FOUND);
        }

        return $this->json([
            $user,
        ], Response::HTTP_OK);
    }
}
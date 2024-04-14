<?php

namespace App\Controller;

use App\Repository\QuestRepository;
use App\Repository\UserRepository;
use App\Entity\User;
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
    public function user(UserRepository $userRepository, User $user) : JsonResponse
    {
        return $this->json([
            $user,
        ], Response::HTTP_OK);
    }

    #[Route('/api/users/{id}/created', name: 'api_users_created', methods: ['GET'])]
    public function created(Request $request, QuestRepository $questRepository, Uuid $id) : JsonResponse
    {
        $page = $request->query->getInt('page', 1);
        $pagination = $questRepository->findByCreatorPagination($page, $id);

        return $this->json([
            $pagination,
        ], Response::HTTP_OK);
    }

    #[Route('/api/users/{id}/joined', name: 'api_users_joined', methods: ['GET'])]
    public function joined(Request $request, QuestRepository $questRepository, Uuid $id) : JsonResponse
    {
        $page = $request->query->getInt('page', 1);
        $pagination = $questRepository->findByJoinedPagination($page, $id);

        return $this->json([
            $pagination,
        ], Response::HTTP_OK);
    }
}
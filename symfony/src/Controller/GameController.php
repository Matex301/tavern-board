<?php

namespace App\Controller;

use App\Repository\GameRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;
use Symfony\Component\Uid\Uuid;

class GameController extends AbstractController
{
    #[Route('/api/games', name: 'api_games', methods: ['GET'])]
    public function users(Request $request ,GameRepository $gameRepository) : JsonResponse
    {
        $page = $request->query->getInt('page', 1);
        $pagination = $gameRepository->findAllPagination($page);

        return $this->json([
            $pagination,
        ], Response::HTTP_OK);
    }

    #[Route('/api/games/{id}', name: 'api_games_id', methods: ['GET'])]
    public function user(GameRepository $gameRepository, String $id) : JsonResponse
    {
        if(!Uuid::isValid($id)) {
            return $this->json([
                'message' => 'Invalid uuid',
            ], Response::HTTP_CONFLICT);
        }

        $user = $gameRepository->find($id);

        if(!$user) {
            return $this->json([
                'message' => 'Game not found',
            ], Response::HTTP_NOT_FOUND);
        }

        return $this->json([
            $user,
        ], Response::HTTP_OK);
    }

    #[Route('/api/games', name: 'api_games_create', methods: ['POST'])]
    public function create(#[CurrentUser] $user) : JsonResponse
    {
        if (null === $user) {
            throw $this->createAccessDeniedException('Access Denied.');
        }


    }
}
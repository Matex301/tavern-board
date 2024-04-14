<?php

namespace App\Controller;

use App\Entity\Game;
use App\Repository\GameRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;
use Symfony\Component\Uid\Uuid;
use Symfony\Component\Validator\Validator\ValidatorInterface;

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
    public function user(GameRepository $gameRepository, Game $game) : JsonResponse
    {
        return $this->json([
            $game,
        ], Response::HTTP_OK);
    }

    #[Route('/api/games', name: 'api_games_create', methods: ['POST'])]
    public function create(#[CurrentUser] $user, Request $request, EntityManagerInterface $entityManager, ValidatorInterface $validator) : JsonResponse
    {
        $game = new Game();

        $game->setName($request->getPayload()->getString('name'));
        $game->setDescription($request->getPayload()->getString('description'));
        $game->setMinPlayers($request->getPayload()->getInt('min_players'));
        $game->setMaxPlayer($request->getPayload()->getInt('max_players'));


        $errors = $validator->validate($game);
        if (count($errors) > 0) {
            $errorsString = (string) $errors;
            return $this->json([
                'message' => $errorsString,
            ], Response::HTTP_CONFLICT);
        }

        $entityManager->persist($game);
        $entityManager->flush();

        return $this->json([
            'message' => 'Creation accepted.',
        ], Response::HTTP_ACCEPTED);
    }
}
<?php

namespace App\Controller;

use App\Repository\QuestRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Uid\Uuid;

class QuestController extends AbstractController
{
    #[Route('/api/quests', name: 'api_quests', methods: ['GET'])]
    public function users(Request $request ,QuestRepository $questRepository) : JsonResponse
    {
        $page = $request->query->getInt('page', 1);
        $parameters = json_decode($request->getContent(), true);
        $date = $parameters['date'] ?? new \DateTimeImmutable();
        $pagination = $questRepository->findAllPagination($page, $date);

        return $this->json([
            $pagination,
        ], Response::HTTP_OK);
    }

    #[Route('/api/quests/{id}', name: 'api_quests_id', methods: ['GET'])]
    public function user(QuestRepository $questRepository, String $id) : JsonResponse
    {
        if(!Uuid::isValid($id)) {
            return $this->json([
                'message' => 'Invalid uuid',
            ], Response::HTTP_CONFLICT);
        }

        $user = $questRepository->find($id);

        if(!$user) {
            return $this->json([
                'message' => 'Quest not found',
            ], Response::HTTP_NOT_FOUND);
        }

        return $this->json([
            $user,
        ], Response::HTTP_OK);
    }
}
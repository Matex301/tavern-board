<?php

namespace App\Controller;

use App\Repository\TavernRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Uid\Uuid;

class TavernController extends AbstractController
{
    #[Route('/api/taverns', name: 'api_taverns', methods: ['GET'])]
    public function users(Request $request ,TavernRepository $tavernRepository) : JsonResponse
    {
        $page = $request->query->getInt('page', 1);
        $pagination = $tavernRepository->findAllPagination($page);

        return $this->json([
            $pagination,
        ], Response::HTTP_OK);
    }

    #[Route('/api/taverns/{id}', name: 'api_taverns_id', methods: ['GET'])]
    public function user(TavernRepository $tavernRepository, String $id) : JsonResponse
    {
        if(!Uuid::isValid($id)) {
            return $this->json([
                'message' => 'Invalid uuid',
            ], Response::HTTP_CONFLICT);
        }

        $user = $tavernRepository->find($id);

        if(!$user) {
            return $this->json([
                'message' => 'Tavern not found',
            ], Response::HTTP_NOT_FOUND);
        }

        return $this->json([
            $user,
        ], Response::HTTP_OK);
    }
}
<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
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
}
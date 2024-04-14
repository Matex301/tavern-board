<?php

namespace App\Controller;

use App\Entity\Address;
use App\Entity\Tavern;
use App\Repository\TavernRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;
use Symfony\Component\Uid\Uuid;
use Symfony\Component\Validator\Validator\ValidatorInterface;

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
    public function user(TavernRepository $tavernRepository, Tavern $tavern) : JsonResponse
    {
        return $this->json([
            $tavern,
        ], Response::HTTP_OK);
    }

    #[Route('/api/taverns', name: 'api_taverns_create', methods: ['POST'])]
    public function create(#[CurrentUser] $user, Request $request, EntityManagerInterface $entityManager, ValidatorInterface $validator) : JsonResponse
    {
        $tavern = new Tavern();

        $tavern->setName($request->getPayload()->getString('name'));
        $tavern->setWebsite($request->getPayload()->getString('website'));
        $tavern->setPhone($request->getPayload()->getString('phone'));
        $tavern->setAddress(new Address(
            $request->getPayload()->getString('country'),
            $request->getPayload()->getString('city'),
            $request->getPayload()->getString('street')
        ));

        $errors = $validator->validate($tavern);
        if (count($errors) > 0) {
            $errorsString = (string) $errors;
            return $this->json([
                'message' => $errorsString,
            ], Response::HTTP_CONFLICT);
        }

        $entityManager->persist($tavern);
        $entityManager->flush();

        return $this->json([
            'message' => 'Creation accepted.',
        ], Response::HTTP_ACCEPTED);
    }
}
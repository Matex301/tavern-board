<?php

namespace App\Controller;

use App\Entity\Game;
use App\Entity\Quest;
use App\Entity\Tavern;
use App\Repository\QuestRepository;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;
use Symfony\Component\Uid\Uuid;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Security\Http\Attribute\IsGranted;

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
    public function user(QuestRepository $questRepository, Quest $quest) : JsonResponse
    {
        return $this->json([
            $quest,
        ], Response::HTTP_OK);
    }

    #[Route('/api/quests', name: 'api_quests_create', methods: ['POST'])]
    public function create(#[CurrentUser] $user, Request $request, EntityManagerInterface $entityManager, ValidatorInterface $validator) : JsonResponse
    {
        $quest = new Quest();

        $game = $entityManager->getReference(Game::class, Uuid::fromString($request->getPayload()->getString('game')));
        $tavern = $entityManager->getReference(Tavern::class, Uuid::fromString($request->getPayload()->getString('tavern')));


        $quest->setTitle($request->getPayload()->getString('title'));
        $quest->setDescription($request->getPayload()->getString('description'));
        $quest->setTavern($tavern);
        $quest->setGame($game);
        $quest->setCreator($user);
        $quest->setMaxPlayers($request->getPayload()->getInt('max_players'));

        if($start_at = $request->getPayload()->getString('start_at'))
            $quest->setStartAt(new \DateTimeImmutable($start_at));

        if($end_at = $request->getPayload()->getString('end_at'))
            $quest->setEndAt(new \DateTimeImmutable($end_at));

        $errors = $validator->validate($quest);
        if (count($errors) > 0) {
            $errorsString = (string) $errors;
            return $this->json([
                'message' => $errorsString,
            ], Response::HTTP_CONFLICT);
        }

        $entityManager->persist($quest);
        $entityManager->flush();

        return $this->json([
            'message' => 'Creation accepted.',
        ], Response::HTTP_ACCEPTED);
    }

    #[Route('/api/quests/{id}/join', name: 'api_quests_join', methods: ['POST'])]
    public function join(#[CurrentUser] $user, EntityManagerInterface $entityManager, QuestRepository $questRepository, Uuid $id) : JsonResponse
    {
        if (null === $user) {
            throw $this->createAccessDeniedException('Access Denied.');
        }

        $quest = $questRepository->find($id);

        if(!$quest) {
            return $this->json([
                'message' => 'Quest not found',
            ], Response::HTTP_NOT_FOUND);
        }

        if($quest->getCreator() == $user) {
            return $this->json([
                'message' => 'Can join own quests.',
            ], Response::HTTP_CONFLICT);
        }

        $quest->addPlayer($user);

        $entityManager->persist($quest);
        $entityManager->flush();

        return $this->json([
            'message' => 'Quest joined.',
        ], Response::HTTP_ACCEPTED);
    }

    #[Route('/api/quests/{id}/join', name: 'api_quests_leave', methods: ['DELETE'])]
    public function leave(#[CurrentUser] $user, EntityManagerInterface $entityManager, QuestRepository $questRepository, Uuid $id) : JsonResponse
    {
        if (null === $user) {
            throw $this->createAccessDeniedException('Access Denied.');
        }

        $quest = $questRepository->find($id);

        if(!$quest) {
            return $this->json([
                'message' => 'Quest not found',
            ], Response::HTTP_NOT_FOUND);
        }

        if($quest->getCreator() == $user) {
            return $this->json([
                'message' => 'Can join own quests.',
            ], Response::HTTP_CONFLICT);
        }

        $quest->removePlayer($user);

        $entityManager->persist($quest);
        $entityManager->flush();

        return $this->json([
            'message' => 'Quest joined.',
        ], Response::HTTP_ACCEPTED);
    }
}
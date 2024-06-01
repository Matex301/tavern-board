<?php

namespace App\Controller;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpFoundation\Response;
use App\Entity\Quest;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\SerializerInterface;

#[AsController]
class QuestJoinController extends AbstractController
{
    public function __construct(
        private Security $security,
        private EntityManagerInterface $entityManager
    ) {
    }

    public function __invoke(Quest $quest, SerializerInterface $serializer): JsonResponse|Response
    {
        $user = $this->security->getUser();
        if (!$user) {
            return new Response(null, Response::HTTP_NOT_FOUND);
        }

        if($quest->getCreator() === $user) {
            return new Response(null, Response::HTTP_CONFLICT);
        }

        $quest->addPlayer($user);
        $this->entityManager->persist($quest);
        $this->entityManager->flush();

        return new JsonResponse($serializer->serialize($quest, 'json', [
            'groups' => ['quest:read']
        ]), Response::HTTP_OK, [], true);
    }
}
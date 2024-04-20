<?php

namespace App\Controller;

use App\Entity\Quest;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class QuestLeaveController extends AbstractController
{
    public function __construct(
        private Security $security,
        private EntityManagerInterface $entityManager
    ) {
    }

    public function __invoke(Quest $quest): Response
    {
        $user = $this->security->getUser();
        if (!$user) {
            return new Response(null, Response::HTTP_NOT_FOUND);
        }

        if($quest->getCreator() === $user) {
            return new Response(null, Response::HTTP_CONFLICT);
        }

        $quest->removePlayer($user);
        $this->entityManager->persist($quest);
        $this->entityManager->flush();

        return new Response(null, Response::HTTP_OK);
    }
}
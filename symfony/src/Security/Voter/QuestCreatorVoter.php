<?php

namespace App\Security\Voter;

use App\Entity\User;
use App\Repository\QuestRepository;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Uid\Uuid;

class QuestCreatorVoter extends Voter
{
    public function __construct(
        protected RequestStack $requestStack,
        protected QuestRepository $questRepository
    ){
    }
    protected function supports(string $attribute, mixed $subject): bool
    {
        return $attribute == 'QUEST_CREATOR';
    }

    protected function voteOnAttribute(string $attribute, mixed $subject, TokenInterface $token): bool
    {
        $user = $token->getUser();
        if(!$user instanceof User)
            return false;

        $url = $this->requestStack->getCurrentRequest()->getUri();
        $pattern = "/\/api\/quests\/.*\//";
        if(!preg_match($pattern, $url, $match))
            return false;

        $uri = $match[0];

        $start_text = "/api/quests/";
        $end_text = "/";
        $start_pos = strlen($start_text);
        $size = strpos($uri, $end_text, $start_pos) - $start_pos;
        $uuid = substr($uri, $start_pos, $size);

        $quest = $this->questRepository->find(new Uuid($uuid));

        if($user === $quest->getCreator())
            return true;
        return false;
    }
}
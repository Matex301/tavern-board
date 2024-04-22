<?php

namespace App\Security\Voter;

use App\Entity\User;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Uid\Uuid;
use Symfony\Component\HttpFoundation\RequestStack;

class UserIdVoter extends Voter
{
    public function __construct(
        protected RequestStack $requestStack
    ){
    }
    protected function supports(string $attribute, mixed $subject): bool
    {
        return $attribute == 'USER_ID';
    }

    protected function voteOnAttribute(string $attribute, mixed $subject, TokenInterface $token): bool
    {
        $user = $token->getUser();
        if(!$user instanceof User)
            return false;

        $url = $this->requestStack->getCurrentRequest()->getUri();
        $pattern = "/\/api\/users\/.*\//";
        if(!preg_match($pattern, $url, $match))
            return false;

        $uri = $match[0];

        $start_text = "/api/users/";
        $end_text = "/";
        $start_pos = strlen($start_text);
        $size = strpos($uri, $end_text, $start_pos) - $start_pos;
        $uuid = substr($uri, $start_pos, $size);

        if($user->getId()->compare(new Uuid($uuid)) == 0)
            return true;
        return false;
    }
}
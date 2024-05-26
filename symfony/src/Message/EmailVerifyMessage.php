<?php

namespace App\Message;

use Symfony\Component\Routing\RequestContext;
use Symfony\Component\Uid\Uuid;

class EmailVerifyMessage
{
    public function __construct(
        private Uuid $userId,
        private int $httpPort,
        private int $httpsPort,
    ){
    }

    public function getUserId(): Uuid
    {
        return $this->userId;
    }

    public function getHttpPort(): int
    {
        return $this->httpPort;
    }

    public function getHttpsPort(): int
    {
        return $this->httpsPort;
    }
}
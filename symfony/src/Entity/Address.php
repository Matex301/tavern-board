<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Attribute\Ignore;

#[ORM\Embeddable]
class Address
{
    #[ORM\Column(length: 80, nullable: false)]
    #[Groups(['tavern:read', 'tavern:create', 'tavern:update', 'quest:read'])]
    private string $street;

    #[ORM\Column(length: 80, nullable: false)]
    #[Groups(['tavern:read', 'tavern:create', 'tavern:update', 'quest:read'])]
    private string $city;

    #[ORM\Column(length: 80, nullable: false)]
    #[Groups(['tavern:read', 'tavern:create', 'tavern:update', 'quest:read'])]
    private string $country;

    public function __construct(string $country, string $city, string $street) {
        $this->country = $country;
        $this->city = $city;
        $this->street = $street;
    }

    public function getStreet(): string
    {
        return $this->street;
    }

    public function setStreet(string $street): void
    {
        $this->street = $street;
    }

    public function getCity(): string
    {
        return $this->city;
    }

    public function setCity(string $city): void
    {
        $this->city = $city;
    }

    public function getCountry(): string
    {
        return $this->country;
    }

    public function setCountry(string $country): void
    {
        $this->country = $country;
    }
/*
    public function __toString(): string
    {
        return $this->street . ', ' . $this->city . ', ' . $this->country;
    }
*/
}
<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Attribute\Ignore;

#[ORM\Embeddable]
class Address
{
    #[ORM\Column(length: 80, nullable: false)]
    #[Assert\NotBlank(groups: ['tavern:create'])]
    #[Groups(['tavern:read', 'tavern:create', 'tavern:update', 'tavern:list', 'quest:read', 'quest:collection'])]
    private string $street;

    #[ORM\Column(length: 80, nullable: false)]
    #[Assert\NotBlank(groups: ['tavern:create'])]
    #[Groups(['tavern:read', 'tavern:create', 'tavern:update', 'tavern:list', 'quest:read', 'quest:collection'])]
    private string $city;

    #[ORM\Column(length: 80, nullable: false)]
    #[Assert\NotBlank(groups: ['tavern:create'])]
    #[Groups(['tavern:read', 'tavern:create', 'tavern:update', 'tavern:list', 'quest:read', 'quest:collection'])]
    private string $country;

    #[ORM\Column(nullable: false)]
    #[Groups(['tavern:read', 'tavern:list'])]
    private float $latitude;

    #[ORM\Column(nullable: false)]
    #[Groups(['tavern:read', 'tavern:list'])]
    private float $longitude;

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

    public function getLatitude(): float
    {
        return $this->latitude;
    }

    public function setLatitude(float $latitude): void
    {
        $this->latitude = $latitude;
    }

    public function getLongitude(): float
    {
        return $this->longitude;
    }

    public function setLongitude(float $longitude): void
    {
        $this->longitude = $longitude;
    }

/*
    public function __toString(): string
    {
        return $this->street . ', ' . $this->city . ', ' . $this->country;
    }
*/
}
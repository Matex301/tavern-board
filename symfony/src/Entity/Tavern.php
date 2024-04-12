<?php

namespace App\Entity;

use App\Repository\TavernRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Types\UuidType;
use Symfony\Component\Serializer\Attribute\Ignore;
use Symfony\Component\Serializer\Attribute\SerializedName;
use Symfony\Component\Uid\Uuid;

#[ORM\Entity(repositoryClass: TavernRepository::class)]
class Tavern
{
    #[ORM\Id]
    #[ORM\Column(type: UuidType::NAME, unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'doctrine.uuid_generator')]
    private ?Uuid $id = null;

    #[ORM\Column(length: 255, nullable: false)]
    private ?string $name = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $website = null;

    #[ORM\Column(length: 15, nullable: true)]
    private ?string $phone = null;

    #[ORM\OneToMany(targetEntity: Quest::class, mappedBy: 'tavern')]
    private Collection $quests;

    #[ORM\Embedded(class: Address::class)]
    private Address $address;

    public function __construct()
    {
        $this->quests = new ArrayCollection();
    }

    public function getId(): ?Uuid
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getWebsite(): ?string
    {
        return $this->website;
    }

    public function setWebsite(?string $website): static
    {
        $this->website = $website;

        return $this;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(?string $phone): static
    {
        $this->phone = $phone;

        return $this;
    }

    /**
     * @return Collection<Uuid, Quest>
     */
    public function getQuests(): Collection
    {
        return $this->quests;
    }

    public function addQuest(Quest $quest): static
    {
        if (!$this->quests->contains($quest)) {
            $this->quests->add($quest);
            $quest->setTavern($this);
        }

        return $this;
    }

    public function removeQuest(Quest $quest): static
    {
        if ($this->quests->removeElement($quest)) {
            // set the owning side to null (unless already changed)
            if ($quest->getTavern() === $this) {
                $quest->setTavern(null);
            }
        }

        return $this;
    }

    #[Ignore]
    public function getAddress(): ?Address
    {
        return $this->address;
    }

    #[SerializedName('address')]
    public function getAddressSerializer(): ?string
    {
        return (string)$this->address;
    }

    public function setAddress(Address $address): static
    {
        $this->address = $address;

        return $this;
    }
}
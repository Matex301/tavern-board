<?php

namespace App\Entity;

use App\Repository\GameRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Types\UuidType;
use Symfony\Component\Uid\Uuid;

#[ORM\Entity(repositoryClass: GameRepository::class)]
class Game
{
    #[ORM\Id]
    #[ORM\Column(type: UuidType::NAME, unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'doctrine.uuid_generator')]
    private ?Uuid $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $description = null;

    #[ORM\Column(nullable: true)]
    private ?int $min_players = null;

    #[ORM\Column(nullable: true)]
    private ?int $max_player = null;

    #[ORM\OneToMany(targetEntity: Quest::class, mappedBy: 'game')]
    private Collection $quests;

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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getMinPlayers(): ?int
    {
        return $this->min_players;
    }

    public function setMinPlayers(?int $min_players): static
    {
        $this->min_players = $min_players;

        return $this;
    }

    public function getMaxPlayer(): ?int
    {
        return $this->max_player;
    }

    public function setMaxPlayer(?int $max_player): static
    {
        $this->max_player = $max_player;

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
            $quest->setGame($this);
        }

        return $this;
    }

    public function removeQuest(Quest $quest): static
    {
        if ($this->quests->removeElement($quest)) {
            // set the owning side to null (unless already changed)
            if ($quest->getGame() === $this) {
                $quest->setGame(null);
            }
        }

        return $this;
    }
}

<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Repository\GameRepository;
use App\State\UserPasswordHasherProcessor;
use App\State\UserRegistrationProcessor;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Types\UuidType;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Attribute\Ignore;
use Symfony\Component\Uid\Uuid;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource(
    operations: [
        new GetCollection(),
        new Post(security: "is_granted('ROLE_ADMIN')", validationContext: ['groups' => ['game:create']]),
        new Get(),
        new Patch(security: "is_granted('ROLE_ADMIN')"),
        new Delete(security: "is_granted('ROLE_ADMIN')"),
    ],
    normalizationContext: ['groups' => ['game:read']],
    denormalizationContext: ['groups' => ['game:create', 'game:update']],
)]
#[ORM\Entity(repositoryClass: GameRepository::class)]
class Game
{
    #[ORM\Id]
    #[ORM\Column(type: UuidType::NAME, unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'doctrine.uuid_generator')]
    #[Groups(['game:read'])]
    private ?Uuid $id = null;

    #[ORM\Column(length: 255, nullable: false)]
    #[Assert\NotBlank]
    #[Assert\Length(min: 1, max: 255)]
    #[Groups(['game:read', 'game:create', 'game:update'])]
    private ?string $name = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['game:read', 'game:create', 'game:update'])]
    private ?string $description = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['game:read', 'game:create', 'game:update'])]
    private ?string $image = null;

    #[ORM\Column(nullable: true)]
    #[Assert\GreaterThan(0)]
    #[Groups(['game:read', 'game:create', 'game:update'])]
    private ?int $minPlayers = null;

    #[ORM\Column(nullable: true)]
    #[Assert\GreaterThan(0)]
    #[Assert\GreaterThan(propertyPath: 'minPlayers')]
    #[Groups(['game:read', 'game:create', 'game:update'])]
    private ?int $maxPlayer = null;

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

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(string $imageUrl): static
    {
        $this->image = $imageUrl;

        return $this;
    }

    public function getMinPlayers(): ?int
    {
        return $this->minPlayers;
    }

    public function setMinPlayers(?int $minPlayers): static
    {
        $this->minPlayers = $minPlayers;

        return $this;
    }

    public function getMaxPlayer(): ?int
    {
        return $this->maxPlayer;
    }

    public function setMaxPlayer(?int $maxPlayer): static
    {
        $this->maxPlayer = $maxPlayer;

        return $this;
    }

    /**
     * @return array
     */
    public function getQuests(): array
    {
        return $this->quests->getValues();
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

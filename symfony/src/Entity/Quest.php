<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\DateFilter;
use ApiPlatform\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Link;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Controller\QuestLeaveController;
use App\Repository\QuestRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Types\UuidType;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Uid\Uuid;
use Symfony\Component\Validator\Constraints as Assert;
use App\State\QuestRegistrationProcessor;
use OpenApi\Attributes as OA;
use ApiPlatform\OpenApi\Model;
use App\Controller\QuestJoinController;

//TODO Allow admin role to add quest and join them on behalf of others

#[ApiResource(
    operations: [
        new GetCollection(normalizationContext: ['groups' => ['quest:collection']]),
        new Post(denormalizationContext: ['groups' => ['quest:create']], security: "is_granted('ROLE_USER')", validationContext: ['groups' => ['quest:create']], processor: QuestRegistrationProcessor::class,),
        new Get(),
        new Patch(security: "is_granted('ROLE_ADMIN') or (object.getCreator() == user)"),
        new Delete(security: "is_granted('ROLE_ADMIN') or (object.getCreator() == user)"),
        new Get(
            uriTemplate: "/quests/{id}/join",
            controller: QuestJoinController::class,
            openapi: new Model\Operation(
                responses: [
                    '200' => [
                        'schema' => [],
                        'example' => [],
                        'description' => "User added as a participant"
                    ]
                ],
                summary: "Add User as participant to the Quest",
                description: "The logged user is added as participant to the Quest. The owner of the Quest resource can not be added.",
                requestBody: new Model\RequestBody(
                    content: new \ArrayObject([
                        'application/json' => [
                            'schema' => [],
                            'example' => []
                        ]
                    ])
                )
            ),
            security: "is_granted('ROLE_USER')",
        ),
        new Delete(
            uriTemplate: "/quests/{id}/join",
            controller: QuestLeaveController::class,
            openapi: new Model\Operation(
                responses: [
                    '200' => [
                        'schema' => [],
                        'example' => [],
                        'description' => "User removed or was never a participant"
                    ]
                ],
                summary: "Remove User as participant to the Quest",
                description: "The logged user is removed as participant from the Quest. The same response is send if user is removed or never was a participant of the Quest.",
                requestBody: new Model\RequestBody(
                    content: new \ArrayObject([
                        'application/json' => [
                            'schema' => [],
                            'example' => []
                        ]
                    ])
                )
            ),
            security: "is_granted('ROLE_USER')",
        ),
        new GetCollection(
            uriTemplate: '/users/{id}/joined',
            uriVariables: [
                'id' => new Link(
                    fromProperty: 'joinedQuests',
                    fromClass: User::class,
                )
            ],
            normalizationContext: ['groups' => ['quest:collection']],
            security: 'is_granted("ROLE_ADMIN") or is_granted("USER_ID", object)'
        ),
        new GetCollection(
            uriTemplate: '/users/{id}/created',
            uriVariables: [
                'id' => new Link(
                    fromProperty: 'createdQuests',
                    fromClass: User::class,
                )
            ],
            normalizationContext: ['groups' => ['quest:collection']],
            security: 'is_granted("ROLE_ADMIN") or is_granted("USER_ID", object)'
        ),
    ],
    normalizationContext: ['groups' => ['quest:read']],
    denormalizationContext: ['groups' => ['quest:update']],
    order: ['startAt' => 'ASC'],
    securityMessage: "Access Denied"
)]
#[ORM\Entity(repositoryClass: QuestRepository::class)]
#[ApiFilter(SearchFilter::class, properties: ['game' => 'exact'])]
#[ORM\HasLifecycleCallbacks]
class Quest
{
    #[ORM\Id]
    #[ORM\Column(type: UuidType::NAME, unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'doctrine.uuid_generator')]
    #[Groups(['quest:read', 'quest:collection'])]
    private ?Uuid $id = null;

    #[ORM\Column(length: 255, nullable: false)]
    #[Assert\NotBlank]
    #[Assert\Length(min: 6, max: 255)]
    #[Groups(['quest:read', 'quest:collection', 'quest:create', 'quest:update'])]
    private ?string $title = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['quest:read', 'quest:collection', 'quest:create', 'quest:update'])]
    private ?string $description = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['quest:read', 'quest:collection', 'quest:create', 'quest:update'])]
    private ?string $image = null;

    #[ORM\ManyToOne(inversedBy: 'createdQuests')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['quest:read'])]
    #[ApiProperty(openapiContext: ['example' => '/api/users/018ed8dc-6a11-7abd-b9e4-43718ef2dfb0'])]
    private ?User $creator = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['quest:read', 'quest:create', 'quest:update'])]
    private ?int $maxPlayers = null;

    #[Groups(['quest:read'])]
    private ?int $currentPlayers = null;

    #[ORM\Column(nullable: false)]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\Column(nullable: false)]
    #[Assert\NotBlank]
    #[Groups(['quest:read', 'quest:collection', 'quest:create', 'quest:update'])]
    #[ApiFilter(DateFilter::class)]
    #[ApiFilter(OrderFilter::class)]
    private ?\DateTimeImmutable $startAt = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['quest:read', 'quest:collection', 'quest:create', 'quest:update'])]
    private ?\DateTimeImmutable $endAt = null;

    #[ORM\ManyToOne(inversedBy: 'quests')]
    #[ORM\JoinColumn(nullable: false)]
    #[Assert\NotBlank]
    #[Groups(['quest:read', 'quest:collection', 'quest:create'])]
    #[ApiProperty(openapiContext: ['example' => '/api/games/018ed86e-46ed-75a3-90ec-5c62c045cc20'])]
    private ?Game $game = null;

    #[ORM\ManyToOne(inversedBy: 'quests')]
    #[ORM\JoinColumn(nullable: false)]
    #[Assert\NotBlank]
    #[Groups(['quest:read', 'quest:collection', 'quest:create', 'quest:update'])]
    #[ApiProperty(openapiContext: ['example' => '/api/taverns/018ed86d-e18d-7552-9aeb-5ec34042a5d2'])]
    private ?Tavern $tavern = null;

    #[ORM\ManyToMany(targetEntity: User::class, mappedBy: 'joinedQuests')]
    #[Groups(['quest:read'])]
    private Collection $players;

    public function __construct()
    {
        $this->players = new ArrayCollection();
    }

    public function getId(): ?Uuid
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

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

    public function getCreator(): User
    {
        return $this->creator;
    }

    public function setCreator(User $creator): static
    {
        $this->creator = $creator;

        return $this;
    }

    public function getCurrentPlayers(): ?int
    {
        return $this->players->count();
    }

    public function getMaxPlayers(): ?int
    {
        return $this->maxPlayers;
    }

    public function setMaxPlayers(?int $maxPlayers): static
    {
        $this->maxPlayers = $maxPlayers;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    #[ORM\PrePersist]
    public function setCreatedAt(): void
    {
        $this->createdAt = new \DateTimeImmutable();
    }

    public function getStartAt(): ?\DateTimeImmutable
    {
        return $this->startAt;
    }

    public function setStartAt(\DateTimeImmutable $startAt): static
    {
        $this->startAt = $startAt;

        return $this;
    }

    public function getEndAt(): ?\DateTimeImmutable
    {
        return $this->endAt;
    }

    public function setEndAt(?\DateTimeImmutable $endAt): static
    {
        $this->endAt = $endAt;

        return $this;
    }

    public function getGame(): ?Game
    {
        return $this->game;
    }

    public function setGame(?Game $game): static
    {
        $this->game = $game;

        return $this;
    }

    public function getTavern(): ?Tavern
    {
        return $this->tavern;
    }

    public function setTavern(?Tavern $tavern): static
    {
        $this->tavern = $tavern;

        return $this;
    }

    /**
     * @return array
     */
    public function getPlayers(): array
    {
        return $this->players->getValues();
    }

    public function addPlayer(User $user): static
    {
        if (!$this->players->contains($user)) {
            $this->players->add($user);
            $user->addJoinedQuest($this);
        }

        return $this;
    }

    public function removePlayer(User $user): static
    {
        if ($this->players->removeElement($user)) {
            $user->removeJoinedQuest($this);
        }

        return $this;
    }
}

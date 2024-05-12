<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Link;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Get;
use App\Repository\UserRepository;
use App\State\UserPasswordHasherProcessor;
use App\State\UserRegistrationProcessor;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Types\UuidType;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Uid\Uuid;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    operations: [
        new GetCollection(),
        new Post(validationContext: ['groups' => ['user:create']], processor: UserRegistrationProcessor::class),
        new Get(),
        new Patch(security: "is_granted('ROLE_ADMIN') or (object == user)", processor: UserPasswordHasherProcessor::class),
        new Delete(security: "is_granted('ROLE_ADMIN') or (object == user)"),
        new GetCollection(
            uriTemplate: "/quests/{id}/players",
            uriVariables: [
                'id' => new Link(
                    fromProperty: 'players',
                    toProperty: 'joinedQuests',
                    fromClass: Quest::class,
                    toClass: User::class,
                )
            ],
            security: 'is_granted("ROLE_ADMIN") or is_granted("QUEST_CREATOR", object)',
        ),
    ],
    normalizationContext: ['groups' => ['user:read']],
    denormalizationContext: ['groups' => ['user:create', 'user:update']],
)]
#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\HasLifecycleCallbacks]
#[ORM\UniqueConstraint(name: 'UNIQ_IDENTIFIER_USERNAME', fields: ['username'])]
#[ORM\UniqueConstraint(name: 'UNIQ_IDENTIFIER_EMAIL', fields: ['email'])]
#[UniqueEntity(fields: ['username'], message: 'There is already an account with this username')]
#[UniqueEntity(fields: ['email'], message: 'There is already an account with this email')]
#[UniqueEntity(fields: ['username'], message: 'There is already an account with this username', groups: ['user:create'])]
#[UniqueEntity(fields: ['email'], message: 'There is already an account with this email', groups: ['user:create'])]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\Column(type: UuidType::NAME, unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'doctrine.uuid_generator')]
    #[Groups(['user:read'])]
    private ?Uuid $id = null;

    #[ORM\Column( type: 'string', length: 180, unique: true, nullable: false)]
    #[Assert\NotBlank]
    #[Assert\NotBlank(groups: ['user:create'])]
    #[Assert\Length(min: 6, max: 180)]
    #[Assert\Length(min: 6, max: 180, groups: ['user:create'])]
    #[Groups(['user:read', 'user:create', 'user:update', 'quest:read'])]
    private ?string $username = null;

    #[ORM\Column( type: 'string', length: 320, unique: true, nullable: false)]
    #[Assert\NotBlank]
    #[Assert\NotBlank(groups: ['user:create'])]
    #[Assert\Email]
    #[Assert\Email(groups: ['user:create'])]
    #[Assert\Length(min: 3, max: 320)]
    #[Assert\Length(min: 3, max: 320, groups: ['user:create'])]
    #[Groups(['user:read', 'user:create', 'user:update'])]
    private ?string $email = null;

    #[ORM\Column(type: 'datetime_immutable', nullable: false)]
    #[Groups(['user:read'])]
    private ?\DateTimeImmutable $createdAt = null;

    /**
     * @var list<string> The user roles
     */
    #[ORM\Column(type: 'json')]
    private array $roles = [];

    /**
     * @var string|null The hashed password
     */
    #[ORM\Column(type: 'string', nullable: false)]
    private ?string $password = null;

    #[Assert\NotBlank(groups: ['user:create'])]
    #[Groups(['user:create', 'user:update'])]
    private ?string $plainPassword = null;

    #[ORM\Column(type: 'boolean', nullable: false)]
    #[Groups(['user:read'])]
    #[ApiProperty(security: "is_granted('ROLE_ADMIN')")]
    private bool $verified = false;

    #[ORM\Column(type: 'boolean', nullable: false)]
    #[Groups(['user:read', 'user:update'])]
    #[ApiProperty(security: "is_granted('ROLE_ADMIN')")]
    private bool $banned = false;

    #[ORM\OneToMany(targetEntity: Quest::class, mappedBy: 'creator')]
    private Collection $createdQuests;

    #[ORM\ManyToMany(targetEntity: Quest::class, inversedBy: 'players')]
    private Collection $joinedQuests;

    public function __construct()
    {
        $this->createdQuests = new ArrayCollection();
        $this->joinedQuests = new ArrayCollection();
    }

    public function getId(): ?Uuid
    {
        return $this->id;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): static
    {
        $this->username = $username;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->id;
    }

    /**
     * @see UserInterface
     * @return list<string>
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    /**
     * @param list<string> $roles
     */
    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    public function getPlainPassword(): ?string
    {
        return $this->plainPassword;
    }

    public function setPlainPassword(?string $plainPassword): self
    {
        $this->plainPassword = $plainPassword;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        $this->plainPassword = null;
    }

    public function isVerified(): bool
    {
        return $this->verified;
    }

    public function setVerified(bool $verified): self
    {
        $this->verified = $verified;

        return $this;
    }

    public function isBanned(): bool
    {
        return $this->banned;
    }

    public function setBanned(bool $isBanned): self
    {
        $this->banned = $isBanned;

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

    /**
     * @return array
     */
    public function getCreatedQuests(): array
    {
        return $this->createdQuests->getValues();
    }

    public function addCreatedQuest(Quest $quest): self
    {
        if (!$this->createdQuests->contains($quest)) {
            $this->createdQuests->add($quest);
            $quest->setCreator($this);
        }

        return $this;
    }

    public function removeCreatedQuest(Quest $quest): self
    {
        if ($this->createdQuests->removeElement($quest)) {
            // set the owning side to null (unless already changed)
            if ($quest->getCreator() === $this) {
                $quest->setCreator(null);
            }
        }

        return $this;
    }

    /**
     * @return array
     */
    public function getJoinedQuests(): array
    {
        return $this->joinedQuests->getValues();
    }

    public function addJoinedQuest(Quest $joinedQuest): self
    {
        if (!$this->joinedQuests->contains($joinedQuest)) {
            $this->joinedQuests->add($joinedQuest);
        }

        return $this;
    }

    public function removeJoinedQuest(Quest $joinedQuest): self
    {
        $this->joinedQuests->removeElement($joinedQuest);

        return $this;
    }
}

<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Types\UuidType;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Attribute\Ignore;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Uid\Uuid;
use Symfony\Component\Serializer\Annotation\MaxDepth;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\HasLifecycleCallbacks]
#[ORM\UniqueConstraint(name: 'UNIQ_IDENTIFIER_USERNAME', fields: ['username'])]
#[ORM\UniqueConstraint(name: 'UNIQ_IDENTIFIER_EMAIL', fields: ['email'])]
#[UniqueEntity(fields: ['username'], message: 'There is already an account with this username')]
#[UniqueEntity(fields: ['email'], message: 'There is already an account with this email')]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\Column(type: UuidType::NAME, unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'doctrine.uuid_generator')]
    #[Assert\Uuid]
    private ?Uuid $id = null;

    #[ORM\Column( type: 'string', length: 180, nullable: false)]
    #[Assert\NotBlank]
    #[Assert\Length(min: 6, max: 180)]
    private ?string $username = null;

    #[ORM\Column( type: 'string', length: 320, nullable: false)]
    #[Assert\NotBlank]
    #[Assert\Email]
    private ?string $email = null;

    #[ORM\Column(type: 'datetime_immutable', nullable: false)]
    private ?\DateTimeImmutable $createdAt = null;

    /**
     * @var list<string> The user roles
     */
    #[ORM\Column(type: 'json')]
    private array $roles = [];

    /**
     * @var string The hashed password
     */
    #[ORM\Column(type: 'string')]
    private ?string $password = null;

    #[ORM\Column(type: 'boolean', nullable: false)]
    private $isVerified = false;

    #[ORM\Column(type: 'boolean', nullable: false)]
    private $isBanned = false;

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
    #[Ignore]
    public function getUserIdentifier(): string
    {
        return (string) $this->username;
    }

    /**
     * @see UserInterface
     * @return list<string>
     */
    #[Ignore]
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
    #[Ignore]
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function isVerified(): bool
    {
        return $this->isVerified;
    }

    public function setIsVerified(bool $isVerified): static
    {
        $this->isVerified = $isVerified;

        return $this;
    }

    public function isBanned(): bool
    {
        return $this->isBanned;
    }

    public function setIsBanned(bool $isBanned): static
    {
        $this->isBanned = $isBanned;

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
     * @return Collection<Uuid, Quest>
     */
    #[Ignore]
    public function getCreatedQuests(): Collection
    {
        return $this->createdQuests;
    }

    public function addCreatedQuest(Quest $quest): static
    {
        if (!$this->createdQuests->contains($quest)) {
            $this->createdQuests->add($quest);
            $quest->setCreator($this);
        }

        return $this;
    }

    public function removeCreatedQuest(Quest $quest): static
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
     * @return Collection<Uuid, Quest>
     */
    #[Ignore]
    public function getJoinedQuests(): Collection
    {
        return $this->joinedQuests;
    }

    public function addJoinedQuest(Quest $joinedQuest): static
    {
        if (!$this->joinedQuests->contains($joinedQuest)) {
            $this->joinedQuests->add($joinedQuest);
        }

        return $this;
    }

    public function removeJoinedQuest(Quest $joinedQuest): static
    {
        $this->joinedQuests->removeElement($joinedQuest);

        return $this;
    }
}

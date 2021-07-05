<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\Groups;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * @ORM\Entity(repositoryClass=UserRepository::class)
 * @ORM\Table(name="`user`")
 */
class User implements UserInterface
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
		 * @Groups({"get_user"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
		 * @Groups({"get_user"})
     */
    private $username;

    /**
     * @ORM\Column(type="json")
     */
    private $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     */
    private $password;

    /**
     * @ORM\Column(type="string", length=255)
		 * @Groups({"get_user"})
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=255)
		 * @Groups({"get_user"})
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255)
		 * @Groups({"get_user"})
     */
    private $lastname;

    /**
     * @ORM\Column(type="date")
		 * @Groups({"get_user"})
     */
    private $createdAt;

    /**
     * @ORM\OneToMany(targetEntity=Rating::class, mappedBy="user")
		 * @Groups({"get_user"})
     */
    private $ratings;

    /**
     * @ORM\OneToMany(targetEntity=UserGameStatus::class, mappedBy="user")
		 * @Groups({"get_user"})
     */
    private $userGameStatuses;

    public function __construct()
    {
        $this->ratings = new ArrayCollection();
        $this->userGameStatuses = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->username;
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return (string) $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Returning a salt is only needed, if you are not using a modern
     * hashing algorithm (e.g. bcrypt or sodium) in your security.yaml.
     *
     * @see UserInterface
     */
    public function getSalt(): ?string
    {
        return null;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): self
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * @return Collection|Rating[]
     */
    public function getRatings(): Collection
    {
        return $this->ratings;
    }

    public function addRating(Rating $rating): self
    {
        if (!$this->ratings->contains($rating)) {
            $this->ratings[] = $rating;
            $rating->setUser($this);
        }

        return $this;
    }

    public function removeRating(Rating $rating): self
    {
        if ($this->ratings->removeElement($rating)) {
            // set the owning side to null (unless already changed)
            if ($rating->getUser() === $this) {
                $rating->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|UserGameStatus[]
     */
    public function getUserGameStatuses(): Collection
    {
        return $this->userGameStatuses;
    }

    public function addUserGameStatus(UserGameStatus $userGameStatus): self
    {
        if (!$this->userGameStatuses->contains($userGameStatus)) {
            $this->userGameStatuses[] = $userGameStatus;
            $userGameStatus->setUser($this);
        }

        return $this;
    }

    public function removeUserGameStatus(UserGameStatus $userGameStatus): self
    {
        if ($this->userGameStatuses->removeElement($userGameStatus)) {
            // set the owning side to null (unless already changed)
            if ($userGameStatus->getUser() === $this) {
                $userGameStatus->setUser(null);
            }
        }

        return $this;
    }
}

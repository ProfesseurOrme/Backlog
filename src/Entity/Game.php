<?php

namespace App\Entity;

use App\Repository\GameRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use JMS\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=GameRepository::class)
 */
class Game
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="integer", length=255, unique=true)
		 * @Groups({"user_games"})
     */
    private $uuid;

    /**
     * @ORM\Column(type="string", length=255)
		 * @Groups({"user_games"})
     */
    private $name;

    /**
		 * @Gedmo\Slug(fields={"name"})
     * @ORM\Column(type="string", length=255)
		 * @Groups({"user_games"})
     */
    private $slug;

    /**
     * @ORM\OneToMany(targetEntity=Rating::class, mappedBy="game")
     */
    private $ratings;

    /**
     * @ORM\ManyToMany(targetEntity=Platform::class, inversedBy="games", cascade={"persist"})
		 * @Groups({"user_games"})
     */
    private $platforms;

    /**
     * @ORM\Column(type="date", nullable=true)
		 * @Groups({"user_games"})
     */
    private $released;

    /**
     * @ORM\OneToMany(targetEntity=UserGameStatus::class, mappedBy="game")
		 * @Groups({"user_games"})
     */
    private $userGameStatuses;

    public function __construct()
    {
        $this->ratings = new ArrayCollection();
        $this->platforms = new ArrayCollection();
        $this->userGameStatuses = new ArrayCollection();
    }

		public function getId(): ?int
		{
				return $this->id;
		}

    public function getUuid(): ?string
    {
        return $this->uuid;
    }

    public function setUuid(string $uuid): self
    {
        $this->uuid = $uuid;

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

    public function getSlug(): ?string
    {
        return $this->slug;
    }

    public function setSlug(string $slug): self
    {
        $this->slug = $slug;

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
            $rating->setGame($this);
        }

        return $this;
    }

    public function removeRating(Rating $rating): self
    {
        if ($this->ratings->removeElement($rating)) {
            // set the owning side to null (unless already changed)
            if ($rating->getGame() === $this) {
                $rating->setGame(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Platform[]
     */
    public function getPlatforms(): Collection
    {
        return $this->platforms;
    }

    public function addPlatform(Platform $platform): self
    {
        if (!$this->platforms->contains($platform)) {
            $this->platforms[] = $platform;
        }

        return $this;
    }

    public function removePlatform(Platform $platform): self
    {
        $this->platforms->removeElement($platform);

        return $this;
    }

    public function getReleased(): ?\DateTimeInterface
    {
        return $this->released;
    }

    public function setReleased(?\DateTimeInterface $released): self
    {
        $this->released = $released;

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
            $userGameStatus->setGame($this);
        }

        return $this;
    }

    public function removeUserGameStatus(UserGameStatus $userGameStatus): self
    {
        if ($this->userGameStatuses->removeElement($userGameStatus)) {
            // set the owning side to null (unless already changed)
            if ($userGameStatus->getGame() === $this) {
                $userGameStatus->setGame(null);
            }
        }

        return $this;
    }
}

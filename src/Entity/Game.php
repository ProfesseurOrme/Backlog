<?php

namespace App\Entity;

use App\Repository\GameRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;

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
     * @ORM\Column(type="string", length=255, unique=true)
     */
    private $uuid;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
		 * @Gedmo\Slug(fields={"uuid","name"})
     * @ORM\Column(type="string", length=255)
     */
    private $slug;

    /**
     * @ORM\Column(type="datetime")
     */
    private $releaseDate;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $metacriticRank;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $rating;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $ratingCount;

    /**
     * @ORM\OneToMany(targetEntity=Backlog::class, mappedBy="game")
     */
    private $backlogs;

    /**
     * @ORM\OneToMany(targetEntity=ReleaseData::class, mappedBy="game")
     */
    private $releaseData;

    public function __construct()
    {
        $this->backlogs = new ArrayCollection();
        $this->releaseData = new ArrayCollection();
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

    public function getReleaseDate(): ?\DateTimeInterface
    {
        return $this->releaseDate;
    }

    public function setReleaseDate(\DateTimeInterface $releaseDate): self
    {
        $this->releaseDate = $releaseDate;

        return $this;
    }

    public function getMetacriticRank(): ?int
    {
        return $this->metacriticRank;
    }

    public function setMetacriticRank(?int $metacriticRank): self
    {
        $this->metacriticRank = $metacriticRank;

        return $this;
    }

    public function getRating(): ?int
    {
        return $this->rating;
    }

    public function setRating(?int $rating): self
    {
        $this->rating = $rating;

        return $this;
    }

    public function getRatingCount(): ?int
    {
        return $this->ratingCount;
    }

    public function setRatingCount(?int $ratingCount): self
    {
        $this->ratingCount = $ratingCount;

        return $this;
    }

    /**
     * @return Collection|Backlog[]
     */
    public function getBacklogs(): Collection
    {
        return $this->backlogs;
    }

    public function addBacklog(Backlog $backlog): self
    {
        if (!$this->backlogs->contains($backlog)) {
            $this->backlogs[] = $backlog;
            $backlog->setGame($this);
        }

        return $this;
    }

    public function removeBacklog(Backlog $backlog): self
    {
        if ($this->backlogs->removeElement($backlog)) {
            // set the owning side to null (unless already changed)
            if ($backlog->getGame() === $this) {
                $backlog->setGame(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|ReleaseData[]
     */
    public function getReleaseData(): Collection
    {
        return $this->releaseData;
    }

    public function addReleaseData(ReleaseData $releaseData): self
    {
        if (!$this->releaseData->contains($releaseData)) {
            $this->releaseData[] = $releaseData;
            $releaseData->setGame($this);
        }

        return $this;
    }

    public function removeReleaseData(ReleaseData $releaseData): self
    {
        if ($this->releaseData->removeElement($releaseData)) {
            // set the owning side to null (unless already changed)
            if ($releaseData->getGame() === $this) {
                $releaseData->setGame(null);
            }
        }

        return $this;
    }
}

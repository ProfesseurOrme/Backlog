<?php

namespace App\Entity;

use App\Repository\RatingRepository;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=RatingRepository::class)
 */
class Rating
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="float", scale=1, nullable=true)
		 * @Groups({"get_user"})
     */
    private $rating;

    /**
     * @ORM\Column(type="datetime")
		 * @Groups({"get_user"})
     */
    private $addedAt;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="ratings")
     * @ORM\JoinColumn(nullable=false, onDelete="CASCADE")
     */
    private $user;

    /**
     * @ORM\ManyToOne(targetEntity=Game::class, inversedBy="ratings")
     * @ORM\JoinColumn(nullable=false)
     */
    private $game;


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getRating(): ?float
    {
        return (float)$this->rating;
    }

    public function setRating(?float $rating): self
    {
        $this->rating = (float)$rating;

        return $this;
    }

    public function getAddedAt(): ?\DateTimeInterface
    {
        return $this->addedAt;
    }

    public function setAddedAt(\DateTimeInterface $addedAt): self
    {
        $this->addedAt = $addedAt;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getGame(): ?Game
    {
        return $this->game;
    }

    public function setGame(?Game $game): self
    {
        $this->game = $game;

        return $this;
    }
}

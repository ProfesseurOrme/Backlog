<?php

namespace App\Entity;

use App\Repository\UserGameStatusRepository;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=UserGameStatusRepository::class)
 */
class UserGameStatus
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=Status::class, inversedBy="userGameStatuses")
     * @ORM\JoinColumn(nullable=false)
		 * @Groups({"user_games"})
     */
    private $status;

    /**
     * @ORM\ManyToOne(targetEntity=Game::class, inversedBy="userGameStatuses")
     */
    private $game;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="userGameStatuses")
     */
    private $user;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getStatus(): ?Status
    {
        return $this->status;
    }

    public function setStatus(?Status $status): self
    {
        $this->status = $status;

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

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }
}

<?php

namespace App\Entity;

use App\Repository\StatusRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=StatusRepository::class)
 */
class Status
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
		 * @Groups({"user_games"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
		 * @Groups({"user_games"})
     */
    private $label;

    /**
     * @ORM\OneToMany(targetEntity=UserGameStatus::class, mappedBy="status")
     */
    private $userGameStatuses;

    public function __construct()
    {
        $this->userGameStatuses = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLabel(): ?string
    {
        return $this->label;
    }

    public function setLabel(string $label): self
    {
        $this->label = $label;

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
            $userGameStatus->setStatus($this);
        }

        return $this;
    }

    public function removeUserGameStatus(UserGameStatus $userGameStatus): self
    {
        if ($this->userGameStatuses->removeElement($userGameStatus)) {
            // set the owning side to null (unless already changed)
            if ($userGameStatus->getStatus() === $this) {
                $userGameStatus->setStatus(null);
            }
        }

        return $this;
    }
}

<?php

namespace App\Entity;

use App\Repository\PlateformRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=PlateformRepository::class)
 */
class Platform
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $uuid;

    /**
     * @ORM\OneToMany(targetEntity=Backlog::class, mappedBy="platform")
     */
    private $backlogs;

    public function __construct()
    {
        $this->backlogs = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function getUuid(): ?string
    {
        return $this->uuid;
    }

    public function setUuid(string $uuid): self
    {
        $this->uuid = $uuid;

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
            $backlog->setPlatform($this);
        }

        return $this;
    }

    public function removeBacklog(Backlog $backlog): self
    {
        if ($this->backlogs->removeElement($backlog)) {
            // set the owning side to null (unless already changed)
            if ($backlog->getPlatform() === $this) {
                $backlog->setPlatform(null);
            }
        }

        return $this;
    }
}

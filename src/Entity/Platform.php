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
     * @ORM\OneToMany(targetEntity=ReleaseData::class, mappedBy="platform")
     */
    private $releaseData;


    public function __construct()
    {
        $this->releaseData = new ArrayCollection();
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
            $releaseData->setPlatform($this);
        }

        return $this;
    }

    public function removeReleaseData(ReleaseData $releaseData): self
    {
        if ($this->releaseData->removeElement($releaseData)) {
            // set the owning side to null (unless already changed)
            if ($releaseData->getPlatform() === $this) {
                $releaseData->setPlatform(null);
            }
        }

        return $this;
    }
}

<?php

	namespace App\Services\Checker;


use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\DependencyInjection\ParameterBag\ContainerBagInterface;

class DataChecker {

	protected $entityManager;

	public function __construct(EntityManagerInterface $entityManager)
	{
		$this->entityManager = $entityManager;
	}

	public function tryPersistAndFetchData(object $data) : object
	{
		$existingObject = $this->getEntry($data->getUuid(), get_class($data));

		if(is_null($existingObject)) {
			try{
				$this->entityManager->persist($data);
				$this->entityManager->flush();
			}
			catch (UniqueConstraintViolationException $exception) {

			}
			return $this->getEntry($data->getUuid(), get_class($data));
		}
		else
		{
			return $existingObject;
		}
	}

	private function getEntry($uuid, $classname)
	{
		return $this->entityManager->getRepository($classname)->findOneBy(["uuid" => $uuid]);
	}

}
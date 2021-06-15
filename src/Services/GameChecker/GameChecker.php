<?php


	namespace App\Services\GameChecker;


	use App\Entity\Status;
	use App\Entity\User;
	use App\Entity\UserGameStatus;
	use App\Services\Checker\DataChecker;
	use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
	use Doctrine\ORM\EntityManagerInterface;

	class GameChecker
	{
		protected $entityManager;
		protected $dataChecker;

		public function __construct(EntityManagerInterface $entityManager, DataChecker $dataChecker)
		{
			$this->entityManager = $entityManager;
			$this->dataChecker = $dataChecker;
		}

		public function addThisGameToUser(object $data, User $user)
		{
			$platforms = [];
			foreach ($data->getPlatforms() as $value) {
				$platforms[] = $value;
			}
			$data->getPlatforms()->clear();

			$game = $this->dataChecker->tryPersistAndFetchData($data);

			foreach ($platforms as $item) {
				$platform = $this->dataChecker->tryPersistAndFetchData($item);
				$game->addPlatform($platform);
			}

			$status = $this->entityManager->getRepository(Status::class)->find(1);

			$userGameStatus = new UserGameStatus();
			$userGameStatus
				->setGame($game)
				->setUser($user)
				->setStatus($status)
			;

			$this->entityManager->persist($userGameStatus);
			$this->entityManager->flush();
		}
	}
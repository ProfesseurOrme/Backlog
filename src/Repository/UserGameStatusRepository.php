<?php

namespace App\Repository;

use App\Entity\UserGameStatus;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method UserGameStatus|null find($id, $lockMode = null, $lockVersion = null)
 * @method UserGameStatus|null findOneBy(array $criteria, array $orderBy = null)
 * @method UserGameStatus[]    findAll()
 * @method UserGameStatus[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserGameStatusRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, UserGameStatus::class);
    }

    public function findGamePerUser($idGame, $idUser)
		{
			return $this->createQueryBuilder("u")
				->innerJoin("u.game", "g")
				->addSelect("g")
				->where("g.id = :idgame")
				->innerJoin("u.user", "us")
				->addSelect("us")
				->andWhere("us.id = :iduser")
				->setParameters(["idgame" => $idGame, "iduser" => $idUser])
				->getQuery()
				->getSingleResult()
			;
		}

		public function findGameStatisticsPerStatus($statusId, $gameUuid) {
    	return $this->createQueryBuilder("u")
				->select("count(u.id) as cnt")
				->innerJoin("u.game", "g")
				->where("g.uuid = :uuid")
				->innerJoin("u.status", "s")
				->andWhere("s.id = :id")
				->setParameters(["uuid" => $gameUuid, "id" => $statusId])
				->getQuery()
				->getSingleScalarResult()
			;
		}

	public function findNbPlayers($gameUuid) {
		return $this->createQueryBuilder("u")
			->select("count(u.id) as cnt")
			->innerJoin("u.game", "g")
			->where("g.uuid = :uuid")
			->setParameter("uuid" , $gameUuid)
			->getQuery()
			->getSingleScalarResult()
			;
	}
}

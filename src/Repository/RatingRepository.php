<?php

namespace App\Repository;

use App\Entity\Rating;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Rating|null find($id, $lockMode = null, $lockVersion = null)
 * @method Rating|null findOneBy(array $criteria, array $orderBy = null)
 * @method Rating[]    findAll()
 * @method Rating[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class RatingRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Rating::class);
    }

    public function findGameRating($gameUuid, $userId) {

			return $this->createQueryBuilder("r")
				->innerJoin("r.game", "g")
				->addSelect("g")
				->where("g.uuid = :uuid")
				->innerJoin("r.user", "u")
				->addSelect("u")
				->andWhere("u.id = :id")
				->setParameters(["uuid" => $gameUuid,"id" => $userId])
				->getQuery()
				->getOneOrNullResult()
			;
		}

		public function findGameAverageRating($gameUuid) {
    	return $this->createQueryBuilder("r")
				->select("avg(r.rating) as rtg")
				->innerJoin("r.game", "g")
				->where("g.uuid = :uuid")
				->setParameter("uuid", $gameUuid)
				->getQuery()
				->getSingleScalarResult()
			;
		}

    // /**
    //  * @return Rating[] Returns an array of Rating objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('b.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Rating
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}

<?php

namespace App\Repository;

use App\Entity\ReleaseData;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method ReleaseData|null find($id, $lockMode = null, $lockVersion = null)
 * @method ReleaseData|null findOneBy(array $criteria, array $orderBy = null)
 * @method ReleaseData[]    findAll()
 * @method ReleaseData[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ReleaseDataRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ReleaseData::class);
    }

    // /**
    //  * @return ReleaseData[] Returns an array of ReleaseData objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('r.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?ReleaseData
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}

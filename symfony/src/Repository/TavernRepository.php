<?php

namespace App\Repository;

use App\Entity\Tavern;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\Tools\Pagination\Paginator;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Tavern>
 *
 * @method Tavern|null find($id, $lockMode = null, $lockVersion = null)
 * @method Tavern|null findOneBy(array $criteria, array $orderBy = null)
 * @method Tavern[]    findAll()
 * @method Tavern[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TavernRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Tavern::class);
    }

    public function findAllPagination($page = 1, $per = 50): array
    {
        $query = $this->createQueryBuilder('t')
            ->orderBy('t.id', 'ASC')
            ->getQuery();

        $paginator = new Paginator($query);
        $paginator->getQuery()
            ->setFirstResult($per * ($page - 1))
            ->setMaxResults($per);

        $info = [
            'max_items' => $paginator->count(),
            'min_page' => 1,
            'max_page' => ceil($paginator->count() / $per),
            'current_page' => $page,
            'per_page' => $per
        ];

        return ['_info' => $info, '_data' => $paginator];
    }

//    /**
//     * @return Tavern[] Returns an array of Tavern objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('t')
//            ->andWhere('t.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('t.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Tavern
//    {
//        return $this->createQueryBuilder('t')
//            ->andWhere('t.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}

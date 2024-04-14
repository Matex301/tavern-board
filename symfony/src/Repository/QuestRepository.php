<?php

namespace App\Repository;

use App\Entity\Quest;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\Tools\Pagination\Paginator;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Quest>
 *
 * @method Quest|null find($id, $lockMode = null, $lockVersion = null)
 * @method Quest|null findOneBy(array $criteria, array $orderBy = null)
 * @method Quest[]    findAll()
 * @method Quest[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class QuestRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Quest::class);
    }

    public function findAllPagination($page, $date = new \DateTimeImmutable(), $per = 50): array
    {
        $query = $this->createQueryBuilder('q')
            ->andWhere('q.startAt >= :date')
            ->setParameter('date', $date)
            ->orderBy('q.startAt', 'ASC')
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
            'per_page' => $per,
            'begin_date' => $date
        ];

        return ['_info' => $info, '_data' => $paginator];
    }

    public function findByCreatorPagination($page, $id, $per = 50): array
    {
        $query = $this->createQueryBuilder('q')
            ->andWhere('q.creator = :id')
            ->setParameter('id', $id, 'uuid')
            ->orderBy('q.startAt', 'DESC')
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
            'per_page' => $per,
            'user' => $id
        ];

        return ['_info' => $info, '_data' => $paginator];
    }

    public function findByJoinedPagination($page, $id, $per = 50): array
    {
        $query = $this->createQueryBuilder('q')
            ->select('q')
            ->innerJoin('q.players', 'u', 'WITH', 'u.id = :id')
            ->setParameter('id', $id, 'uuid')
            ->orderBy('q.startAt', 'DESC')
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
            'per_page' => $per,
            'user' => $id
        ];

        return ['_info' => $info, '_data' => $paginator];
    }

//    /**
//     * @return Quest[] Returns an array of Quest objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('q')
//            ->andWhere('q.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('q.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Quest
//    {
//        return $this->createQueryBuilder('q')
//            ->andWhere('q.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}

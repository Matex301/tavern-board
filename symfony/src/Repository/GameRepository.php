<?php

namespace App\Repository;

use App\Entity\Game;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\Tools\Pagination\Paginator;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Game>
 *
 * @method Game|null find($id, $lockMode = null, $lockVersion = null)
 * @method Game|null findOneBy(array $criteria, array $orderBy = null)
 * @method Game[]    findAll()
 * @method Game[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class GameRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Game::class);
    }

    public function findAllPagination($page = 1, $per = 50): array
    {
        $query = $this->createQueryBuilder('g')
            ->orderBy('g.id', 'ASC')
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
//     * @return Game[] Returns an array of Game objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('g')
//            ->andWhere('g.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('g.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Game
//    {
//        return $this->createQueryBuilder('g')
//            ->andWhere('g.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}

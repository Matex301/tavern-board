<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240514143945 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf(
            !$this->connection->getDatabasePlatform() instanceof \Doctrine\DBAL\Platforms\MySQL80Platform,
            "Migration can only be executed safely on '\Doctrine\DBAL\Platforms\MySQL80Platform'."
        );

        $this->addSql('CREATE TABLE game (id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', name VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, description LONGTEXT CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_unicode_ci`, min_players INT DEFAULT NULL, max_player INT DEFAULT NULL, image VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_unicode_ci`, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->abortIf(
            !$this->connection->getDatabasePlatform() instanceof \Doctrine\DBAL\Platforms\MySQL80Platform,
            "Migration can only be executed safely on '\Doctrine\DBAL\Platforms\MySQL80Platform'."
        );

        $this->addSql('CREATE TABLE user_quest (user_id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', quest_id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', INDEX IDX_A1D5034FA76ED395 (user_id), INDEX IDX_A1D5034F209E9EF4 (quest_id), PRIMARY KEY(user_id, quest_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->abortIf(
            !$this->connection->getDatabasePlatform() instanceof \Doctrine\DBAL\Platforms\MySQL80Platform,
            "Migration can only be executed safely on '\Doctrine\DBAL\Platforms\MySQL80Platform'."
        );

        $this->addSql('CREATE TABLE user (id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', username VARCHAR(180) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, email VARCHAR(320) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', roles JSON NOT NULL, password VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, verified TINYINT(1) NOT NULL, banned TINYINT(1) NOT NULL, UNIQUE INDEX UNIQ_IDENTIFIER_USERNAME (username), UNIQUE INDEX UNIQ_IDENTIFIER_EMAIL (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->abortIf(
            !$this->connection->getDatabasePlatform() instanceof \Doctrine\DBAL\Platforms\MySQL80Platform,
            "Migration can only be executed safely on '\Doctrine\DBAL\Platforms\MySQL80Platform'."
        );

        $this->addSql('CREATE TABLE tavern (id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', name VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, website VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_unicode_ci`, phone VARCHAR(15) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_unicode_ci`, address_street VARCHAR(80) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, address_city VARCHAR(80) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, address_country VARCHAR(80) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->abortIf(
            !$this->connection->getDatabasePlatform() instanceof \Doctrine\DBAL\Platforms\MySQL80Platform,
            "Migration can only be executed safely on '\Doctrine\DBAL\Platforms\MySQL80Platform'."
        );

        $this->addSql('CREATE TABLE quest (id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', creator_id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', game_id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', tavern_id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', title VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, description LONGTEXT CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_unicode_ci`, image VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_unicode_ci`, max_players INT DEFAULT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', start_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', end_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_4317F81761220EA6 (creator_id), INDEX IDX_4317F817E48FD905 (game_id), INDEX IDX_4317F817416D7217 (tavern_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');

        $this->addSql('INSERT INTO tavern (id, name, website, phone, address_street, address_city, address_country) VALUES (0x018ED86DE18D75529AEB5EC34042A5D2, \'Shop Gracz\', \'shopgracz.pl\', \'608 195 190\', \'Bolesława Limanowskiego 16\', \'Kraków\', \'Poland\');');

        $this->addSql('INSERT INTO user (id, username, email, created_at, roles, password, verified, banned) VALUES (0x018ED8DC6A117ABDB9E443718EF2DFB0, \'odzioo\', \'odzioo@mailer.local\', \'2024-04-13 19:08:27\', \'[]\', \'$2y$13$NjrtQdlJnz3ZgI5FMV.OBuJ8oYOzf6pPhlgOqDO/C2w1OyvYDUnHy\', 1, 0);');
        $this->addSql('INSERT INTO user (id, username, email, created_at, roles, password, verified, banned) VALUES (0x018EF2ABB0F37EF7939DC632878C1AD8, \'matex301\', \'matex301@mailer.local\', \'2024-04-18 19:25:21\', \'["ROLE_ADMIN"]\', \'$2y$13$9zXGwqyFFlOYdBb5.G6p6uT3jCYLGy4hWrWgXWNBCVb1EY16ZdsQW\', 1, 0);');
        $this->addSql('INSERT INTO user (id, username, email, created_at, roles, password, verified, banned) VALUES (0x018F73E858EA7128949FCE728D328923, \'rastele\', \'rastele@mailer.local\', \'2024-05-13 21:42:38\', \'[]\', \'$2y$13$`.`a0zokZAQzUp26SIzyskCTu8mklBTpZC9c/rQezO.WbgfGFcupDRZu\', 0, 0);');

        $this->addSql('INSERT INTO quest (id, creator_id, game_id, tavern_id, title, description, image, max_players, created_at, start_at, end_at) VALUES (0x018EF3BABC967728839BCAE04BF30646, 0x018EF2ABB0F37EF7939DC632878C1AD8, 0x018F77744262738A882B5DD85961E66A, 0x018ED86DE18D75529AEB5EC34042A5D2, \'Pathfinder\', \'Zagrajmy razem w coś fajnego\', \'\', 6, \'2024-04-19 00:21:25\', \'2024-04-19 00:15:53\', \'2024-04-19 00:18:53\');');
        $this->addSql('INSERT INTO quest (id, creator_id, game_id, tavern_id, title, description, image, max_players, created_at, start_at, end_at) VALUES (0x018EF63BE5BE76B7805A9AEA4472F2E3, 0x018EF2ABB0F37EF7939DC632878C1AD8, 0x018EF346DD587BE0931931BFA25244AF, 0x018ED86DE18D75529AEB5EC34042A5D2, \'Arcs Gramy!\', \'Cudowa nowa gra\', null, 6, \'2024-04-19 12:01:44\', \'2024-04-19 11:59:36\', \'2024-04-19 11:59:36\');');

        $this->addSql('INSERT INTO user_quest (user_id, quest_id) VALUES (0x018ED8DC6A117ABDB9E443718EF2DFB0, 0x018EF3BABC967728839BCAE04BF30646);');

        $this->addSql('INSERT INTO game (id, name, description, min_players, max_player, image) VALUES (0x018ED86E46ED75A390EC5C62C045CC20, \'Six Forms\', \'Six Forms is a “chess style” trading card game crafted for players with a competitive spirit and desire for evocative high-fantasy art. Collect your deck and go head-to-head with your opponent. Make tactical battlefield card maneuvers on the 4 x 4 grid board, display your power with exciting combinations, and astonish everyone with your perfect positioning on the board.\', 2, 4, \'https://cf.geekdo-images.com/kcYoql3toFFo-m72DSh1Ww__imagepage/img/9IN5QXaGq3O7l47X9xsjZdLoJG4=/fit-in/900x600/filters:no_upscale():strip_icc()/pic8025746.jpg\');');
        $this->addSql('INSERT INTO game (id, name, description, min_players, max_player, image) VALUES (0x018EF346DD587BE0931931BFA25244AF, \'Arcs\', \'Arcs is a sharp sci-fi strategy game for 2–4 players, set in a dark yet silly universe. Ready yourself for dramatic twists and turns as you launch into this galactic struggle.\', 2, 4, \'https://cf.geekdo-images.com/XWImAu_3RK61wbzcKboVdA__imagepage/img/OrRrbyeK2D2O8aD_1yoJgcIjkUs=/fit-in/900x600/filters:no_upscale():strip_icc()/pic8145530.png\');');
        $this->addSql('INSERT INTO game (id, name, description, min_players, max_player, image) VALUES (0x018EF348487877A38A1E71C580DA15AE, \'Skyrise\', \'The Mayor has enlisted some of humanity greatest visionaries to help build Skyrise: a magnificent city in the sky, dedicated to art, science, and beauty. But only one artisan can be remembered as the greatest!\', 2, 4, \'https://cf.geekdo-images.com/wQNNMPNOm43VMYPAPpJdEA__imagepage/img/OIs4QNftQD471i60etPic59w35I=/fit-in/900x600/filters:no_upscale():strip_icc()/pic8160197.jpg\');');
        $this->addSql('INSERT INTO game (id, name, description, min_players, max_player, image) VALUES (0x018F62285F4E7943BFBAD0AD8E8BEE58, \'Sand\', \'People refer to this vast place only as the desert since no one remembers what was here before. The golden age of human beings has long passed. Now there is only sand, and the only hope is in the humidity.Travelers cross the desert that stretches from the slopes of the Akaishi Mountains to the cliffs of Seaclaw. Half-ruined ancient cities are home to the last human communities struggling to survive by foraging for what little green remains standing. These desert travelers transport goods on the backs of their caterpillars. Although their only goal is to make as much money as they can, at the same time and in a more or less deliberate way, they are helping to bring life back to the desert by carrying small plants from the artificial greenhouses of the cities to the most remote corners of this ocean of sand.\', 1, 4, \'https://cf.geekdo-images.com/jAbc4LK0aCkV-JDLuZAmog__imagepage/img/_l3nSuJXasb-74CtYhE25Ea1SJ0=/fit-in/900x600/filters:no_upscale():strip_icc()/pic7774173.jpg\');');
        $this->addSql('INSERT INTO game (id, name, description, min_players, max_player, image) VALUES (0x018F622B40117172BA2C75BEAAE42B51, \'Harmonies\', \'In Harmonies, build landscapes by placing colored tokens and create habitats for your animals. To earn the most points and win the game, incorporate the habitats in your landscapes wisely and have as many animals as you can settle there.\', 1, 4, \'https://cf.geekdo-images.com/A_XP2_VN3ugyqPhezowB_w__imagepage/img/eEOGt-VTMXD5zwTzFO9M4Lg7pkI=/fit-in/900x600/filters:no_upscale():strip_icc()/pic8026369.png\');');
        $this->addSql('INSERT INTO game (id, name, description, min_players, max_player, image) VALUES (0x018F622C9DF17CB7A04DFD30B9EE0727, \'ICE\', \'Players are archeologists exploring tiles they can remove. There are 5 levels of tiles in the game. The first one corresponds to the ice sheet level. The second, third and fourth represent surface, intermediate and deep artifacts levels. the last one is the edifice level. Archeologists dig these tiles in order to collect artifacts which gave them reputation points. The ice sheet tiles removed by a player can be played as a helping action for him. The edifice tiles are game changing rules and represent legacy material to discover as we go along.\', 1, 5, \'https://cf.geekdo-images.com/61xnbnswyvMmZ6pDleHewg__imagepage/img/f5ROgg-opnhnFavoinSWAWwRjmA=/fit-in/900x600/filters:no_upscale():strip_icc()/pic7711608.png\');');
        $this->addSql('INSERT INTO game (id, name, description, min_players, max_player, image) VALUES (0x018F77744262738A882B5DD85961E66A, \'Pathfinder 2nd Edition\', \'Pathfinder Second Edition is the culmination of over a decade of development and feedback from more than 125,000 gamers.\nStreamlined rules and intuitive presentation get you right in the action, whether you are a seasoned veteran or new to tabletop roleplaying.\nThe new system features the deep character customization you love, allowing you to tell the stories you want, featuring your own unique characters.\nTake cooperative storytelling with your friends to a new level. Where will your next adventure take you?\', 3, 6, \'https://cf.geekdo-images.com/MQHjomoQRUm0LuTyErLK3A__imagepage/img/GSSroR0PqYXRgqT6H_aDtY-ZTnc=/fit-in/900x600/filters:no_upscale():strip_icc()/pic5829629.jpg\');');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf(
            !$this->connection->getDatabasePlatform() instanceof \Doctrine\DBAL\Platforms\MySQL80Platform,
            "Migration can only be executed safely on '\Doctrine\DBAL\Platforms\MySQL80Platform'."
        );

        $this->addSql('DROP TABLE game');
        $this->abortIf(
            !$this->connection->getDatabasePlatform() instanceof \Doctrine\DBAL\Platforms\MySQL80Platform,
            "Migration can only be executed safely on '\Doctrine\DBAL\Platforms\MySQL80Platform'."
        );

        $this->addSql('DROP TABLE user_quest');
        $this->abortIf(
            !$this->connection->getDatabasePlatform() instanceof \Doctrine\DBAL\Platforms\MySQL80Platform,
            "Migration can only be executed safely on '\Doctrine\DBAL\Platforms\MySQL80Platform'."
        );

        $this->addSql('DROP TABLE user');
        $this->abortIf(
            !$this->connection->getDatabasePlatform() instanceof \Doctrine\DBAL\Platforms\MySQL80Platform,
            "Migration can only be executed safely on '\Doctrine\DBAL\Platforms\MySQL80Platform'."
        );

        $this->addSql('DROP TABLE tavern');
        $this->abortIf(
            !$this->connection->getDatabasePlatform() instanceof \Doctrine\DBAL\Platforms\MySQL80Platform,
            "Migration can only be executed safely on '\Doctrine\DBAL\Platforms\MySQL80Platform'."
        );

        $this->addSql('DROP TABLE quest');
    }
}

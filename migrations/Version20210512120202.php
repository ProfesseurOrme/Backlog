<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210512120202 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE user_game_status (id INT AUTO_INCREMENT NOT NULL, status_id INT NOT NULL, game_id INT DEFAULT NULL, user_id INT DEFAULT NULL, INDEX IDX_AF2E01416BF700BD (status_id), UNIQUE INDEX UNIQ_AF2E0141E48FD905 (game_id), UNIQUE INDEX UNIQ_AF2E0141A76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE user_game_status ADD CONSTRAINT FK_AF2E01416BF700BD FOREIGN KEY (status_id) REFERENCES status (id)');
        $this->addSql('ALTER TABLE user_game_status ADD CONSTRAINT FK_AF2E0141E48FD905 FOREIGN KEY (game_id) REFERENCES game (id)');
        $this->addSql('ALTER TABLE user_game_status ADD CONSTRAINT FK_AF2E0141A76ED395 FOREIGN KEY (user_id) REFERENCES `user` (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE user_game_status');
    }
}

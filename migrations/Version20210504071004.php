<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210504071004 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE backlog (id INT AUTO_INCREMENT NOT NULL, status_id INT NOT NULL, user_id INT NOT NULL, game_id INT NOT NULL, rating INT DEFAULT NULL, description LONGTEXT DEFAULT NULL, added_at DATETIME NOT NULL, INDEX IDX_2692056BF700BD (status_id), INDEX IDX_269205A76ED395 (user_id), INDEX IDX_269205E48FD905 (game_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE game (id INT AUTO_INCREMENT NOT NULL, uuid VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, slug VARCHAR(255) NOT NULL, release_date DATETIME NOT NULL, metacritic_rank INT DEFAULT NULL, rating INT DEFAULT NULL, rating_count INT DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE platform (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, uuid VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE release_data (id INT AUTO_INCREMENT NOT NULL, platform_id INT NOT NULL, game_id INT NOT NULL, date DATE NOT NULL, INDEX IDX_E0044374FFE6496F (platform_id), INDEX IDX_E0044374E48FD905 (game_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE status (id INT AUTO_INCREMENT NOT NULL, label VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `user` (id INT AUTO_INCREMENT NOT NULL, username VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, lastname VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL, last_activity DATETIME DEFAULT NULL, UNIQUE INDEX UNIQ_8D93D649F85E0677 (username), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE backlog ADD CONSTRAINT FK_2692056BF700BD FOREIGN KEY (status_id) REFERENCES status (id)');
        $this->addSql('ALTER TABLE backlog ADD CONSTRAINT FK_269205A76ED395 FOREIGN KEY (user_id) REFERENCES `user` (id)');
        $this->addSql('ALTER TABLE backlog ADD CONSTRAINT FK_269205E48FD905 FOREIGN KEY (game_id) REFERENCES game (id)');
        $this->addSql('ALTER TABLE release_data ADD CONSTRAINT FK_E0044374FFE6496F FOREIGN KEY (platform_id) REFERENCES platform (id)');
        $this->addSql('ALTER TABLE release_data ADD CONSTRAINT FK_E0044374E48FD905 FOREIGN KEY (game_id) REFERENCES game (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE backlog DROP FOREIGN KEY FK_269205E48FD905');
        $this->addSql('ALTER TABLE release_data DROP FOREIGN KEY FK_E0044374E48FD905');
        $this->addSql('ALTER TABLE release_data DROP FOREIGN KEY FK_E0044374FFE6496F');
        $this->addSql('ALTER TABLE backlog DROP FOREIGN KEY FK_2692056BF700BD');
        $this->addSql('ALTER TABLE backlog DROP FOREIGN KEY FK_269205A76ED395');
        $this->addSql('DROP TABLE backlog');
        $this->addSql('DROP TABLE game');
        $this->addSql('DROP TABLE platform');
        $this->addSql('DROP TABLE release_data');
        $this->addSql('DROP TABLE status');
        $this->addSql('DROP TABLE `user`');
    }
}

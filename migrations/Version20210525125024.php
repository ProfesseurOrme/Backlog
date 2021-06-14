<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210525125024 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE release_data');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE release_data (id INT AUTO_INCREMENT NOT NULL, platform_id INT NOT NULL, game_id INT NOT NULL, date DATE NOT NULL, INDEX IDX_E0044374E48FD905 (game_id), INDEX IDX_E0044374FFE6496F (platform_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE release_data ADD CONSTRAINT FK_E0044374E48FD905 FOREIGN KEY (game_id) REFERENCES game (id)');
        $this->addSql('ALTER TABLE release_data ADD CONSTRAINT FK_E0044374FFE6496F FOREIGN KEY (platform_id) REFERENCES platform (id)');
    }
}

<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210512121628 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user_game_status DROP INDEX UNIQ_AF2E0141A76ED395, ADD INDEX IDX_AF2E0141A76ED395 (user_id)');
        $this->addSql('ALTER TABLE user_game_status DROP INDEX UNIQ_AF2E0141E48FD905, ADD INDEX IDX_AF2E0141E48FD905 (game_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user_game_status DROP INDEX IDX_AF2E0141E48FD905, ADD UNIQUE INDEX UNIQ_AF2E0141E48FD905 (game_id)');
        $this->addSql('ALTER TABLE user_game_status DROP INDEX IDX_AF2E0141A76ED395, ADD UNIQUE INDEX UNIQ_AF2E0141A76ED395 (user_id)');
    }
}

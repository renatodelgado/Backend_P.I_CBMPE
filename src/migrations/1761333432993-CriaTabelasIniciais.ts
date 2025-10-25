import { MigrationInterface, QueryRunner } from "typeorm";

export class CriaTabelasIniciais1761333432993 implements MigrationInterface {
    name = 'CriaTabelasIniciais1761333432993'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`perfis\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`nome\` varchar(255) NOT NULL,
                \`descricao\` varchar(255) NULL,
                \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                UNIQUE INDEX \`IDX_0e08702e416f19191cde2b5ff0\` (\`nome\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`users\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`nome\` varchar(255) NOT NULL,
                \`matricula\` varchar(255) NOT NULL,
                \`cpf\` varchar(255) NOT NULL,
                \`patente\` varchar(255) NOT NULL,
                \`funcao\` varchar(255) NOT NULL,
                \`email\` varchar(255) NOT NULL,
                \`senha\` varchar(255) NOT NULL,
                \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`perfilId\` int NOT NULL,
                UNIQUE INDEX \`IDX_230b925048540454c8b4c481e1\` (\`cpf\`),
                UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`),
                UNIQUE INDEX \`IDX_e300f3bbe3f7f25d5b0ecd8424\` (\`matricula\`, \`email\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`ais\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`codigo\` varchar(255) NOT NULL,
                \`descricao\` varchar(255) NOT NULL,
                \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`regioes\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`nome\` varchar(255) NOT NULL,
                \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`aisId\` int NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`unidadesOperacionais\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`nome\` varchar(255) NOT NULL,
                \`pontoBase\` varchar(255) NOT NULL,
                \`sigla\` varchar(255) NOT NULL,
                \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`regiaoId\` int NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`equipes\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`nome\` varchar(255) NOT NULL,
                \`lider\` varchar(255) NOT NULL,
                \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`unidadeOperacionalId\` int NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`equipe_users\` (
                \`equipeId\` int NOT NULL,
                \`userId\` int NOT NULL,
                PRIMARY KEY (\`equipeId\`, \`userId\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`telefones\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`numero\` varchar(255) NOT NULL,
                \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`userId\` int NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`viaturas\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`tipo\` varchar(255) NOT NULL,
                \`numero\` varchar(255) NOT NULL,
                \`placa\` varchar(255) NOT NULL,
                \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`unidadeOperacionalId\` int NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`eventos_especiais\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`nomeEvento\` varchar(255) NOT NULL,
                \`dataInicio\` date NOT NULL,
                \`dataFim\` date NOT NULL,
                \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`localizacoes\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`municipio\` varchar(255) NOT NULL,
                \`bairro\` varchar(255) NOT NULL,
                \`logradouro\` varchar(255) NOT NULL,
                \`numero\` varchar(255) NOT NULL,
                \`complemento\` varchar(255) NULL,
                \`pontoReferencia\` varchar(255) NULL,
                \`latitude\` decimal(10, 6) NOT NULL,
                \`longitude\` decimal(10, 6) NOT NULL,
                \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`naturezas_ocorrencias\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`nome\` varchar(255) NOT NULL,
                \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`ocorrencias\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`numeroOcorrencia\` varchar(255) NOT NULL,
                \`dataHoraChamada\` timestamp NOT NULL,
                \`statusAtendimento\` varchar(255) NOT NULL,
                \`motivoNaoAtendimento\` varchar(255) NOT NULL,
                \`descricao\` text NULL,
                \`formaAcionamento\` varchar(255) NOT NULL,
                \`dataSincronizacao\` timestamp NULL,
                \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`unidadeOperacionalId\` int NOT NULL,
                \`usuarioId\` int NOT NULL,
                \`eventoEspecialId\` int NULL,
                \`localizacaoId\` int NOT NULL,
                \`naturezaOcorrenciaId\` int NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\`
            ADD CONSTRAINT \`FK_a7564398b65edf8fd5d4aa568c7\` FOREIGN KEY (\`perfilId\`) REFERENCES \`perfis\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`regioes\`
            ADD CONSTRAINT \`FK_4febd1f0dfbf52323c65dda9feb\` FOREIGN KEY (\`aisId\`) REFERENCES \`ais\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`unidadesOperacionais\`
            ADD CONSTRAINT \`FK_6cbeb34dccfbcb12be3c0e07a05\` FOREIGN KEY (\`regiaoId\`) REFERENCES \`regioes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`equipes\`
            ADD CONSTRAINT \`FK_e24ce3a5541067b2b6d455d3765\` FOREIGN KEY (\`unidadeOperacionalId\`) REFERENCES \`unidadesOperacionais\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`equipe_users\`
            ADD CONSTRAINT \`FK_5a8491144445fdcb1085f6e4318\` FOREIGN KEY (\`equipeId\`) REFERENCES \`equipes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`equipe_users\`
            ADD CONSTRAINT \`FK_18b486974581376ce6bf59ffa4e\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`telefones\`
            ADD CONSTRAINT \`FK_d8b1c6e269bc84ecc2100ff14ab\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`viaturas\`
            ADD CONSTRAINT \`FK_ecc133534ea22ed5cdbd4a4afd7\` FOREIGN KEY (\`unidadeOperacionalId\`) REFERENCES \`unidadesOperacionais\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`ocorrencias\`
            ADD CONSTRAINT \`FK_0ceefa568ff4e304016bd7bd0e3\` FOREIGN KEY (\`unidadeOperacionalId\`) REFERENCES \`unidadesOperacionais\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`ocorrencias\`
            ADD CONSTRAINT \`FK_4efcf7110b1397ee0deb8f9a3bd\` FOREIGN KEY (\`usuarioId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`ocorrencias\`
            ADD CONSTRAINT \`FK_58ce3e98a6ca172cd613e38ff7f\` FOREIGN KEY (\`eventoEspecialId\`) REFERENCES \`eventos_especiais\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`ocorrencias\`
            ADD CONSTRAINT \`FK_a14cf3fc12b7db05092dfbd862e\` FOREIGN KEY (\`localizacaoId\`) REFERENCES \`localizacoes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`ocorrencias\`
            ADD CONSTRAINT \`FK_46ab9603e8f5dab26b9d49866bd\` FOREIGN KEY (\`naturezaOcorrenciaId\`) REFERENCES \`naturezas_ocorrencias\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`ocorrencias\` DROP FOREIGN KEY \`FK_46ab9603e8f5dab26b9d49866bd\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`ocorrencias\` DROP FOREIGN KEY \`FK_a14cf3fc12b7db05092dfbd862e\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`ocorrencias\` DROP FOREIGN KEY \`FK_58ce3e98a6ca172cd613e38ff7f\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`ocorrencias\` DROP FOREIGN KEY \`FK_4efcf7110b1397ee0deb8f9a3bd\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`ocorrencias\` DROP FOREIGN KEY \`FK_0ceefa568ff4e304016bd7bd0e3\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`viaturas\` DROP FOREIGN KEY \`FK_ecc133534ea22ed5cdbd4a4afd7\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`telefones\` DROP FOREIGN KEY \`FK_d8b1c6e269bc84ecc2100ff14ab\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`equipe_users\` DROP FOREIGN KEY \`FK_18b486974581376ce6bf59ffa4e\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`equipe_users\` DROP FOREIGN KEY \`FK_5a8491144445fdcb1085f6e4318\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`equipes\` DROP FOREIGN KEY \`FK_e24ce3a5541067b2b6d455d3765\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`unidadesOperacionais\` DROP FOREIGN KEY \`FK_6cbeb34dccfbcb12be3c0e07a05\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`regioes\` DROP FOREIGN KEY \`FK_4febd1f0dfbf52323c65dda9feb\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_a7564398b65edf8fd5d4aa568c7\`
        `);
        await queryRunner.query(`
            DROP TABLE \`ocorrencias\`
        `);
        await queryRunner.query(`
            DROP TABLE \`naturezas_ocorrencias\`
        `);
        await queryRunner.query(`
            DROP TABLE \`localizacoes\`
        `);
        await queryRunner.query(`
            DROP TABLE \`eventos_especiais\`
        `);
        await queryRunner.query(`
            DROP TABLE \`viaturas\`
        `);
        await queryRunner.query(`
            DROP TABLE \`telefones\`
        `);
        await queryRunner.query(`
            DROP TABLE \`equipe_users\`
        `);
        await queryRunner.query(`
            DROP TABLE \`equipes\`
        `);
        await queryRunner.query(`
            DROP TABLE \`unidadesOperacionais\`
        `);
        await queryRunner.query(`
            DROP TABLE \`regioes\`
        `);
        await queryRunner.query(`
            DROP TABLE \`ais\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_e300f3bbe3f7f25d5b0ecd8424\` ON \`users\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_230b925048540454c8b4c481e1\` ON \`users\`
        `);
        await queryRunner.query(`
            DROP TABLE \`users\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_0e08702e416f19191cde2b5ff0\` ON \`perfis\`
        `);
        await queryRunner.query(`
            DROP TABLE \`perfis\`
        `);
    }

}

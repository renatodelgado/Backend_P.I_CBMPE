import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOcorrenciaUser1763912435140 implements MigrationInterface {
    name = 'CreateOcorrenciaUser1763912435140'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`unidadesOperacionais\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(255) NOT NULL, \`pontoBase\` varchar(255) NOT NULL, \`sigla\` varchar(255) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`RegiaoId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`gruposOcorrencias\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(255) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`naturezaOcorrenciaId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`subgruposOcorrencias\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(255) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`grupoOcorrenciaId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ocorrencia_users\` (\`ocorrenciaId\` int NOT NULL, \`userId\` int NOT NULL, PRIMARY KEY (\`ocorrenciaId\`, \`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`equipe_users\` ADD PRIMARY KEY (\`equipeId\`, \`userId\`)`);
        await queryRunner.query(`ALTER TABLE \`unidadesOperacionais\` ADD CONSTRAINT \`FK_812a5795974916444a2f2c93c33\` FOREIGN KEY (\`RegiaoId\`) REFERENCES \`regioes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_7623cebe6a1012580b6726ded6b\` FOREIGN KEY (\`unidadeOperacionalId\`) REFERENCES \`unidadesOperacionais\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`equipes\` ADD CONSTRAINT \`FK_e24ce3a5541067b2b6d455d3765\` FOREIGN KEY (\`unidadeOperacionalId\`) REFERENCES \`unidadesOperacionais\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`equipe_users\` ADD CONSTRAINT \`FK_5a8491144445fdcb1085f6e4318\` FOREIGN KEY (\`equipeId\`) REFERENCES \`equipes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`viaturas\` ADD CONSTRAINT \`FK_ecc133534ea22ed5cdbd4a4afd7\` FOREIGN KEY (\`unidadeOperacionalId\`) REFERENCES \`unidadesOperacionais\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`gruposOcorrencias\` ADD CONSTRAINT \`FK_35aea1f3517bf7e9302c80a0eb4\` FOREIGN KEY (\`naturezaOcorrenciaId\`) REFERENCES \`naturezas_ocorrencias\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`subgruposOcorrencias\` ADD CONSTRAINT \`FK_4c5611815bd7eb60dea6825fc6e\` FOREIGN KEY (\`grupoOcorrenciaId\`) REFERENCES \`gruposOcorrencias\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ocorrencias\` ADD CONSTRAINT \`FK_0ceefa568ff4e304016bd7bd0e3\` FOREIGN KEY (\`unidadeOperacionalId\`) REFERENCES \`unidadesOperacionais\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ocorrencias\` ADD CONSTRAINT \`FK_707db79e23e40fabdd513296037\` FOREIGN KEY (\`grupoOcorrenciaId\`) REFERENCES \`gruposOcorrencias\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ocorrencias\` ADD CONSTRAINT \`FK_d27b813a64e4b059ee043d26f18\` FOREIGN KEY (\`subgrupoOcorrenciaId\`) REFERENCES \`subgruposOcorrencias\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ocorrencia_users\` ADD CONSTRAINT \`FK_e785d45601a608ad164262435d3\` FOREIGN KEY (\`ocorrenciaId\`) REFERENCES \`ocorrencias\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ocorrencia_users\` ADD CONSTRAINT \`FK_9c9f1cdf513a4559ed4aaee2de2\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ocorrencia_users\` DROP FOREIGN KEY \`FK_9c9f1cdf513a4559ed4aaee2de2\``);
        await queryRunner.query(`ALTER TABLE \`ocorrencia_users\` DROP FOREIGN KEY \`FK_e785d45601a608ad164262435d3\``);
        await queryRunner.query(`ALTER TABLE \`ocorrencias\` DROP FOREIGN KEY \`FK_d27b813a64e4b059ee043d26f18\``);
        await queryRunner.query(`ALTER TABLE \`ocorrencias\` DROP FOREIGN KEY \`FK_707db79e23e40fabdd513296037\``);
        await queryRunner.query(`ALTER TABLE \`ocorrencias\` DROP FOREIGN KEY \`FK_0ceefa568ff4e304016bd7bd0e3\``);
        await queryRunner.query(`ALTER TABLE \`subgruposOcorrencias\` DROP FOREIGN KEY \`FK_4c5611815bd7eb60dea6825fc6e\``);
        await queryRunner.query(`ALTER TABLE \`gruposOcorrencias\` DROP FOREIGN KEY \`FK_35aea1f3517bf7e9302c80a0eb4\``);
        await queryRunner.query(`ALTER TABLE \`viaturas\` DROP FOREIGN KEY \`FK_ecc133534ea22ed5cdbd4a4afd7\``);
        await queryRunner.query(`ALTER TABLE \`equipe_users\` DROP FOREIGN KEY \`FK_5a8491144445fdcb1085f6e4318\``);
        await queryRunner.query(`ALTER TABLE \`equipes\` DROP FOREIGN KEY \`FK_e24ce3a5541067b2b6d455d3765\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_7623cebe6a1012580b6726ded6b\``);
        await queryRunner.query(`ALTER TABLE \`unidadesOperacionais\` DROP FOREIGN KEY \`FK_812a5795974916444a2f2c93c33\``);
        await queryRunner.query(`ALTER TABLE \`equipe_users\` DROP PRIMARY KEY`);
        await queryRunner.query(`DROP TABLE \`ocorrencia_users\``);
        await queryRunner.query(`DROP TABLE \`subgruposOcorrencias\``);
        await queryRunner.query(`DROP TABLE \`gruposOcorrencias\``);
        await queryRunner.query(`DROP TABLE \`unidadesOperacionais\``);
    }

}

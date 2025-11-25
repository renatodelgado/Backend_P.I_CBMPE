import { MigrationInterface, QueryRunner } from "typeorm";

export class AddVersionToOcorrencias1765000000000 implements MigrationInterface {
    name = 'AddVersionToOcorrencias1765000000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE ` + "`ocorrencias`" + ` ADD COLUMN ` + "`version`" + ` int NOT NULL DEFAULT 1`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE ` + "`ocorrencias`" + ` DROP COLUMN ` + "`version`");
    }

}

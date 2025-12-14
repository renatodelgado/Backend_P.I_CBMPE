import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateOcorrenciasDiarias1765675822002 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "ocorrencias_diarias",
                columns: [
                    {
                        name: "data",
                        type: "date",
                        isPrimary: true,
                    },
                    {
                        name: "municipio",
                        type: "varchar",
                        length: "100",
                        isPrimary: true,
                    },
                    {
                        name: "qtd_ocorrencias",
                        type: "int",
                        isNullable: false,
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("ocorrencias_diarias");
    }

}

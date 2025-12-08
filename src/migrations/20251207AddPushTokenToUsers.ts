import type { MigrationInterface, QueryRunner } from "typeorm";
import { TableColumn } from "typeorm";

export class AddPushTokenToUsers20251207 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "users",
      new TableColumn({
        name: "pushToken",
        type: "varchar",
        length: "255",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("users", "pushToken");
  }
}
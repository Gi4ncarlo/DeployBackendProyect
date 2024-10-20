import { MigrationInterface, QueryRunner } from "typeorm";

export class Prueba1729374069228 implements MigrationInterface {
    name = 'Prueba1729374069228'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "prueba"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "prueba"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "prueba" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "products" ADD "prueba" boolean DEFAULT true`);
    }

}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUserAndCarbonCertificateEntity1662935351768
  implements MigrationInterface
{
  name = 'createUserAndCarbonCertificateEntity1662935351768';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."carbon_certificate_status_enum" AS ENUM('available', 'owned', 'transferred')`,
    );
    await queryRunner.query(
      `CREATE TABLE "carbon_certificate" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "country" character varying NOT NULL, "status" "public"."carbon_certificate_status_enum" NOT NULL, "userId" uuid, CONSTRAINT "PK_d27468ee8ba0127dee0c7aba53d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "carbon_certificate" ADD CONSTRAINT "FK_7a92d741ac9619147007023119d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "carbon_certificate" DROP CONSTRAINT "FK_7a92d741ac9619147007023119d"`,
    );
    await queryRunner.query(`DROP TABLE "carbon_certificate"`);
    await queryRunner.query(
      `DROP TYPE "public"."carbon_certificate_status_enum"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
  }
}

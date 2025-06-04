import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUniversityTable1748552974303 implements MigrationInterface {
    name = 'CreateUniversityTable1748552974303'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "university" (
                "id" SERIAL NOT NULL,
                "university_name" character varying NOT NULL,
                "website_domain" character varying NOT NULL,
                "country" character varying NOT NULL,
                "accreditation_body" character varying,
                "university_email" character varying NOT NULL,
                "wallet_address" character varying NOT NULL,
                "staff_name" character varying NOT NULL,
                "job_title" character varying NOT NULL,
                "phone_number" character varying NOT NULL,
                "password" character varying NOT NULL,
                "is_verified" boolean NOT NULL DEFAULT false,
                CONSTRAINT "UQ_university_email" UNIQUE ("university_email"),
                CONSTRAINT "PK_university" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "university"`);
    }
}

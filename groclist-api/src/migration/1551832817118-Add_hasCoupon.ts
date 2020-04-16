import {MigrationInterface, QueryRunner} from "typeorm";

export class AddHasCoupon1551832817118 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "temporary_grocery_list_item" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "isCollected" boolean NOT NULL, "groceryListId" integer, "hasCoupon" boolean NOT NULL, CONSTRAINT "FK_79e620dadb7fc7b4dd96a6d51cc" FOREIGN KEY ("groceryListId") REFERENCES "grocery_list" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_grocery_list_item"("id", "name", "isCollected", "groceryListId", "hasCoupon") SELECT "id", "name", "isCollected", "groceryListId", 0 FROM "grocery_list_item"`);
        await queryRunner.query(`DROP TABLE "grocery_list_item"`);
        await queryRunner.query(`ALTER TABLE "temporary_grocery_list_item" RENAME TO "grocery_list_item"`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "grocery_list_item" RENAME TO "temporary_grocery_list_item"`);
        await queryRunner.query(`CREATE TABLE "grocery_list_item" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "isCollected" boolean NOT NULL, "groceryListId" integer, CONSTRAINT "FK_79e620dadb7fc7b4dd96a6d51cc" FOREIGN KEY ("groceryListId") REFERENCES "grocery_list" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "grocery_list_item"("id", "name", "isCollected", "groceryListId") SELECT "id", "name", "isCollected", "groceryListId" FROM "temporary_grocery_list_item"`);
        await queryRunner.query(`DROP TABLE "temporary_grocery_list_item"`);
    }

}

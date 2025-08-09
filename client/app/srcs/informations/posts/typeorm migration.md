# typeorm migration

```json
//package.json
{
  "script": {
    "typeorm": "node -r ts-node/register ./node_modules/typeorm/cli.js",
    "typeorm:d": "node -r ts-node/register ./node_modules/typeorm/cli.js -d migrations/config.ts"
  }
}
```

```bash
npm run typeorm migration:create {path of migrationdir}/{migration file name}
```

생성된 migration file 수정 (example)

```typescript
import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1754729608732 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE reservation
            ADD COLUMN startTime DATETIME NOT NULL,
            ADD COLUMN endTime DATETIME NOT NULL,
            DROP COLUMN date
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE reservation
            DROP COLUMN startTime,
            DROP COLUMN endTime
        `);
    }

}
```

마이그레이션 실행

```bash
npm run typeorm:d migration:run
```
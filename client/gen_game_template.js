const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('  Write Game File Name : ', (filename) => {
  rl.question(' Write Game Description : ', (description) => {
    const PascalName = filename.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join('');
    try {
      const index = fs.readFileSync(`${__dirname}/template/game/file-name.tsx`, 'utf-8');
      const newIndex = index.replace(/file-name/g, filename).replace(/TodoName/g, PascalName);
      fs.writeFileSync(`${__dirname}/app/pages/game/${filename}.tsx`, newIndex);

      fs.cpSync(`${__dirname}/template/game/srcs`, `${__dirname}/app/srcs/game/${filename}`, { recursive: true });

      fs.renameSync(
        `${__dirname}/app/srcs/game/${filename}/config/file-name.config.ts`,
        `${__dirname}/app/srcs/game/${filename}/config/${filename}.config.ts`,
      );
      fs.renameSync(
        `${__dirname}/app/srcs/game/${filename}/scene/file-name.scene.stage.ts`,
        `${__dirname}/app/srcs/game/${filename}/scene/${filename}.scene.stage.ts`,
      );
      fs.renameSync(
        `${__dirname}/app/srcs/game/${filename}/dto/file-name.dto.ref.ts`,
        `${__dirname}/app/srcs/game/${filename}/dto/${filename}.dto.ref.ts`,
      )

      const container = fs.readFileSync(`${__dirname}/app/srcs/game/${filename}/file-name.container.tsx`, 'utf-8');
      const page = fs.readFileSync(`${__dirname}/app/srcs/game/${filename}/file-name.page.tsx`, 'utf-8');

      const newContainer = container.replace(/file-name/g, filename).replace(/TodoName/g, PascalName);
      const newPage = page.replace(/file-name/g, filename).replace(/TodoName/g, PascalName);

      fs.writeFileSync(`${__dirname}/app/srcs/game/${filename}/${filename}.container.tsx`, newContainer);
      fs.writeFileSync(`${__dirname}/app/srcs/game/${filename}/${filename}.page.tsx`, newPage);


      fs.rmSync(`${__dirname}/app/srcs/game/${filename}/file-name.container.tsx`);
      fs.rmSync(`${__dirname}/app/srcs/game/${filename}/file-name.page.tsx`);

      const gameList = fs.readFileSync(`${__dirname}/app/srcs/game/game-list.json`, 'utf-8');
      const gameListJson = JSON.parse(gameList);

      const newGameList = {
        ...gameListJson,
        [filename]: {
          title: PascalName,
          path: `/game/${filename}`,
          description: description,
          thumbnail: `/thumbnail/${filename}-thumbnail.png`,
        },
      };
      fs.writeFileSync(`${__dirname}/app/srcs/game/game-list.json`, JSON.stringify(newGameList, null, 2));

      rl.close();
    } catch (err) {
      console.log(err);
      rl.close();
    }
  });
});

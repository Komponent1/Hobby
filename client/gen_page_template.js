const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('  Write Page Name(Write lowercase) : ', (pagename) => {
  try {
    fs.cpSync(`${__dirname}/template/page/todo-page`, `${__dirname}/app/pages/${pagename}`, {recursive: true});
    const newPage = fs.readFileSync(`${__dirname}/app/pages/${pagename}/index.tsx`, 'utf-8')
      .replace(/todo/g, pagename)
      .replace(/Todo/g, pagename.charAt(0).toUpperCase() + pagename.slice(1))
      .replace(/TODO/g, pagename.toUpperCase());
    fs.writeFileSync(`${__dirname}/app/pages/${pagename}/index.tsx`, newPage);

    fs.cpSync(`${__dirname}/template/page/todo-srcs`, `${__dirname}/app/srcs/${pagename}`, { recursive: true });
    fs.renameSync(
      `${__dirname}/app/srcs/${pagename}/todo.page.tsx`,
      `${__dirname}/app/srcs/${pagename}/${pagename}.page.tsx`,
    );
    fs.renameSync(
      `${__dirname}/app/srcs/${pagename}/todo.props.ts`,
      `${__dirname}/app/srcs/${pagename}/${pagename}.props.ts`,
    );
    const pageContent = fs.readFileSync(`${__dirname}/app/srcs/${pagename}/${pagename}.page.tsx`, 'utf-8')
      .replace(/todo/g, pagename)
      .replace(/Todo/g, pagename.charAt(0).toUpperCase() + pagename.slice(1));
    fs.writeFileSync(`${__dirname}/app/srcs/${pagename}/${pagename}.page.tsx`, pageContent);
    const propsContent = fs.readFileSync(`${__dirname}/app/srcs/${pagename}/${pagename}.props.ts`, 'utf-8')
      .replace(/todo/g, pagename)
      .replace(/Todo/g, pagename.charAt(0).toUpperCase() + pagename.slice(1));
    fs.writeFileSync(`${__dirname}/app/srcs/${pagename}/${pagename}.props.ts`, propsContent);

    rl.close();
  } catch (err) {
    console.error(err);
    rl.close();
  }
});
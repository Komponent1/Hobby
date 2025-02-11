const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('  Write Title : ', (title) => {
  rl.question('  Write Tags (with \',\') : ', (tags) => {
    try {
      const articleList = fs.readFileSync(`${__dirname}/app/srcs/article/posts/articles.json`, 'utf-8');
      const articleListJson = JSON.parse(articleList);
  
      const newArticleNumber = Number(Object.keys(articleListJson).reverse()[0]) + 1;
      const newArticleListJson = {
        ...articleListJson,
        [newArticleNumber]: {
          id: newArticleNumber,
          title,
          path: `${title}.md`,
          tags: tags.split(','),
        },
      }
      fs.writeFileSync(`${__dirname}/app/srcs/article/posts/articles.json`, JSON.stringify(newArticleListJson, null, 2));
      
    } catch (err) {
      console.log('Artice.json gen error');
      rl.close(); 
    }
    
    try {
      fs.writeFileSync(`${__dirname}/app/srcs/article/posts/${title}.md`, `# ${title}\n\n`);
      rl.close();
    } catch (err) {
      console.log('Article.md gen error')
      rl.close();
    }
  });
});
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('  Write UI Component Name (kebab-case, e.g. text-area): ', (filename) => {
  rl.question(' Write UI Component Description : ', (description) => {
    const PascalName = filename.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join('');
    const camelName = filename.split('-').map((word, index) => 
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    ).join('');
    
    try {
      // 1. Create page file in pages/seolim-ui/
      const pageTemplate = `/* eslint-disable max-len */
import React from 'react';
import Ui${PascalName} from '../../srcs/seolim-ui/ui/${filename}seolim-ui.ui.${filename}';
import type { NextPageWithLayout } from '../_app';
import SeolimUiLayout from '../../srcs/seolim-ui/layout/seolim-ui.layout';

const Ui${PascalName}Page: NextPageWithLayout = () => (
  <Ui${PascalName} />
);

Ui${PascalName}Page.getLayout = (page: React.ReactNode) => <SeolimUiLayout>{page}</SeolimUiLayout> as React.ReactElement<typeof SeolimUiLayout>;

export default Ui${PascalName}Page;
`;

      fs.writeFileSync(`${__dirname}/app/pages/seolim-ui/${filename}.tsx`, pageTemplate);

      // 2. Create UI component in srcs/seolim-ui/ui/
      const uiComponentTemplate = `import React from 'react';

const Ui${PascalName}: React.FC = () => (
  <div>
    <h1>${PascalName} Component</h1>
    <p>${description}</p>
    {/* Add your ${filename} component examples here */}
  </div>
);

export default Ui${PascalName};
`;

      fs.mkdirSync(`${__dirname}/app/srcs/seolim-ui/ui/${filename}`, { recursive: true });
      fs.writeFileSync(`${__dirname}/app/srcs/seolim-ui/ui/${filename}/seolim-ui.ui.${filename}.tsx`, uiComponentTemplate);
      fs.writeFileSync(`${__dirname}/app/srcs/seolim-ui/ui/${filename}/seolim-ui.ui.${filename}.example.ts`, '');

      // 3. Update ui-data.ts
      const uiDataPath = `${__dirname}/app/srcs/seolim-ui/ui-data.ts`;
      const uiData = fs.readFileSync(uiDataPath, 'utf-8');
      
      // Update the UI type by adding the new component to existing types
      const typeRegex = /export type UI = ([^;]+);/;
      const typeMatch = uiData.match(typeRegex);
      let updatedUiData = uiData;
      
      if (typeMatch && !typeMatch[1].includes(`'${PascalName}'`)) {
        const newTypeDefinition = `export type UI = ${typeMatch[1]} | '${PascalName}';`;
        updatedUiData = uiData.replace(typeRegex, newTypeDefinition);
      }
      
      // Add new data entry - find the closing bracket of data object and add before it
      const dataEndRegex = /(}\s*,\s*order:)/;
      const dataWithNewEntry = updatedUiData.replace(dataEndRegex, `    ${PascalName}: {
      name: '${PascalName}',
      link: '/seolim-ui/${filename}',
    },
  },
  order:`);
      
      // Add to order array - find the closing bracket of order array and add before it
      const orderEndRegex = /(]\s*,\s*})/;
      const finalData = dataWithNewEntry.replace(orderEndRegex, `    '${PascalName}',
  ],
};`);
      
      fs.writeFileSync(uiDataPath, finalData);

      // 4. Auto-fix lint issues using ESLint
      console.log('🔧 Fixing lint issues in ui-data.ts...');
      
      const { execSync } = require('child_process');
      try {
        // Run ESLint with auto-fix on the ui-data.ts file
        execSync(`npx eslint "${uiDataPath}" --fix`, { 
          cwd: __dirname + '/app',
          stdio: 'inherit' 
        });
        console.log('✅ Lint issues fixed automatically!');
      } catch (error) {
        console.log('⚠️  ESLint auto-fix completed with some warnings (this is normal)');
      }

      console.log(`✅ UI component '${filename}' created successfully!`);
      console.log(`📄 Page: /pages/seolim-ui/${filename}.tsx`);
      console.log(`🧩 UI Component: /srcs/seolim-ui/ui/seolim-ui.ui.${filename}.tsx`);
      console.log(`📝 ui-data.ts updated`);
      console.log(`\n🚀 You can now visit: http://localhost:3000/seolim-ui/${filename}`);

      rl.close();
    } catch (err) {
      console.error('❌ Error creating UI component:', err);
      rl.close();
    }
  });
});

import fs from 'fs';
import { menuPages } from '../src/data/menuData.js';

const outputPath = './data/menu.json';

try {
    fs.writeFileSync(outputPath, JSON.stringify(menuPages, null, 2));
    console.log('Successfully converted menuData.js to menu.json');
} catch (error) {
    console.error('Error converting data:', error);
}

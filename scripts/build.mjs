import { mkdir, copyFile, cp, rm, lstat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, join } from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = resolve(root, 'dist');
if (output !== join(root, 'dist')) throw new Error('Invalid build directory');
try { if ((await lstat(output)).isSymbolicLink()) throw new Error('Build directory must not be a link'); } catch (error) { if (error.code !== 'ENOENT') throw error; }
await rm(output, {recursive:true,force:true});
await mkdir(output, {recursive:true});
for (const name of ['index.html','enneagram.html','favicon.svg']) await copyFile(join(root,name),join(output,name));
await cp(join(root,'assets'),join(output,'assets'),{recursive:true});
console.log('Static site built in dist/. No dependencies, server functions or user data.');

import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root=fileURLToPath(new URL('../',import.meta.url));
const port=Number(process.env.PORT||4173);
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml'};
createServer(async(req,res)=>{
  try{
    const url=new URL(req.url,'http://localhost');
    const pathname=decodeURIComponent(url.pathname);
    const relative=pathname==='/'?'index.html':pathname==='/enneagram'?'enneagram.html':pathname.slice(1);
    if(relative.split('/').some(part=>part.startsWith('.'))){res.writeHead(404);res.end();return;}
    const file=resolve(root,relative);
    if(!file.startsWith(root.endsWith(sep)?root:root+sep)||!(await stat(file)).isFile())throw new Error('Not found');
    const body=await readFile(file);
    res.writeHead(200,{'Content-Type':mime[extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(body);
  }catch{res.writeHead(404);res.end('Not found');}
}).listen(port,'127.0.0.1',()=>console.log(`Ennegram: http://127.0.0.1:${port}`));

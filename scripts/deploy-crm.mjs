// Pin this deployment to the verified CRM project, independently of other local worktrees.
import {spawn} from 'node:child_process';
const code=await new Promise((resolve,reject)=>{const child=spawn(process.execPath,['C:/Users/anshu/AppData/Local/hermes/node/node_modules/vercel/dist/vc.js','deploy','--prod','--yes','--scope','goldfish4'],{cwd:process.cwd(),windowsHide:true,stdio:'inherit',env:{...process.env,VERCEL_ORG_ID:'team_9HsHIsE9kSidlgyEpI867FVH',VERCEL_PROJECT_ID:'prj_9mrCDRmqkyuWZTHdafm2pf8ngs0K'}});child.on('error',reject);child.on('exit',resolve);});process.exit(Number(code)||0);

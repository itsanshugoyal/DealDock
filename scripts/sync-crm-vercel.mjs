// Values flow directly from local env into Vercel stdin, never CLI args or output.
import nextEnv from '@next/env';
import {spawn} from 'node:child_process';
nextEnv.loadEnvConfig(process.cwd(),true,{info(){},error(){}});
const cli='C:/Users/anshu/AppData/Local/hermes/node/node_modules/vercel/dist/vc.js';
const keys=['AIRTABLE_PAT','AIRTABLE_BASE_ID','CRM_PASSWORD_HASH','CRM_SESSION_SECRET'];
for(const key of keys){
  const value=process.env[key];
  if(!value){console.log(key+': not configured; hosted CRM remains locked until setup');continue;}
  const code=await new Promise((resolve,reject)=>{const child=spawn(process.execPath,[cli,'env','add',key,'production','--sensitive','--force','--yes','--project','dealdock-crm','--scope','goldfish4'],{cwd:process.cwd(),windowsHide:true,stdio:['pipe','pipe','pipe']});
    child.stdout.resume();child.stderr.resume();child.on('error',reject);child.on('exit',resolve);child.stdin.end(value);
  });
  if(code!==0){console.error(key+': Vercel configuration failed, exit '+code);process.exit(1);}console.log(key+': configured securely');
}

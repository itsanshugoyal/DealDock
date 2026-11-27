export async function GET(){return Response.json({error:'Legacy automation is retired. Use the CRM workspace.'},{status:410});}
export async function POST(){return Response.json({error:'Workflow activation is disabled.'},{status:410});}

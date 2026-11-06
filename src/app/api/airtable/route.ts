// Legacy unauthenticated Airtable mirror. Lead data is served only by the authenticated CRM.
export async function GET(){return Response.json({error:'Use the authenticated CRM workspace.'},{status:410});}

// DealDock pipeline constants — shared across API routes and UI

export const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID!;
export const AIRTABLE_PAT = process.env.AIRTABLE_PAT!;

export const N8N_BASE_URL =
  process.env.N8N_BASE_URL || "http://localhost:5678";
export const N8N_API_KEY = process.env.N8N_API_KEY!;

// DealDock workflow IDs in n8n
export const WORKFLOW_IDS: Record<string, string> = {
  "01-lead-sourcing": "d8YMeCAueTucIkD0",
  "02-enrichment": "YC77aVl5dlHDH4ng",
  "03-ai-qualification": "CzwUqnOitBKeJGot",
  "04-email-sequences": "411zkm7jWRURJuOU",
  "05-reply-monitor": "PZMjxDwAnJXzAzrl",
  "06-slack-outreach-drafts": "4Tj8zcjVHIY3fFCO",
  "07-calendly-booking": "EGgI9dWWaEE9zu0L",
};

// Workflow metadata for UI
export const WORKFLOW_META: Record<
  string,
  { label: string; trigger: string; color: string }
> = {
  "01-lead-sourcing": {
    label: "Lead Sourcing",
    trigger: "Daily 6 AM",
    color: "#22c55e",
  },
  "02-enrichment": {
    label: "Enrichment",
    trigger: "Every 30 min",
    color: "#3b82f6",
  },
  "03-ai-qualification": {
    label: "AI Qualification",
    trigger: "Every 15 min",
    color: "#a855f7",
  },
  "04-email-sequences": {
    label: "Email Sequences",
    trigger: "Daily 12 PM",
    color: "#f97316",
  },
  "05-reply-monitor": {
    label: "Reply Monitor",
    trigger: "Every 2 hours",
    color: "#ec4899",
  },
  "06-slack-outreach-drafts": {
    label: "Outreach Drafts",
    trigger: "Every 30 min",
    color: "#06b6d4",
  },
  "07-calendly-booking": {
    label: "Calendly Booking",
    trigger: "Webhook",
    color: "#ffc107",
  },
};

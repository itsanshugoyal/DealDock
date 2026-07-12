# DealDock n8n Startup Script
# Sets all required environment variables then launches n8n
#
# Usage: .\start-n8n.ps1
#
# Fill in the values below before first run.

# ── Airtable (already configured) ──
$env:AIRTABLE_BASE_ID = "appd6MifJsQc0hBXo"
$env:AIRTABLE_LEADS_TABLE = "Leads"
$env:AIRTABLE_CALLS_TABLE = "Calls"

# ── API Keys (fill these in) ──
$env:ANTHROPIC_API_KEY = ""        # console.anthropic.com → API Keys
$env:APIFY_API_TOKEN = ""          # apify.com → Settings → Integrations → API
$env:HUNTER_API_KEY = ""           # hunter.io → Dashboard → API

# ── Slack Webhooks (create channels first, then webhooks) ──
$env:SLACK_WEBHOOK_LEADS = ""      # api.slack.com → Your Apps → Incoming Webhooks → #dealdock-leads
$env:SLACK_WEBHOOK_OUTREACH = ""   # api.slack.com → Your Apps → Incoming Webhooks → #dealdock-outreach

# ── Calendly & Sender ──
$env:CALENDLY_LINK = "https://calendly.com/itsanshugoyal/new-meeting"            # e.g. https://calendly.com/anshu/20min
$env:SENDER_NAME = "Anshu"

# ── Start n8n ──
Write-Host ""
Write-Host "=== DealDock n8n ==="
Write-Host "Airtable Base: $env:AIRTABLE_BASE_ID"
Write-Host "Leads Table:   $env:AIRTABLE_LEADS_TABLE"
Write-Host "Calls Table:   $env:AIRTABLE_CALLS_TABLE"
Write-Host "Sender:        $env:SENDER_NAME"

# Check for empty required vars
$missing = @()
if (-not $env:ANTHROPIC_API_KEY) { $missing += "ANTHROPIC_API_KEY" }
if (-not $env:APIFY_API_TOKEN) { $missing += "APIFY_API_TOKEN" }
if (-not $env:SLACK_WEBHOOK_LEADS) { $missing += "SLACK_WEBHOOK_LEADS" }
if (-not $env:CALENDLY_LINK) { $missing += "CALENDLY_LINK" }

if ($missing.Count -gt 0) {
    Write-Host ""
    Write-Host "WARNING: These env vars are empty (some workflows will fail):" -ForegroundColor Yellow
    foreach ($m in $missing) {
        Write-Host "  - $m" -ForegroundColor Yellow
    }
    Write-Host ""
}

Write-Host ""
Write-Host "Starting n8n on http://localhost:5678 ..."
Write-Host ""

npx n8n start

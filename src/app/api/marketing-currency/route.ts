import { currencySuggestionResponse } from "@/lib/marketing-pricing.mjs";

// Only a coarse currency hint is returned. No external lookup or IP storage.
export function GET(request: Request) {
  return currencySuggestionResponse(request);
}

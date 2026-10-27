export const GOOGLE_TAG_MANAGER_ID = "GTM-MXV6HLJT";

/** Load third-party measurement only on the indexable marketing deployment. */
export function marketingGtmId(marketingSiteLive) {
  return marketingSiteLive ? GOOGLE_TAG_MANAGER_ID : null;
}

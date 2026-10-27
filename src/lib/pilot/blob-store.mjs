import { get, put } from "@vercel/blob";

/** @param {{get:typeof get,put:typeof put}} client */
export function createPrivateApplicationStore(client = { get, put }) {
  return {
    async save(record) {
      const pathname = "pilot-applications/" + record.id + ".json";
      try {
        await client.put(pathname, JSON.stringify(record), {
          access: "private", addRandomSuffix: false, allowOverwrite: false,
          contentType: "application/json", cacheControlMaxAge: 60,
        });
      } catch (error) {
        // A timeout can occur after a successful write. Verify the saved content
        // before acknowledging a retry; never overwrite a different application.
        const previous = await client.get(pathname, { access: "private", useCache: false }).catch(() => null);
        if (previous?.statusCode !== 200) throw error;
        const saved = await new Response(previous.stream).json();
        if (saved.fingerprint !== record.fingerprint) throw Object.assign(new Error("Application conflict"), { code: "APPLICATION_CONFLICT" });
      }
    },
  };
}

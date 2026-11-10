// Supabase Edge Function "mark": forwards a marking prompt to Claude.
// Secrets required (Project > Edge Functions > Secrets): ANTHROPIC_API_KEY. Optional: ANTHROPIC_MODEL.
// JWT verification stays ON, so only signed-in users of the site can call it.
const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  try {
    const { prompt } = await req.json();
    if (typeof prompt !== "string" || prompt.length < 50) return json({ error: "No prompt" }, 400);
    if (prompt.length > 60000) return json({ error: "Prompt too long" }, 400);
    const key = Deno.env.get("ANTHROPIC_API_KEY");
    if (!key) return json({ error: "ANTHROPIC_API_KEY is not set in the function secrets" }, 500);
    const model = Deno.env.get("ANTHROPIC_MODEL") || "claude-sonnet-5-5";
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json" },
      body: JSON.stringify({ model, max_tokens: 6000, temperature: 0.2, messages: [{ role: "user", content: prompt }] }),
    });
    const j = await r.json();
    if (!r.ok) return json({ error: (j.error && j.error.message) || ("Anthropic API error " + r.status) }, 502);
    const text = (j.content || []).map((c: { text?: string }) => c.text || "").join("");
    return json({ text, model });
  } catch (e) {
    return json({ error: (e as Error).message || "failed" }, 500);
  }
});
function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...cors, "content-type": "application/json" } });
}

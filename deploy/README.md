# Self-hosted deployment (GitHub Pages + Supabase)

1. Supabase > SQL Editor: run supabase/schema.sql.
2. Supabase > Authentication > Providers: Email enabled (default). Optional: turn off "Confirm email" so sign-up works instantly for a private site.
3. Supabase > Authentication > URL Configuration: Site URL = the GitHub Pages URL; add it to Redirect URLs.
4. Supabase > Edge Functions: create a function named `mark`, paste supabase/functions/mark/index.ts, deploy. Add secret ANTHROPIC_API_KEY (and optionally ANTHROPIC_MODEL).
5. Site: fill config.js with the project URL and anon key. Push the site folder to the GitHub repo; Settings > Pages > Deploy from branch (main, root).

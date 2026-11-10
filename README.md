# IELTS Academic practice

Computer-delivered IELTS Academic practice site: 8 Listening, 8 Reading and 8 Writing tests, Speaking examiner sets, timers, auto-marking, Claude marking for Writing, and per-user progress.

- Hosted on GitHub Pages (static files in this repo).
- Accounts, progress storage and the marking function run on Supabase (see `deploy/`).
- `config.js` holds the Supabase project URL and publishable key (public by design). No secrets live in this repo.

Adding tests: see `SCHEMA.md`; validate with `node tools/validate.js data/<file>.js`.

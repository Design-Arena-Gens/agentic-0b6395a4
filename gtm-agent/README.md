## Agentic GTM Console

An end-to-end go-to-market agent that converts product context into a deployable GTM system. Built with Next.js (App Router), Tailwind CSS, and a deterministic strategy engine so it ships ready for execution without external AI dependencies.

### Features

- Product blueprint form that captures positioning, launch stage, pricing strategy, tone, and founder constraints
- Server-side GTM agent that synthesizes narratives, persona intelligence, channel cadences, content calendar, launch plays, sales enablement kit, metrics, and automation tracks
- Rich presentation layer with operational cards designed for a founding GTM pod
- API-first design (`/api/generate`) for integrating with other workflows or tooling

### Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to work with the UI. Update `src/app/page.tsx` or the agent logic in `src/lib/agent.ts` to adapt the playbooks.

### Production Build

```bash
npm run lint
npm run build
```

The project is optimized for Vercel deployment and relies solely on static + serverless assets provided by Next.js.

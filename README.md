# HH Goa 2026 — Frame/ID Card Generator (starter scaffold)

## Quick start
```bash
npm install
npm run dev
# open http://localhost:3000
```

## What's wired up
- Upload → client-side canvas compositing → download/share flow (see `app/page.tsx`)
- Design tokens in `lib/design-tokens.ts`, mirrored into `tailwind.config.ts`
- Signature "tide wash" reveal animation in `components/motion/TideReveal.tsx`
- HEIC → JPEG normalization in `lib/canvas-utils.ts` (lazy-loaded, only runs for HEIC files)
- Share page with server-rendered OG tags at `app/s/[shareId]/page.tsx`
- Zustand store for flow state in `lib/store.ts`

## Still to wire up before ship
- `lib/share-store.ts` — connect to your actual KV/R2 lookup (stubbed in the share page import)
- `app/api/upload/route.ts` — accept the composited PNG, store to R2, return a `shareId`
- Real frame/card artwork in `public/assets/frames/`
- Cloudflare Turnstile on `UploadZone` if you want bot protection without a login wall

See the full architecture + phased plan document for the complete picture.

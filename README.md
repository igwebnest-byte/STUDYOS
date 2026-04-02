# StudyOS

StudyOS is a production-oriented Next.js + Tailwind CSS web application scaffold for a modern SaaS product.

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Modular component architecture

## Highlights

- Scalable route-group architecture: marketing pages and product app pages are separated.
- Reusable UI primitives (`Button`, `Card`, `Badge`, `Progress`) for consistent styling.
- Domain-driven mock data in `src/data/mock-data.ts`.
- Typed models in `src/types/index.ts` for easy backend/API integration.
- Responsive layouts for mobile and desktop.

## Folder Structure

```text
STUDYOS/
  src/
    app/
      (marketing)/
      (app)/
    components/
      ui/
      layout/
      marketing/
      dashboard/
      customers/
      settings/
    data/
    lib/
    types/
```

## Run Locally

```bash
npm install
npm run dev
```

## Production Commands

```bash
npm run lint
npm run type-check
npm run build
npm run start
```

## Notes

- Backend endpoints are intentionally mocked for now.
- Replace values in `src/data/mock-data.ts` with API calls or server actions when backend contracts are finalized.

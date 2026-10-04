# Changing data with useMutation (the real app behind the video)

```bash
npm install
npm run dev        # http://localhost:5173
```

The profile picker from the TanStack Query video, now with a small form under the card. Type a new city for Alice
(Mumbai), press **Save**: the change goes to the server with `useMutation`. With `invalidateQueries` in `onSuccess`,
the card refetches and shows the new city; without it, the save works but the card keeps showing the old one until
something else refetches it. Open DevTools › Network (Fetch/XHR) to watch the `PATCH` and the `GET` after it, and the
TanStack Query DevTools (the floating button, bottom right) to see the query go to "fetching" and the mutation succeed.

- `vite.config.js` serves a tiny API from `api/users.json`: `GET /api/users/:id` (Alice is delayed 2 s on purpose,
  everyone else 0.4 s) and `PATCH /api/users/:id` (0.6 s), which merges the JSON body into that user and answers with
  the updated user. The changes live in memory: restarting the dev server puts everyone back (the file is never written).
- `src/main.jsx` creates one `QueryClient` and wraps the app in `QueryClientProvider` (plus `ReactQueryDevtools`).
- `src/versions/` holds each step of the story (see its README). `src/Profile.jsx` is whichever version was copied in
  last (the finished app: `useMutation` + `invalidateQueries`).

Sources: [Mutations](https://tanstack.com/query/latest/docs/framework/react/guides/mutations) ·
[Invalidations from mutations](https://tanstack.com/query/latest/docs/framework/react/guides/invalidations-from-mutations) ·
[Query invalidation](https://tanstack.com/query/latest/docs/framework/react/guides/query-invalidation)

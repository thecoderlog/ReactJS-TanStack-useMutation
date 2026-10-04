# Versions

Each file here is one step of the story. The video's code panels read these files, and
`../../../capture.mjs` copies each one into `src/Profile.jsx` before capturing (on a fresh dev server each time,
so Alice is back in Pune), the way you'd edit and save the real file. Edit a version here, then re-run the capture.

| File | Shown in beats |
|---|---|
| `Profile.query.jsx` | hook.read: the TanStack Query video's finished `Profile.jsx` (`useQuery` with `signal`), unchanged |
| `Profile.mutation.jsx` | hook.*, mutate.*, stale.*: adds the `EditCity` form with `useMutation` (no invalidation: the card keeps the old city) |
| `Profile.mutation-invalidate.jsx` | invalidate.*: adds `useQueryClient` and an `onSuccess` that awaits `invalidateQueries` (the finished app) |

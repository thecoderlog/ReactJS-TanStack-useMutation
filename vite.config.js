import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import users from './api/users.json' with { type: 'json' };

// A tiny API served by Vite itself:
//   GET   /api/users/:id   read one user
//   PATCH /api/users/:id   change some of a user's fields
// Alice's answer is slowed down on purpose, so her requests
// are easy to see in the Network tab.
const DELAY_MS = { alice: 2000 };
const DEFAULT_MS = 400;
const PATCH_MS = 600;

// The "database": a copy of users.json in memory.
// Restarting the dev server puts everyone back.
const db = structuredClone(users);

function usersApi(req, res, next) {
  const match = req.url.match(/^\/api\/users\/(\w+)$/);
  if (!match) return next();
  const id = match[1];

  if (req.method === 'PATCH') return patchUser(id, req, res);

  setTimeout(() => {
    const user = db[id];
    if (!user) {
      res.statusCode = 404;
      return res.end('Not found');
    }
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(user));
  }, DELAY_MS[id] ?? DEFAULT_MS);
}

function patchUser(id, req, res) {
  let body = '';
  req.on('data', (chunk) => (body += chunk));
  req.on('end', () => {
    setTimeout(() => {
      if (!db[id]) {
        res.statusCode = 404;
        return res.end('Not found');
      }
      const changes = JSON.parse(body);
      db[id] = { ...db[id], ...changes };
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(db[id]));
    }, PATCH_MS);
  });
}

const usersPlugin = {
  name: 'users-api',
  configureServer(server) {
    server.middlewares.use(usersApi);
  },
  configurePreviewServer(server) {
    server.middlewares.use(usersApi);
  },
};

export default defineConfig({
  plugins: [react(), usersPlugin],
});

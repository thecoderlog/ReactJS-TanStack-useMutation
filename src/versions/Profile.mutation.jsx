import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';

export default function Profile({ userId }) {
  const { data: user, isPending } = useQuery({
    queryKey: ['user', userId],
    queryFn: async ({ signal }) => {
      const res = await fetch(`/api/users/${userId}`, { signal });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    },
  });

  if (isPending) return <p className="card loading">Loading…</p>;

  return (
    <>
      <article className="card">
        <div className="avatar" style={{ background: user.color }}>
          {user.name[0]}
        </div>
        <div>
          <h2>{user.name}</h2>
          <p>{user.role} · {user.city}</p>
        </div>
      </article>
      <EditCity userId={userId} />
    </>
  );
}

function EditCity({ userId }) {
  const [city, setCity] = useState('');

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ city }) => {
      const res = await fetch(`/api/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ city }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    mutate({ city });
  }

  return (
    <form className="edit" onSubmit={handleSubmit}>
      <input
        aria-label="City"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button disabled={isPending}>
        {isPending ? 'Saving…' : 'Save'}
      </button>
    </form>
  );
}

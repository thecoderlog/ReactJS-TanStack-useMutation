import { useQuery } from '@tanstack/react-query';

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
    <article className="card">
      <div className="avatar" style={{ background: user.color }}>
        {user.name[0]}
      </div>
      <div>
        <h2>{user.name}</h2>
        <p>{user.role} · {user.city}</p>
      </div>
    </article>
  );
}

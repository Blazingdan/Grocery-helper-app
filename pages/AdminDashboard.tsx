// pages/AdminDashboard.tsx
import React, { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [helpers, setHelpers] = useState([]);

  useEffect(() => {
    // Simulate fetching users & helpers
    setUsers([
      { name: 'User One', email: 'user1@example.com' },
      { name: 'User Two', email: 'user2@example.com' },
    ]);

    setHelpers([
      { name: 'Helper A', rating: 4.9 },
      { name: 'Helper B', rating: 4.8 },
    ]);
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Registered Users</h2>
        {users.map(user => (
          <Card key={user.email} className="mb-2 p-4">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </Card>
        ))}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Helpers</h2>
        {helpers.map(helper => (
          <Card key={helper.name} className="mb-2 p-4">
            <p><strong>Name:</strong> {helper.name}</p>
            <p><strong>Rating:</strong> {helper.rating}</p>
            <Button variant="destructive">Remove</Button>
          </Card>
        ))}
      </section>
    </div>
  );
}

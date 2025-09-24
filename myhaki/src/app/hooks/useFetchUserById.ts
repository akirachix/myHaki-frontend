'use client';

import { useState, useEffect } from 'react';
import { User } from '../utils/type';
import { getAuthToken } from '../utils/authToken';


export default function useFetchUserById() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const token = getAuthToken();

    if (!storedUserId) {
      setError('User not logged in');
      setLoading(false);
      return;
    }

    if (!token) {
      setError('Authentication token not found');
      setLoading(false);
      return;
    }

    setUserId(storedUserId);
  }, []);

  useEffect(() => {
    if (!userId) return;

    async function fetchUser() {
      try {
        const token = getAuthToken();

        const response = await fetch(`/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }

        const data: User = await response.json();
        setUser(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [userId]);

  return { user, loading, error, setUser };
}






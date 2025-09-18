'use client';
import { useState, useEffect } from 'react';
import { fetchCases } from '../utils/fetchCases';
import { CaseItem } from '../utils/type';

const useFetchCases = () => {
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchCases();
        setCases(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { cases, loading, error };
};

export default useFetchCases;
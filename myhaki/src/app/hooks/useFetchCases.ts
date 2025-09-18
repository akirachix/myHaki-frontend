// src/hooks/useFetchCases.ts
'use client';
import { useEffect, useState } from 'react';

export interface Case {
  id: number;
  status: string;
  stage: string;
  updated_at: string;
  predicted_case_type?: string;
  // Add other fields as needed
}

const useFetchCases = () => {
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await fetch('/api/cases');
        if (!response.ok) {
          throw new Error('Failed to fetch cases');
        }
        const result: Case[] = await response.json();
        setCases(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, []);

  return { cases, loading, error };
};

export default useFetchCases;
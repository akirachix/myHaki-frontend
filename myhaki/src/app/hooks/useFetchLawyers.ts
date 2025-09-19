'use client';
import { useState, useEffect } from "react";
import { fetchLawyers } from "../utils/fetchLawyers";
import { Lawyer } from "../utils/type";



export function useFetchVerifiedLawyers() {
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await fetchLawyers();
        const verifiedLawyers = Array.isArray(data)
          ? data.filter((lawyer) => lawyer.verified === true)
          : [];
        setLawyers(verifiedLawyers);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return { lawyers, loading, error };
}

const useFetchLawyers = () => {
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchLawyers();
        setLawyers(data);
        setError(null);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { lawyers, loading, error };
};

export default useFetchLawyers;

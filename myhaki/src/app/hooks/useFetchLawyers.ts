'use client';
import { useState, useEffect } from "react";
import { fetchLawyers } from "../utils/fetchLawyers";
import { Lawyer } from "../utils/type";

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

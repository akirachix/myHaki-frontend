'use client'
import { useState, useEffect } from "react";
import { fetchCPDPoints } from "../utils/fetchCPDPoints";

interface cpdRecord {
  cpd_id: number;
  lawyer: number; 
  points_earned: number;
  total_points:number;
}

const useFetchCPDPoints = () => {
  const [cpdRecords, setcpdRecords] = useState<cpdRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchCPDPoints();
        const transactions = Array.isArray(data) ? data : data.results || [];
        setcpdRecords(transactions);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { cpdRecords, loading, error };
};

export default useFetchCPDPoints;
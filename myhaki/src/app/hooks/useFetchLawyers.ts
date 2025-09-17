'use client';
import { useState, useEffect } from "react";
import { fetchLawyers } from "../utils/fetchLawyers";


export interface Lawyer {
 id: number;
 first_name: string;
 last_name: string;
 email: string | null;
 role: string;
 phone_number: string | null;
 image: string | null;
 is_deleted: boolean;
 created_at: string;
 updated_at: string;
 profile_id: string;
 verified: boolean;
 practising_status: string;
 work_place: string;
 physical_address: string;
 cpd_points_2025: number;
 criminal_law: boolean;
 constitutional_law: boolean;
 corporate_law: boolean;
 family_law: boolean;
 pro_bono_legal_services: boolean;
 alternative_dispute_resolution: boolean;
 regional_and_international_law: boolean;
 mining_law: boolean;
}


export function useFetchLawyers() {
 const [lawyers, setLawyers] = useState<Lawyer[]>([]);
 const [loading, setLoading] = useState(true);


 useEffect(() => {
   async function load() {
     setLoading(true);
     const data = await fetchLawyers();
     setLawyers(data);
     setLoading(false);
   }
   load();
 }, []);


 return { lawyers, loading };
}




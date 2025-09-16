import { useState, useEffect } from "react";
import { fetchDetainees } from "../utils/fetchDetainees";

export interface Detainee {
    detainee_id: number;
    first_name: string;
    last_name: string;
    id_number: string;
    gender: string;
    date_of_birth: string;
    relation_to_applicant: string;
    created_at: string;
    updated_at: string;
    user: number | null;
}

const useFetchDetainees = () => {
    const [detainees, setDetainees] = useState<Detainee[]>([]);
    const [loading , setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const data = await fetchDetainees();
                setDetainees(data);

            }catch (error) {
                setError ((error as Error).message);

            } finally {
                setLoading(false);
            }

        })();
    }, []);
    return { detainees, loading, error };
}
export default useFetchDetainees;
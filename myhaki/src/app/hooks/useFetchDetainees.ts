import { useState, useEffect } from "react";
import { fetchDetainees } from "../utils/fetchDetainees";
import { Detainee } from "../utils/type";

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
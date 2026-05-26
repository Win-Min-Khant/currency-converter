import { useEffect, useMemo, useState } from "react"
import type { Rate } from "../types/rate";

export const useCurrencyRates = (baseCurrency : string) => {
    const [rates, setRates] = useState<Rate>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchAPI = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://v6.exchangerate-api.com/v6/03fc72a627452567095624b2/latest/${baseCurrency}`);
                const data = await response.json();
                setRates(data.conversion_rates);
            } catch (error) {
                console.log("Fetching error: " + error);
                setError("Fetching API Error.")
            } finally {
                setLoading(false);
            }
        }
        fetchAPI();
    }, [baseCurrency])

    const currencies = useMemo(() => Object.keys(rates), [rates]);

    return { rates, loading, error, currencies };
}
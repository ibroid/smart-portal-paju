import { useState, useEffect } from "react";
import axios, { AxiosResponse, Method } from "axios";
import { SERVER_URL } from "../conf.json";

const useHttpRequest = <T>(url: string, key?: string | undefined, timeout?: number) => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState<{ message: string, status: string } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let unmounted = false;
        let source = axios.CancelToken.source();

        if (key) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${key}`
        }

        axios.get(url, {
            cancelToken: source.token,
            timeout: timeout,
            baseURL: SERVER_URL,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }

        })
            .then(response => {
                if (!unmounted) {
                    setData(response.data);
                    setLoading(false);
                }
            }).catch(function (e) {
                if (!unmounted) {
                    setError(true);
                    setErrorMessage(e.response.data);
                    setLoading(false);
                    // if (axios.isCancel(e)) {
                    //     console.log(`request cancelled:${e.message}`);
                    // } else {
                    //     console.log("another error happened:" + e.message);
                    // }
                }
            });
        return function () {
            unmounted = true;
            source.cancel("Cancelling in cleanup");
        };
    }, [url, timeout]);

    return { data, loading, error, errorMessage };
};

export default useHttpRequest;
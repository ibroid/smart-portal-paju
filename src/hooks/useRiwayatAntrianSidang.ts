import xhttp from "../utility/Axios.Http.Antrian";
import { AxiosError } from "axios";
import { useCallback, useState } from "react";

export type RiwayatAntrianSidangResponseType = {
};

export default function useRiwayatAntrianSidang() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [data, setData] = useState<RiwayatAntrianSidangResponseType[]>([]);
  let abortController: AbortController;

  const startFetch = useCallback(async () => {
    abortController = new AbortController();
    setLoading(true);
    setError(false);
    setData([]);
    try {
      const fetchRequest = await xhttp.get<RiwayatAntrianSidangResponseType[]>('/api/detail_antrian_sidang', { signal: abortController.signal });
      setData(fetchRequest.data);
    } catch (error: any) {
      setError(true);
      if (error instanceof AxiosError) {
        setErrorMessage(error.response?.data ?? error.message);

      }
      setError(error.message);
    }
    setLoading(false);
  }, []);

  const cancelFetch = () => {
    if (abortController instanceof AbortController) {
      abortController.abort();
    }
  };

  return {
    loading,
    error,
    errorMessage,
    startFetch,
    cancelFetch,
    data
  };
}
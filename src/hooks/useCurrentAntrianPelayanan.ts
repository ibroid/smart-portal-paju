import xhttp from "../utility/Axios.Http.Antrian";
import { AxiosError } from "axios";
import { useCallback, useState } from "react";

export type CurrentAntrianPelayananResponseType = {
  created_at: string
  durasi_pelayanan: any
  id: number
  identitas_pihak_id: any
  kode: string
  nomor_urutan: number
  pengunjung_id: any
  petugas_id: any
  status: number
  tujuan: string
  updated_at: string
};

export default function useAntrianPelayanan() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [data, setData] = useState<CurrentAntrianPelayananResponseType[]>();
  let abortController: AbortController;

  const startFetch = useCallback(async () => {
    abortController = new AbortController();
    setLoading(true);
    setError(false);
    setData([])
    try {
      const fetchRequest = await xhttp.get<CurrentAntrianPelayananResponseType[]>('/api/antrian_pelayanan', { signal: abortController.signal });

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
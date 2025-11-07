import { AxiosError } from "axios";
import xhttp from "../utility/Axios.Http.Antrian";
import { useCallback, useState } from "react";

export type CurrentAntrianSidangResponseType = {
  created_at: string
  id: number
  nomor_antrian_id: number
  nomor_ruang: number
  tanggal_panggil: string
  updated_at: string,
  antrian_persidangan: PerkaraAntrianSidang,
  kehadiran_pihak: any[]
};

export type PerkaraAntrianSidang = {
  created_at: string
  id: number
  jadwal_sidang_id: number
  majelis_hakim: string
  nama_ruang: string
  nomor_perkara: string
  nomor_ruang: number
  nomor_urutan: number
  priority: any
  status: number
  tanggal_sidang: string
  updated_at: string
  waktu_panggil: string
}

export default function useCurrentAntrianSidang() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [data, setData] = useState<CurrentAntrianSidangResponseType[]>();
  let abortController: AbortController;

  const startFetch = useCallback(async () => {
    abortController = new AbortController();
    setLoading(true);
    setError(false);
    setData([])
    try {
      const fetchRequest = await xhttp.get<CurrentAntrianSidangResponseType[]>('/api/dalam_persidangan', { signal: abortController.signal });

      setData(fetchRequest.data);
    } catch (error: any) {
      setError(true);
      if (error instanceof AxiosError) {
        setErrorMessage(error.response?.data.message ?? error.response?.data);
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
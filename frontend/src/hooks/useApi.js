import { useState, useCallback } from "react";
import axios from "axios";

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const callApi = useCallback(async (apiCall, onSuccess) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiCall();
      if (onSuccess) {
        onSuccess(response.data);
      }
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, callApi };
};

export default useApi;

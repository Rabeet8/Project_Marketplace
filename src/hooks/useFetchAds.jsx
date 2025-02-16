import { useEffect, useState } from "react";
import { BASE_URL } from "@/app/environment";

const useFetchAds = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/ads`, {
          method: 'GET',
        });
        const result = await response.json();
        console.log(result); // Console the result for now
        setData(result);
      } catch (error) {
        setError(error);
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useFetchAds;
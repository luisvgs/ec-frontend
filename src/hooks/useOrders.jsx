import { useState, useEffect } from "react";
import { fetchAllOrders } from "../services/api";

const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchAllOrders();
        setOrders(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  return { orders, loading, error };
};

export default useOrders;

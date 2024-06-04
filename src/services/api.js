import axios from "axios";

export const fetchAllProducts = async () => {
  const response = await axios.get(
    import.meta.env.VITE_PRODUCT_URL + "/product/all"
  );
  return response.data;
};

export const fetchProductById = async (id) => {
  const response = await axios.get(
    `${import.meta.env.VITE_PRODUCT_URL}/product/id/?id=${id}`
  );
  return response.data;
};

export const fetchAllOrders = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_ORDER_URL}/order/all`
  );
  return response.data;
};

export const fetchOrderById = async (id) => {
  const response = await axios.get(
    `${import.meta.env.VITE_ORDER_URL}/order/withId/${id}`
  );
  return response.data;
};

export const createOrder = async (product) => {
  console.log("proddd ", product);
  return await axios.post(
    `${import.meta.env.VITE_ORDER_URL}/order/create`,
    product
  );
};

export const fetchProductsByCategory = async (category) => {
  const response = await fetch(`/by-category?category=${category}`);
  return response.json();
};

import axios from "axios";

export const fetchAllProducts = async () => {
  const response = await axios.get("http://www.localhost:3000/product/all");
  return response.data;
};

export const fetchProductById = async (id) => {
  const response = await axios.get(
    `http://www.localhost:3000/product/id/?id=${id}`
  );
  return response.data;
};

export const fetchAllOrders = async () => {
  const response = await axios.get("http://localhost:8080/order/all");
  return response.data;
};

export const fetchOrderById = async (id) => {
  const response = await axios.get(
    `http://www.localhost:8080/order/withId/${id}`
  );
  return response.data;
};

export const createOrder = async (product) => {
  console.log("proddd ", product);
  return await axios.post("http://localhost:8080/order/create", product);
};

export const fetchProductsByCategory = async (category) => {
  const response = await fetch(`/by-category?category=${category}`);
  return response.json();
};

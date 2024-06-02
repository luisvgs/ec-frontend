import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardBody,
  Divider,
  CardFooter,
  Heading,
  Text,
  Image,
  Spinner,
  Center,
  Stack,
  Tag,
  Button,
  useToast,
} from "@chakra-ui/react";
import { fetchProductById } from "../services/api";
import ProductQuantity from "../domains/product/ProductQuantity";
import useCartStore from "../store/store";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleAddToCart = (quantity) => {
    addToCart(product, quantity);
    toast({
      title: "Your shopping cart has been updated!",
      description: `${quantity} ${product.name} were added to your cart.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  if (loading) {
    return (
      <Center mt={10}>
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center mt={10}>
        <Text color="red.500">Failed to load product: {error.message}</Text>
      </Center>
    );
  }

  return (
    <Box p={5}>
      <Card maxW="sm">
        <CardBody>
          <Image
            src={`https://picsum.photos/1400/900?random=${product.id}`}
            borderRadius="lg"
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">{product.name}</Heading>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat
            </Text>
            <Text color="blue.600" fontSize="2xl">
              ${product.price}
            </Text>
            <Tag variant="subtle" colorScheme="cyan" size="mg" padding="3">
              {product.category}
            </Tag>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ProductQuantity
            onAddToCart={(quantity) => handleAddToCart(quantity)}
          />
        </CardFooter>
      </Card>
    </Box>
  );
};

export default ProductDetail;

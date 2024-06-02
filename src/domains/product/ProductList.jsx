import useProducts from "../../hooks/useProducts";
import {
  Box,
  Heading,
  Center,
  Spinner,
  Tag,
  SimpleGrid,
  Text,
  Card,
  CardBody,
  Stack,
  Divider,
  CardFooter,
  Image,
  useToast,
} from "@chakra-ui/react";
import ProductQuantity from "./ProductQuantity";
import { useHistory } from "react-router-dom";
import useCartStore from "../../store/store";

const ProductList = () => {
  const { products, loading, error } = useProducts();
  const history = useHistory();
  const toast = useToast();
  const addToCart = useCartStore((state) => state.addToCart);

  if (loading) {
    return (
      <Center mt={10}>
        <Spinner size="xl" />
      </Center>
    );
  }

  const handleClick = (id) => {
    history.push(`/product/${id}`);
  };

  const handleAddToCart = (product, quantity) => {
    addToCart(product, quantity);

    toast({
      title: "Your shopping cart has been updated!",
      description: `${quantity} ${product.name} were added to your cart.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box p={5}>
      <Heading as="h2" mb={5}>
        Product List
      </Heading>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={5}>
        {products.map((product) => (
          <Card maxW="sm">
            <CardBody onClick={() => handleClick(product.id)}>
              <Image
                src={`https://picsum.photos/1400/900?random=${product.id}`}
                borderRadius="lg"
              />
              <Stack mt="6" spacing="3">
                <Heading size="md">{product.name}</Heading>
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat
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
                onAddToCart={(quantity) => handleAddToCart(product, quantity)}
              />
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ProductList;

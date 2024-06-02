import { useHistory } from "react-router-dom";
import { createOrder } from "../../services/api";
import useCartStore from "../../store/store";
import {
  Box,
  Button,
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

const Cart = () => {
  const products = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const toast = useToast();
  const history = useHistory();

  if (products.length == 0) {
    return (
      <Heading as="h2" mb={5} mt={10}>
        Your cart is empty
      </Heading>
    );
  }

  const handleOrder = async () => {
    const order = products.map(({ id, quantity }) => ({
      productId: id,
      quantity,
    }));

    console.log("order: ", order);
    toast({
      title: "Loading",
      description: "Processing your order in our servers...",
      status: "info",
      duration: null,
      isClosable: false,
    });

    await createOrder(order).then(() => {
      toast.closeAll();
      toast({
        title: "Nice!",
        description: "Your order has been created!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      clearCart();
      history.push("/product/all");
    });
  };

  const totalPaid = products.reduce((total, item) => {
    return total + item.quantity * item.price;
  }, 0);
  return (
    <Box p={5} spacing={3}>
      <Heading as="h2" mb={5}>
        My cart
      </Heading>
      <Text color="purple" fontSize="2xl" align="left" m="auto" padding={3}>
        Total: ${totalPaid}
      </Text>
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
                <Text fontSize="sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
              <Text>Quantity: {product.quantity}</Text>
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>
      <Center>
        <Button onClick={handleOrder}>Buy</Button>
      </Center>
    </Box>
  );
};

export default Cart;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchOrderById } from "../../services/api";
import {
  useToast,
  Center,
  Spinner,
  Stack,
  Heading,
  Tag,
  Image,
  Text,
  SimpleGrid,
  Divider,
  Card,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const data = await fetchOrderById(id);
        setOrder(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [id]);

  if (loading) {
    return (
      <Center mt={10}>
        <Spinner size="xl" />
      </Center>
    );
  }

  console.log("orden : ", order);
  if (error) {
    return (
      <Center mt={10}>
        <Text color="red.500">Failed to load your order!: {error.message}</Text>
      </Center>
    );
  }
  const totalPaid = order.reduce((total, item) => {
    return total + item.quantity * item.price;
  }, 0);
  return (
    <>
      <Text
        color="purple"
        fontSize="2xl"
        align="left"
        m="auto"
        padding={3}
        as="b"
      >
        Total: ${totalPaid}
      </Text>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }}>
        {order.map((product) => (
          <Card maxW="40%">
            <CardBody onClick={() => handleClick(product.id)}>
              <Image
                src={`https://picsum.photos/1400/900?random=${product.id}`}
                borderRadius="lg"
              />
              <Stack mt="6" spacing="1">
                <Heading size="md">{product.name}</Heading>
                <Text color="blue.600" fontSize="sm">
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
    </>
  );
};

export default OrderDetail;

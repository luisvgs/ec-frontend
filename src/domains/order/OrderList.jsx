import useOrders from "../../hooks/useOrders";
import {
  Box,
  Heading,
  Link,
  Center,
  Spinner,
  Tag,
  SimpleGrid,
  Text,
  Card,
  CardBody,
  CardHeader,
  StackDivider,
  Stack,
  Divider,
  CardFooter,
  Image,
  useToast,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import useCartStore from "../../store/store";

const OrderList = () => {
  const { orders, loading, error } = useOrders();
  const history = useHistory();
  const toast = useToast();

  console.log(orders);
  const prune = orders.map((item) => item.order_id);
  const order_ids = [...new Set(prune)];

  console.log(order_ids);
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

  return (
    <Center mt={10}>
      <Box maxW="lg">
        <Card size="sm" variant="elevated" colorScheme="purple">
          <CardHeader>
            <Heading size="sm">Keep track of your orders here: </Heading>
          </CardHeader>
          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              <Box>
                {order_ids.map((order) => (
                  <>
                    <Text pt="2" fontSize="sm" align="left" padding={2}>
                      Order{" "}
                      <Link color="teal.500" href={`/order/${order}`}>
                        {" "}
                        #{order}
                      </Link>
                    </Text>
                    <Divider orientation="horizontal" />
                  </>
                ))}
              </Box>
            </Stack>
          </CardBody>
        </Card>
      </Box>
    </Center>
  );
};

export default OrderList;

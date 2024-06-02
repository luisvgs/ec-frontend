import React from "react";
import {
  Box,
  Flex,
  Heading,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  IconButton,
  Link,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";

const Header = () => {
  return (
    <Box bg="tomato" color="white" p={2}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Heading
          as="h1"
          size="lg"
          color="white"
          as={RouterLink}
          to="/product/all"
        >
          Ecommerce shop
        </Heading>
        <Spacer />
        <Flex alignItems="center">
          <Link as={RouterLink} to="/product/all" color="white" mr={4}>
            Home
          </Link>
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              bg="#38A169"
              _hover={{ bg: "purple" }}
              color="cyan"
            >
              Account
            </MenuButton>
            <MenuList>
              <MenuItem
                as={RouterLink}
                to="/product/all"
                bg="white"
                color="black"
                _hover={{}}
              >
                All Products
              </MenuItem>
              <MenuItem
                as={RouterLink}
                to="/my-orders"
                bg="white"
                color="black"
              >
                My Orders
              </MenuItem>
              <MenuItem as={RouterLink} to="/my-cart" bg="white" color="black">
                My Cart
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;

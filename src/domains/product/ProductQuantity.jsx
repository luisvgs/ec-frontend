import React, { useState } from "react";
import { HStack, Button, Input } from "@chakra-ui/react";

const ProductQuantity = ({ onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <HStack spacing="4">
      <Button onClick={decrementQuantity} disabled={quantity <= 1}>
        -
      </Button>
      <Input
        value={quantity}
        onChange={handleQuantityChange}
        type="number"
        width="60px"
        textAlign="center"
      />
      <Button onClick={incrementQuantity}>+</Button>
      <Button colorScheme="blue" onClick={() => onAddToCart(quantity)}>
        Add to cart
      </Button>
    </HStack>
  );
};

export default ProductQuantity;

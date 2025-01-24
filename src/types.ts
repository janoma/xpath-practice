export type Product = {
  disabled?: boolean;
  id: number;
  name: string;
  price: number;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

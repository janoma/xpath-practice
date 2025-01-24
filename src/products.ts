import { Product } from "./types";

export const products = [
  {
    id: 253,
    name: "Computer",
    price: 499.99,
  },
  {
    id: 726,
    name: "Mouse",
    price: 14.99,
  },
  {
    id: 1550,
    name: "5K Monitor",
    price: 1299.99,
  },
  {
    disabled: true,
    id: 6623,
    name: "Mouse pad",
    price: 9.99,
  },
  {
    id: 1234,
    name: "Keyboard",
    price: 19.99,
  },
  {
    disabled: true,
    id: 7283,
    name: "On-Ear Headphones",
    price: 99.99,
  },
  {
    disabled: true,
    id: 12654,
    name: "In-Ear Headphones",
    price: 129.49,
  },
  {
    id: 27639,
    name: "Gaming Laptop",
    price: 2250.0,
  },
] satisfies Product[];

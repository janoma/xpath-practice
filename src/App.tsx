import { useEffect, useState } from "react";
import { CartItem, Product } from "./types";
import { products } from "./products";

function App() {
  const [xpath, setXpath] = useState("");

  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart((cart) => {
      const existingItem = cart.find((item) => item.product.id === product.id);
      if (existingItem) {
        return cart
          .map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
          .toSorted(
            (a, b) =>
              b.quantity - a.quantity ||
              b.product.price * b.quantity - a.product.price * a.quantity
          );
      }

      return [...cart, { product, quantity: 1 }];
    });
  };

  useEffect(() => {
    const classes = ["outline-8", "outline-orange-600"];

    try {
      const element = document.evaluate(
        xpath,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE
      ).singleNodeValue;
      if (element instanceof Element) {
        element.classList.add(...classes);

        return () => {
          element.classList.remove(...classes);
        };
      }
    } catch (error) {
      void error; // ignore
    }
  }, [xpath]);

  return (
    <div className="mx-auto w-[calc(1000px+8rem)] p-8">
      <div className="flex gap-8 justify-center mb-8">
        <input
          className="border p-2 rounded w-1/2 font-mono text-gray-700 text-xl"
          placeholder="XPath"
          onChange={(e) => setXpath(e.target.value)}
        />
        <button
          className="border p-2 rounded text-gray-700 border-gray-500 bg-gray-100 cursor-pointer"
          onClick={() => setCart([])}
        >
          Empty cart
        </button>
      </div>
      <div className="flex gap-16">
        <div>
          <h1 className="text-3xl font-bold mb-8">Products</h1>
          <table className="table-auto w-[500px]" id="products">
            <thead>
              <tr className="text-white bg-blue-900 text-xl font-light *:p-2 *:text-left">
                <th className="text-center! w-20">ID</th>
                <th>Name</th>
                <th>Price</th>
                <th className="w-36 text-center!">Cart</th>
              </tr>
            </thead>
            <tbody className="*:*:p-2 *:hover:bg-gray-100 *:has-disabled:text-gray-400">
              {products.map((product) => (
                <tr aria-label="product" key={product.id}>
                  <td className="text-center">{product.id}</td>
                  <td>{product.name}</td>
                  <td
                    aria-description="Product price"
                    aria-label={product.price.toString()}
                  >
                    {Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(product.price)}
                  </td>
                  <td className="text-center">
                    <button
                      className="border p-2 rounded text-gray-700 border-gray-500 bg-gray-100 cursor-pointer disabled:opacity-25 disabled:cursor-not-allowed"
                      disabled={!!product.disabled}
                      onClick={() => addToCart(product)}
                    >
                      Add to cart
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-8">Cart</h1>
          <table className="table-auto w-[500px]" id="cart">
            <thead>
              <tr className="text-white bg-blue-900 text-xl font-light *:p-2 *:text-left">
                <th>Name</th>
                <th className="text-center w-12">Qty</th>
                <th>Price</th>
                <th className="w-24 text-right!">Total</th>
              </tr>
            </thead>
            <tbody className="*:*:p-2 *:hover:bg-gray-100">
              {cart.map((item) => (
                <tr key={item.product.id}>
                  <td>{item.product.name}</td>
                  <td className="text-center">{item.quantity}</td>
                  <td>
                    {Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(item.product.price)}
                  </td>
                  <td className="text-right">
                    {Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(item.quantity * item.product.price)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="text-xl font-bold *:p-2 bg-blue-100">
                <td>Total</td>
                <td colSpan={3} className="text-right">
                  {Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(
                    cart.reduce(
                      (total, item) =>
                        total + item.quantity * item.product.price,
                      0
                    )
                  )}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;

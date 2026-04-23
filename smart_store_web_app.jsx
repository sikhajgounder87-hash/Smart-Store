import React, { useState } from "react";

const productsData = [
  { id: 1, name: "Smartphone", price: 699, category: "Phones", image: "https://via.placeholder.com/150" },
  { id: 2, name: "Laptop", price: 999, category: "Computers", image: "https://via.placeholder.com/150" },
  { id: 3, name: "Headphones", price: 199, category: "Audio", image: "https://via.placeholder.com/150" },
  { id: 4, name: "Smartwatch", price: 249, category: "Wearables", image: "https://via.placeholder.com/150" }
];

export default function SmartStore() {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [checkout, setCheckout] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const filteredProducts = productsData.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (checkout) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        <p className="mb-4">Total: ${totalPrice}</p>

        <h2 className="font-semibold mb-2">Select Payment Method:</h2>
        <div className="flex flex-col gap-2 mb-4">
          <label>
            <input type="radio" name="payment" value="Mpaisa" onChange={(e) => setPaymentMethod(e.target.value)} /> Mpaisa
          </label>
          <label>
            <input type="radio" name="payment" value="Bank Transfer" onChange={(e) => setPaymentMethod(e.target.value)} /> Bank Transfer
          </label>
        </div>

        {paymentMethod === "Mpaisa" && (
          <div className="border p-4 rounded mb-4">
            <p>Send payment to Mpaisa Number:</p>
            <strong>+123 456 7890</strong>
          </div>
        )}

        {paymentMethod === "Bank Transfer" && (
          <div className="border p-4 rounded mb-4">
            <p>Bank Details:</p>
            <p>Bank: Smart Bank</p>
            <p>Account Name: Smart Store</p>
            <p>Account No: 123456789</p>
          </div>
        )}

        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => alert("Order placed successfully!")}
        >
          Confirm Payment
        </button>
      </div>
    );
  }

  if (selectedProduct) {
    return (
      <div className="p-6">
        <button onClick={() => setSelectedProduct(null)} className="mb-4 text-blue-500">← Back</button>
        <div className="flex gap-6">
          <img src={selectedProduct.image} alt={selectedProduct.name} />
          <div>
            <h1 className="text-2xl font-bold">{selectedProduct.name}</h1>
            <p className="text-gray-600">${selectedProduct.price}</p>
            <p className="mt-2">Category: {selectedProduct.category}</p>
            <button
              onClick={() => addToCart(selectedProduct)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Smart Store</h1>
        <div className="flex gap-4 items-center">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-1 rounded"
          />
          <div className="font-semibold">Cart: {cart.length}</div>
          <button
            onClick={() => setCheckout(true)}
            className="bg-green-500 text-white px-3 py-1 rounded"
          >
            Checkout
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="border p-4 rounded-2xl shadow hover:shadow-lg transition">
            <img src={product.image} alt={product.name} className="mb-4 cursor-pointer" onClick={() => setSelectedProduct(product)} />
            <h2 className="text-lg font-semibold cursor-pointer" onClick={() => setSelectedProduct(product)}>{product.name}</h2>
            <p className="text-gray-600">${product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className="mt-3 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
const EventEmitter = require("events");

let products = [
  { id: 1, name: "laptop", price: 70000, qty: 10 },
  { id: 2, name: "smart-phone", price: 34000, qty: 5 },
  { id: 3, name: "head-phones", price: 3000, qty: 7 },
  { id: 4, name: "charger", price: 2000, qty: 8 },
];

function placeOrder(userId, productId, qty) {
  const orderEmitter = new EventEmitter();

  orderEmitter.on("success", (user, product, qty) => {
    console.log(`order placed by ${user} for ${qty} ${product.name}`);
    console.log(`remaining qty of ${product.name} is ${product.qty}`);
  });

  orderEmitter.on("partialOrder", (user, product, orderedQty, availableQty) => {
    console.log(`only ${availableQty} ${product.name} available for ${user}. ordered quantity was ${orderedQty}`);
    console.log(`remaining qty of ${product.name} is ${product.qty}`);
  });

  orderEmitter.on("outOfStock", (product) => {
    console.log(`${product.name} is out of stock`);
  });

  orderEmitter.on("notFound", (productId) => {
    console.log(`Product with id ${productId} not found`);
  });

  const findProduct = products.find((p) => p.id === productId);

  if (!findProduct) {
    orderEmitter.emit("notFound", productId);
    return;
  }
  if (findProduct.qty === 0) {
    orderEmitter.emit("outOfStock", findProduct);
    return;
  }
  else if (qty > findProduct.qty) {
    const availableQty = findProduct.qty;
    findProduct.qty = 0;
    orderEmitter.emit("partialOrder", userId, findProduct, qty, availableQty);
    return;
  } 
  else {
    findProduct.qty -= qty;
    orderEmitter.emit("success", userId, findProduct, qty);
    return;
  }
}

placeOrder("Harsh", 1, 9);
placeOrder("Ayush", 2, 6);
placeOrder("raman", 2, 6);
placeOrder("Manish", 3, 1);
placeOrder("Aman", 10, 1);
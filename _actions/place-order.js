export default async function placeOrderAction(cart, address, id, total) {
  try {
    const order = await fetch("/api/place-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cart,
        address,
        id,
        total,
      }),
    });
    const data = await order.json();

    return {
      success: true,
      orderId: data.orderId,
    };
  } catch (error) {
    return false;
  }
}

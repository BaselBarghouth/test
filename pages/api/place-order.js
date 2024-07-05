// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Process a POST request
    // create order items we need, product id, quantity and prices id, qty
    // create order, order items, status, user id, total, address id
    const { cart, address, id: user, total } = req.body;
    const orderItemsPromises = cart.map(async (item) => {
      const { id, quantity, sizes } = item;
      const orderItemResponse = await doRequest(
        "order-items",
        "POST",
        {
          product: id,
          quantity_and_price: sizes.id,
          qty: quantity,
        }
      );
      return orderItemResponse.data.id;
    });

    //Wait for all promises to resolve
    const orderItemsIds = await Promise.all(orderItemsPromises);

    const orderResponse = await doRequest("orders", "POST", {
      user,
      address: address,
      order_items: orderItemsIds,
      total,
    });
    res.status(200).json({ orderId: orderResponse.data.id });
  }

  res.status(200).json({ name: "John Doe" });
}

const doRequest = async (url, method, data) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_ORDER_TOKEN}`,
  };
  try {
    let options = {
      method,
      headers,
    };
    if (data) {
      options = {
        ...options,
        body: JSON.stringify({
          data,
        }),
      };
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/${url}`,
      options
    );

    // Check if the response is ok (status in the range 200-299)
    if (res.ok) {
      const json = await res.json();
      return json;
    }
  } catch (error) {
    console.error("Error making request:", error);
    return null; // Or throw an error or handle as needed
  }
};

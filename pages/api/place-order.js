// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { cart, address, id: user, total } = req.body;
      
      const orderItemsPromises = cart.map(async (item) => {
        const { id, quantity, sizes } = item;
        const orderItem = await doRequest("order-items", "POST", {
          data: {
            product: id,
            quantity_and_price: sizes.id,
            qty: quantity,
          },
        });
        return orderItem.id;
      });

      // Wait for all promises to resolve
      const orderItemsIds = await Promise.all(orderItemsPromises);
      const orderResponse = await doRequest("orders", "POST", {
        data: { user, address, order_items: orderItemsIds, total},
      });
      if (orderResponse) {
        res.status(200).json({ success: true, orderId: orderResponse.id });
      } else {
        res.status(500).json({ success: false, error: "Failed to create order" });
      }
    } catch (error) {
      console.error("Error processing request:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  } 
  
  else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
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
      body: JSON.stringify(data), // Changed `data` to `body`
    };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/${url}`,
      options
    );
    // Check if the response is ok (status in the range 200-299)
    if (res.ok) {
      const json = await res.json();
      return json.data;
    } else {
      console.error(`Error: ${res.status} ${res.statusText}`);
      return null;
    }
  } catch (error) {
    console.error("Error making request:", error);
    return null; // Or throw an error or handle as needed
  }
};

export default async function handler(req, res) {

  const id = req.query.id;
  const order = await doRequest(`orders/${id}?populate=*`, "GET");
  const order_items = order.data.attributes.order_items;

  const orderItemsPromises = order_items.data.map(async (item) => {
    const { id } = item;
    const orderItem = await doRequest(`order-items/${id}?populate=*`, "GET");
    return orderItem.data;
  });

  const orderItems = await Promise.all(orderItemsPromises);
  res.status(200).json({ orderItems, order });
}

const doRequest = async (url, method) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_ORDER_TOKEN}`,
  };
  try {
    let options = {
      method,
      headers,
    };
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

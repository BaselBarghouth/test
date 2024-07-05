export const hitToProduct = (hit) => {
  const { id, name, image, color, length, diameter, grower,quantity_and_prices,country ,weight,image_2} = hit;
  let sizes = quantity_and_prices.map((q) => {
    return {
      qty: q.qty,
      price: q.price,
      inStock: true,
      id: q.id,
    };
  });
  const product = {
    id: id,
    name: name,
    imageSrc: `${process.env.NEXT_PUBLIC_STRAPI_URL}${image[0].url}`,
    imageAlt: "Image of " + name,
    availableColors: [color],
    characteristics: {
      height: length,
      diameter,
    },
    grower,
    quantity: 1,
    sizes,
    country,
    weight
  }

    return product;
};

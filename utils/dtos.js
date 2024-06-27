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
  
  // const imageSrc = image_2;
  return {
    id: id,
    name: name,
    imageSrc: image_2,
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
  };
};

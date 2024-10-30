export const formatPriceNumber = (price?: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'USD',
  }).format(price ?? 0);
};

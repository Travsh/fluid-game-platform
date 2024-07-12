export const formatPrice = (price, currency) => {
    const formatter = new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  
    return `${currency} ${formatter.format(price)}`;
  };
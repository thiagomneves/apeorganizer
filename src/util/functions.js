import i18n from 'i18n-js';

export const formatCurrency = (number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(number);
};

export const calcColorText = (color, contrast = false) => {
  const hex = color.substr(1,6)
  const r = parseInt(hex.substr(0,2), 16);
  const g = parseInt(hex.substr(2,2), 16);
  const b = parseInt(hex.substr(4,2), 16);

  const cardWeight = (r*.95)+(g*1.2)+(b*.85);
  const lightWeight = 136*3;

  const textDark = '#555555';
  const textLight = '#cccccc';

  if (contrast) {
    return  (cardWeight >= lightWeight) ? '#000000' : '#ffffff';
  }
  return (cardWeight >= lightWeight) ? textDark : textLight;
}

export function capitalize(string) {
  const newString = string.charAt(0).toUpperCase() + string.slice(1);
  return newString
}

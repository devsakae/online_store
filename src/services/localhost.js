export const saveLocal = (item) => {
  const oquevaisersalvo = JSON.stringify(item);
  localStorage.setItem('myCart', oquevaisersalvo);
};

export const getLocal = () => {
  const oquevaiserpego = localStorage.getItem('myCart');
  return JSON.parse(oquevaiserpego);
};

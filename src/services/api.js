export async function getCategories() {
  // Implemente aqui
  const url = 'https://api.mercadolibre.com/sites/MLB/categories';
  const response = await fetch(url);
  const objJason = await response.json();
  return objJason;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  const response = await fetch(url);
  const objJason = await response.json();
  return objJason;
}

export async function getProductById(categoryId) {
  const url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
  const response = await fetch(url);
  const objJason = await response.json();
  return objJason;
}

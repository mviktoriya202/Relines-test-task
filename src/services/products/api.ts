import { MockProductPageGateway } from '../../gateways/product-page';

const api = new MockProductPageGateway();

export async function getProduct(productId: string) {
  const data = await api.getProduct(productId);
  return data;
}

export async function getLinkedProducts(productId: string) {
  const data = await api.getLinkedProducts(productId);
  return data;
}

export async function getCategories() {
  const data = await api.getCategories();
  return data;
}

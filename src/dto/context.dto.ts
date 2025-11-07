export enum TopicContextList {
  ORDER = "order-db",
  CHECKOUT = "checkout-db",
}
export class ProductServiceContext {
  id: number;
  sku: string;
  name: string;
}

export class StoresServiceContext {
  id: number;

  name: string;

  address: string;

  latitude: number;

  longitude: number;

  phone: string;
}

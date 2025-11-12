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

export enum OrderStatus {
  PROCESSING = "processing",
  REFUNDED = "refunded",
}

export class CartServiceC2OrderContext {
  id: number;

  cartId: number;

  amount: number;

  total: number;

  deliveryTime: string;

  customerName: string;

  shippingAddress: {
    zip: string;
    city: string;
    state: string;
    country: string;
    street_address: string;
  };

  storeId: number;

  store: number;

  items: {
    productId: number;
    productName: string;
    qty: number;
    price: number;
  }[];

  status: OrderStatus;

  createdAt: Date;

  updatedAt: Date;
}

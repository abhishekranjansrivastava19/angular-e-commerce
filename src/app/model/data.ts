export interface SignUp {
  name: string,
  phone: string,
  email: string,
  password: string,
}

export class User {


  id?: string;
  name?: string;
 static password: string;
 static email: string;
  phone?: string;
  token?: string;
static token: string;
}

export class Product {
  _id?: string;
  name?: string;
  description?: string;
  features?: string;
  price?: string;
  usageGuide?: string;
  careGuide?: string;
  image?: string;
  images?: string;
  size?: string;
  set?: number;
  counInStock?: number;
  quantity?:number;
}

export interface product {
  _id: string;
  name: string;
  description: string;
  features: string;
  price: string;
  usageGuide: string;
  careGuide: string;
  image: string;
  images: string;
  size: string;
  set: number;
  counInStock: number;
  quantity: undefined | number;
}

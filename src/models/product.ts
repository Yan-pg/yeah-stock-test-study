import { ProductStatus } from "../enums/status";

export interface Product {
  id: string;
  title: string;
  quantity: number;
  measure: string;
  salePrice: number;
  purchasePrice: number;
  currency: string;
  supplier: string;
  status: ProductStatus;
  description: string;
  createdAt: Date;
}

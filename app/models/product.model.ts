export interface Product {
  id?: string;
  name: string;
  code: string;
  description?: string;
  status: "available" | "out_of_stock" | "reserved";
  imagePath?: string;
  createdAt?: string;
  updatedAt?: string;
}

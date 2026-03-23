export interface Product {
  id: number;
  sku: string;
  name: string;
  qty: number;
  desc: string;
  parent_product_id?: number | null;
}

export default Product;

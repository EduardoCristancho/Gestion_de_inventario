
type productstatus = "general" | "disponible" | "pendiente" | "agotado";

// Define product interface
export default interface Product {
    product_id: number;
    parent_product_id: number | null;
    sku: string;
    quantity: number;
    description: string;
    name: string;
    status: productstatus | null;
    cost: number;
    price: number;
    url: string;
    company: string;
    supplier: string;
  }
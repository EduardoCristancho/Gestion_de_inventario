import Product from "@/types/interface/product";

export interface ProductModalProps {
  selectedProduct: Product;
  setSelectedProduct: (product: Product | null) => void;
  allSelectedProduct: Product[];
}
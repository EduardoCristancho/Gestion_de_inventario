"use client";
import { ProductsProvider, useProducts } from "./productContext";
import Ventas from "./Ventas";
function Salespage() {
    return (
        <ProductsProvider>
            <Ventas />
        </ProductsProvider>
    );
}
export default Salespage;
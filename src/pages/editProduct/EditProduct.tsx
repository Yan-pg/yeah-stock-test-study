import { useParams } from "react-router-dom";
import { CreateOrEditProduct } from "../../components/CreateOrEditProduct";
import { Product } from "../../models/product";
import { useEffect, useState } from "react";
import axios from "axios";
import { parseCookies } from "nookies";

export function EditProduct() {
  const [product, setProduct] = useState<Product>({} as Product);
  const { id } = useParams();

  useEffect(() => {
    getProduct();
  }, []);

  async function getProduct() {
    try {
      const { data: product } = await axios.get(
        `${import.meta.env.VITE_API_HOST}/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${parseCookies(null).token}`,
          },
        }
      );
      setProduct(product);
    } catch {
      alert("Erro when change status, tray again.");
    }
  }

  return <CreateOrEditProduct product={product} />;
}

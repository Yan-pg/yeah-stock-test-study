/* eslint-disable @typescript-eslint/no-explicit-any */
import { Trash } from "@phosphor-icons/react";
import { Button } from "../Button";
import { Input } from "../../components/Input";
import { Textarea } from "../../components/Textarea";
import { useEffect, useState } from "react";
import axios from "axios";
import { validateFields } from "../../ultils/validateFields";
import { useNavigate } from "react-router-dom";
import { Product } from "../../models/product";
import { parseCookies } from "nookies";

interface CreateOrEditProductProps {
  product?: Product;
}

export function CreateOrEditProduct({ product }: CreateOrEditProductProps) {
  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [measure, setMeasure] = useState("");
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [salePrice, setSalePrice] = useState(0);
  const [currency, setCurrency] = useState("");
  const [supplier, setSupplier] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<any[]>([]);
  const navigate = useNavigate();

  const isEdit = !!product?.id;

  useEffect(() => {
    if (product?.id) {
      setTitle(product.title);
      setQuantity(product.quantity);
      setMeasure(product.measure);
      setPurchasePrice(product.purchasePrice);
      setSalePrice(product.salePrice);
      setCurrency(product.currency);
      setSupplier(product.supplier);
      setDescription(product.description);
    }
  }, [product]);

  async function createProduct() {
    try {
      const product = {
        name: title,
        quantity,
        measure,
        purchasePrice,
        salePrice,
        currency,
        supplier,
        description,
        id: crypto.randomUUID(),
        createdAt: new Date(),
      };
      const validate = validateFields(product);

      if (validate.length) {
        setErrors(validate);
        return;
      }

      await axios.post(`${import.meta.env.VITE_API_HOST}/products`, product, {
        headers: {
          Authorization: `Bearer ${parseCookies(null).token}`,
        },
      });

      alert("Product created successfully.");
      navigate("/");
    } catch (error) {
      alert("Error when creating product.");
    }
  }

  async function handleDeleteProduct() {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_HOST}/products/${product?.id}`,
        {
          headers: {
            Authorization: `Bearer ${parseCookies(null).token}`,
          },
        }
      );

      navigate("/");
    } catch {
      alert("Erro when change status, tray again.");
    }
  }

  async function editProduct() {
    try {
      const newProduct = {
        title,
        quantity,
        measure,
        purchasePrice,
        salePrice,
        currency,
        supplier,
        description,
        id: product?.id,
        createdAt: product?.createdAt,
      };
      const validate = validateFields(newProduct);

      if (validate.length) {
        setErrors(validate);
        return;
      }

      await axios.put(
        `${import.meta.env.VITE_API_HOST}/products/${product?.id}`,
        newProduct
      );

      alert("Product edited successfully.");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Error when editing product.");
    }
  }

  return (
    <div className="mt-12 w-full max-w-2xl md:pr-0 pr-10 ">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl text-white font-semibold">Product</h1>

        {isEdit && (
          <Button
            onClick={handleDeleteProduct}
            startIcon={Trash}
            variant="error"
          >
            Trash
          </Button>
        )}
      </div>

      <div className="flex items-center gap-5 mt-10">
        <div className="w-36 h-36 bg-[#4A4A4A] rounded-lg flex items-center justify-center mt-3">
          <img src="/image.svg" alt="card" />
        </div>

        <div className="flex flex-col gap-10 justify-between flex-1">
          <Input
            label="Product Name"
            value={title}
            onChange={(event) => setTitle(event.currentTarget.value)}
            error={errors.includes("title")}
          />
          <div className="flex gap-4">
            <Input
              label="Quantity"
              type="number"
              value={quantity}
              error={errors.includes("quantity")}
              onChange={(event) =>
                setQuantity(Number(event.currentTarget.value))
              }
            />
            <Input
              label="Measure_unity"
              value={measure}
              error={errors.includes("measure")}
              onChange={(event) => setMeasure(event.currentTarget.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-2  md:grid-cols-[1fr,1fr,1fr,2fr] mt-10">
        <Input
          label="Purchase price"
          type="number"
          value={purchasePrice}
          error={errors.includes("purchasePrice")}
          onChange={(event) =>
            setPurchasePrice(Number(event.currentTarget.value))
          }
        />
        <Input
          label="Sale price"
          type="number"
          value={salePrice}
          error={errors.includes("salePrice")}
          onChange={(event) => setSalePrice(Number(event.currentTarget.value))}
        />
        <Input
          label="Currency"
          value={currency}
          error={errors.includes("currency")}
          onChange={(event) => setCurrency(event.currentTarget.value)}
        />
        <Input
          label="Supplier"
          value={supplier}
          error={errors.includes("supplier")}
          onChange={(event) => setSupplier(event.currentTarget.value)}
        />
      </div>

      <div className="mt-10">
        <Textarea
          value={description}
          label="Description"
          error={errors.includes("description")}
          onChange={(event) => setDescription(event.currentTarget.value)}
        />
      </div>

      <div
        className="mt-10"
        onClick={() => (isEdit ? editProduct() : createProduct())}
      >
        <Button>{isEdit ? "Save changes" : "Create product"}</Button>
      </div>
    </div>
  );
}

import { PencilSimple } from "@phosphor-icons/react";
import { Product } from "../../models/product";
import { Link } from "react-router-dom";

export enum TypeView {
  COLUMN = "column",
  ROW = "row",
}

interface ProductCardProps {
  product: Product;
  type?: TypeView;
  openModal: () => void;
}

export function ProductCard({
  product,
  type = TypeView.COLUMN,
  openModal,
}: ProductCardProps) {
  return (
    <div className="p-2 bg-[#323232] rounded-lg">
      {type === TypeView.COLUMN ? (
        <div>
          <div className="bg-[#4A4A4A] h-40 w-full rounded-lg flex items-center justify-center">
            <img src="/image.svg" alt="card" />
          </div>

          <div className="mt-2">
            <div className="flex items-center justify-between">
              <button onClick={openModal} className="text-white text-sm">
                {product.title}
              </button>
              <Link to={`/edit-product/${product.id}`} onClick={openModal}>
                <PencilSimple size={20} className="text-blue-dark" />
              </Link>
            </div>
            <div className="flex justify-between items-center mt-2">
              <p className="text-white text-sm">
                <span className="text-gray-primary text-sm">Quantity:</span>{" "}
                {product.quantity}
              </p>
              <p className="text-white text-sm">
                <span className="text-gray-primary text-sm"> Measure un:</span>{" "}
                {product.measure}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <div className="md:flex items-center gap-4">
            <div className="h-16 w-full md:w-36 bg-[#4A4A4A] flex items-center justify-center rounded">
              <img src="/image.svg" alt="card" className="w-5 h-8" />
            </div>

            <div className="mt-4">
              <span className="text-white text-sm">{product.title}</span>

              <div className="flex flex-wrap mt-3 gap-6">
                <p className="text-white text-sm">
                  <span className="text-gray-primary text-sm">Quantity:</span>{" "}
                  {product.quantity}
                </p>
                <p className="text-white text-sm">
                  <span className="text-gray-primary text-sm">
                    {" "}
                    Measure un:
                  </span>{" "}
                  {product.measure}
                </p>
                <p className="text-white text-sm">
                  <span className="text-gray-primary text-sm">
                    Purchase price:
                  </span>{" "}
                  {product.purchasePrice}
                </p>
                <p className="text-white text-sm">
                  <span className="text-gray-primary text-sm">Sale Price:</span>{" "}
                  {product.salePrice}
                </p>
                <p className="text-white text-sm">
                  <span className="text-gray-primary text-sm">Currency:</span>{" "}
                  {product.currency}
                </p>
                <p className="text-white text-sm">
                  <span className="text-gray-primary text-sm">Supplier:</span>{" "}
                  {product.supplier}
                </p>
              </div>
            </div>
          </div>

          <button onClick={openModal}>
            <PencilSimple size={20} className="text-blue-dark" />
          </button>
        </div>
      )}
    </div>
  );
}

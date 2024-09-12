import { useEffect, useState } from "react";
import { Tab } from "../../components/Tab";
import { ProductCard, TypeView } from "../../components/PorductCard";
import { TabView } from "../../components/TabView";
import { Modal } from "../../components/Modal";
import axios from "axios";
import { Product } from "../../models/product";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button/";
import {
  MagnifyingGlass,
  PencilSimple,
  Plus,
  Trash,
} from "@phosphor-icons/react";
import { Textarea } from "../../components/Textarea";
import { Link, useNavigate } from "react-router-dom";
import { parseCookies } from "nookies";

const tabs = [
  { id: "1", title: "All" },
  { id: "2", title: "Active" },
  { id: "3", title: "Completed" },
];

interface FetchProductParams {
  status: string;
  search: string;
}

function App() {
  const [activeTab, setActiveTab] = useState<string>(tabs[0].id);
  const [view, setView] = useState(TypeView.COLUMN);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [productSelected, setProductSelected] = useState<Product>(
    {} as Product
  );
  const navigate = useNavigate();

  useEffect(() => {
    getProducts({ search: "", status: "" });
  }, []);

  async function getProducts({ search = "", status = "" }: FetchProductParams) {
    try {
      const searchQuery = search.length > 0 ? `title=${search}` : "";
      const statusQuery = status.length > 0 ? `status=${status}` : "";

      const mountQuery = `?${searchQuery}&${statusQuery}`;

      const { data: products } = await axios.get(
        `${import.meta.env.VITE_API_HOST}/products${mountQuery}`,
        {
          headers: {
            Authorization: `Bearer ${parseCookies(null).token}`,
          },
        }
      );
      setProducts(products);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleChangeStatus(id: string) {
    try {
      const findTab = tabs.find((tab) => tab.id === id);
      let title = findTab?.title.toLocaleLowerCase();

      if (title === "all") {
        title = "";
      }

      await getProducts({
        status: title || "",
        search: "",
      });
    } catch {
      alert("Erro when change status, tray again.");
    }
  }

  async function search(value: string) {
    try {
      await getProducts({
        status: "",
        search: value,
      });
    } catch {
      alert("Erro on search, tray again.");
    }
  }

  async function handleDeleteProduct() {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_HOST}/products/${productSelected.id}`,
        {
          headers: {
            Authorization: `Bearer ${parseCookies(null).token}`,
          },
        }
      );

      alert("Product deleted successfully!");

      setOpenModal(false);
      await getProducts({ search: "", status: "" });
    } catch (error) {
      console.error(error);
      alert("Error when deleting product");
    }
  }

  return (
    <div className="pr-10">
      <header className="flex items-center justify-between  mt-10">
        <div className=" md:max-w-96 md:w-full">
          <Input
            startIcon={MagnifyingGlass}
            placeholder="Search product"
            onChange={(event) => search(event.currentTarget.value)}
          />
        </div>
        <div className="flex items-center gap-5">
          <Button startIcon={Plus} onClick={() => navigate("/create-product")}>
            Add Product
          </Button>
          <img
            src="https://avatars.githubusercontent.com/u/65233281?v=4"
            alt="avatar"
            className="h-14 w-14 rounded-full hidden md:block"
          />
        </div>
      </header>
      <div className="mt-10">
        <h1 className="text-white text-2xl">Home</h1>

        <div className="mt-10">
          <div className="flex justify-between items-center">
            <Tab
              tabs={tabs}
              active={activeTab}
              onChange={(id: string) => {
                handleChangeStatus(id);
                setActiveTab(id);
              }}
            />

            <TabView view={view} onChange={setView} />
          </div>

          <div
            data-view={view}
            className="grid data-[view=column]:grid-cols-2 data-[view=column]:md:grid-cols-3 data-[view=column]:lg:grid-cols-4 gap-5 mt-4"
          >
            {products?.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                type={view}
                openModal={() => {
                  setProductSelected(product);
                  setOpenModal(true);
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {productSelected.id && (
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <div className="pl-5 pr-10">
            <h2 className="text-white text-2xl">Product Details</h2>

            <div className="mt-10 flex flex-col gap-1">
              <p className="text-white text-sm">
                <span className="text-gray-primary text-sm">Name:</span>{" "}
                {productSelected.title}
              </p>
              <p className="text-white text-sm">
                <span className="text-gray-primary text-sm">Quantity:</span>{" "}
                {productSelected.quantity}
              </p>
              <p className="text-white text-sm">
                <span className="text-gray-primary text-sm">Mesure unity:</span>{" "}
                {productSelected.measure}
              </p>
              <p className="text-white text-sm">
                <span className="text-gray-primary text-sm">
                  Purchase price:
                </span>{" "}
                {productSelected.salePrice}
              </p>
              <p className="text-white text-sm">
                <span className="text-gray-primary text-sm">Sale Price:</span>{" "}
                {productSelected.salePrice}
              </p>
              <p className="text-white text-sm">
                <span className="text-gray-primary text-sm">Currency:</span>{" "}
                {productSelected.currency}
              </p>
              <p className="text-white text-sm">
                <span className="text-gray-primary text-sm">Fornecedor:</span>{" "}
                {productSelected.supplier}
              </p>
              <p className="text-white text-sm">
                <span className="text-gray-primary text-sm">Status:</span>{" "}
                {productSelected.status}
              </p>
            </div>

            <div className="w-full h-36 bg-[#4A4A4A] rounded-lg flex items-center justify-center mt-3">
              <img src="/image.svg" alt="card" />
            </div>

            <div className="mt-3">
              <Textarea placeholder={productSelected.description} />
            </div>

            <div className="mt-10 space-y-4 flex flex-col items-center">
              <Button startIcon={PencilSimple}>
                <Link to={`/edit-product/${productSelected.id}`}>Edit</Link>
              </Button>
              <Button
                onClick={handleDeleteProduct}
                startIcon={Trash}
                variant="error"
              >
                Trash
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default App;

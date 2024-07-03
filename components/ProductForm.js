import Layout from "@/components/Layout";
import { useState } from "react";
import axios from "axios";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/router";

export default function ProductForm({
  _id,
  title: existingTitle,
  descripcion: existingDescripcion,
  precio: existingPrecio,
  images: existingImages,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [descripcion, setDescripcion] = useState(existingDescripcion || "");
  const [precio, setPrecio] = useState(existingPrecio || "");
  const [images, setImages] = useState(existingImages || []);
  const [goToProducts, setGoToProducts] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();
  async function saveProduct(ev) {
    ev.preventDefault();
    const data = { title, descripcion, precio, images };
    if (_id) {
      await axios.put("/api/products", { ...data, _id });
    } else {
      await axios.post("/api/products", data);
    }
    setGoToProducts(true);
  }
  if (goToProducts) {
    router.push("/products");
  }
  async function uploadImages(ev) {
    const files = ev.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      const res = await axios.post("/api/upload", data);
      setImages((oldImages) => {
        return [...oldImages, ...res.data.links];
      });
      setIsUploading(false);
    }
  }
  return (
    <form onSubmit={saveProduct}>
      <label>NOMBRE PRODUCTO</label>
      <input
        type="text"
        placeholder="nombre producto"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <label>IMAGENES</label>
      <div className="mb-2 flex flex-wrap gap-2">
        {!!images?.length &&
          images.map((link) => (
            <div key={link} className="h-24">
              <img src={link} alt="" className="rounded-lg" />
            </div>
          ))}
        {isUploading && <div className="h-24">Uploading...</div>}
        <label className="w-24 h-24 cursor-pointer text-center flex items-center justify-center text-sm gap-1 text-gray-900 rounded-lg bg-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75"
            />
          </svg>
          <div>CARGAR</div>
          <input type="file" onChange={uploadImages} className="hidden" />
        </label>
      </div>
      <label>DESCRIPCION</label>
      <textarea
        placeholder="descripcion"
        value={descripcion}
        onChange={(ev) => setDescripcion(ev.target.value)}
      />
      <label>PRECIO USD</label>
      <input
        type="number"
        placeholder="precio"
        value={precio}
        onChange={(ev) => setPrecio(ev.target.value)}
      />
      <button type="submit" className="btn-primary">
        GUARDAR
      </button>
    </form>
  );
}

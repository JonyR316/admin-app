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
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [descripcion, setDescripcion] = useState(existingDescripcion || "");
  const [precio, setPrecio] = useState(existingPrecio || "");
  const [goToProducts, setGoToProducts] = useState(false);
  const router = useRouter();
  async function saveProduct(ev) {
    ev.preventDefault();
    const data = { title, descripcion, precio };
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
  return (
    <form onSubmit={saveProduct}>
      <label>NOMBRE PRODUCTO</label>
      <input
        type="text"
        placeholder="nombre producto"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
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

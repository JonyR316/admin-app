import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  const { method } = req;

  await mongooseConnect();
  await isAdminRequest(req, res);

  if (method === "GET") {
    try {
      let products;
      if (req.query?.id) {
        products = await Product.findOne({ _id: req.query.id });
      } else if (req.query?.category) {
        products = await Product.find({ category: req.query.category });
      } else {
        products = await Product.find();
      }
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: "Error fetching products" });
    }
  }

  if (method === "POST") {
    const { title, descripcion, precio, images, category, properties } =
      req.body;
    try {
      const productDoc = await Product.create({
        title,
        descripcion,
        precio,
        images,
        category,
        properties,
      });
      res.status(201).json(productDoc);
    } catch (error) {
      res.status(500).json({ message: "Error creating product" });
    }
  }

  if (method === "PUT") {
    const { title, descripcion, precio, images, category, properties, _id } =
      req.body;
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        _id,
        { title, descripcion, precio, images, category, properties },
        { new: true, runValidators: true }
      );
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json({ message: "Error updating product" });
    }
  }

  if (method === "DELETE") {
    if (req.query?.id) {
      try {
        await Product.deleteOne({ _id: req.query?.id });
        res.status(200).json({ message: "Product deleted" });
      } catch (error) {
        res.status(500).json({ message: "Error deleting product" });
      }
    } else {
      res.status(400).json({ message: "Product ID is required" });
    }
  }
}

import mongoose, { model, models, Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    descripcion: String,
    precio: { type: Number, required: true },
    images: [{ type: String }],
    category: { type: mongoose.Types.ObjectId, ref: "Category" },
    properties: { type: Object },
  },
  {
    timestamps: true,
  }
);

export const Product = models.Product || model("Product", ProductSchema);

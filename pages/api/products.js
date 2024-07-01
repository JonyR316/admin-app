import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Product.findOne({ _id: req.query.id }));
    } else {
      res.json(await Product.find());
    }
  }

  if (method === "POST") {
    const { title, descripcion, precio } = req.body;
    const productDoc = await Product.create({
      title,
      descripcion,
      precio,
    });
    res.json(productDoc);
  }

  if (method === "PUT") {
    const { title, descripcion, precio, _id } = req.body;
    await Product.updateOne({ _id }, { title, descripcion, precio });
    res.json(true);
  }

  if (method === "DELETE") {
    if (req.query?.id) {
      await Product.deleteOne({ _id: req.query?.id });
      res.json(true);
    }
  }
}

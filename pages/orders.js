import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios.get("/api/orders").then((response) => {
      setOrders(response.data);
    });
  }, []);
  return (
    <Layout>
      <h1>PEDIDOS</h1>
      <table className="basic">
        <thead>
          <tr>
            <th>ID</th>
            <th>RECIPIENTE</th>
            <th>PRODUCTOS</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 &&
            orders.map((order) => (
              <tr>
                <td>{order.createdAt}</td>
                <td>
                  {order.name} {order.email} {order.phone}
                  {order.local} {order.city} {order.address}
                  {order.main} {order.secondary}
                </td>
                <td>
                  {order.line_items.map((l) => (
                    <>
                      {l.price_data?.product_data.name} x{l.quantity}
                      <br />
                      <br />
                    </>
                  ))}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}

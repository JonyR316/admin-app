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
            <th>FECHA</th>
            <th>CONFIRMADO</th>
            <th>RECIPIENTE</th>
            <th>PRODUCTOS</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order._id}>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td className={order.paid ? "text-green-800" : "text-red-800"}>
                  {order.paid ? "SI" : "NO"}
                </td>
                <td>
                  {order.name} / {order.email} / {order.phone} / {order.local} /{" "}
                  {order.city} / {order.address} / {order.main} /{" "}
                  {order.secondary}
                </td>
                <td>
                  {order.line_items.map((item, index) => (
                    <div key={index}>
                      {item.price_data?.product_data.name} x{item.quantity}
                      <br />
                      <br />
                    </div>
                  ))}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No orders available</td>
            </tr>
          )}
        </tbody>
      </table>
    </Layout>
  );
}

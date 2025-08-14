import api from "../../api";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const OrderItem = () => {
  const { id } = useParams();
  const { token } = useAuth();

  const [loading, setLoading] = useState(true);
  const [orderItem, setOrderItem] = useState(null);

  useEffect(() => {
    if (!token) return;

    const fetchOrderItem = async () => {
      setLoading(true);

      try {
        const res = await api.get(`/orders/items/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setOrderItem(res.data);
      } catch (error) {
        console.log(error);
        setOrderItem(null);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderItem();
  }, [id, token]);

  if (loading) return <div className="container my-5">Loading...</div>;

  const { order, product, quantity } = orderItem;

  return (
    <div className="container my-5">
      <Link to={`/order`} className="text-decoration-none">
        {"< Kembali ke daftar pesanan"}
      </Link>

      {/* Info Pesanan */}
      <div className="card mb-4 mt-4">
        <div className="card-body">
          <h5 className="card-title">Informasi Pesanan</h5>
          <p className="mb-1">
            <strong>Nomor Pesanan:</strong> {order.order_number}
          </p>
          <p className="mb-1">
            <strong>Alamat Pengiriman:</strong> {order.shipping_address}
          </p>
          <p className="mb-1">
            <strong>Metode Pembayaran:</strong> {order.payment_method}
          </p>
          <p className="mb-0">
            <strong>Dibuat Pada:</strong>{" "}
            {new Date(order.created_at).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="card">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={`http://127.0.0.1:8000/${product.image_path.replace(
                /\\/g,
                "/"
              )}`}
              alt={product.name}
              className="img-fluid rounded-start"
              style={{ objectFit: "cover", height: "100%" }}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">
                Harga Satuan: Rp {product.price.toLocaleString()}
              </p>
              <p className="card-text">Quantity: {quantity}</p>
              <p className="fw-bold">
                Total Harga: Rp {(product.price * quantity).toLocaleString()}
              </p>
              <p className="text-muted">{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;

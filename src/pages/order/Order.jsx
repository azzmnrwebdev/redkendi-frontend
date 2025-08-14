import api from "../../api";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Order = () => {
  const { token } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const hasShownToast = useRef(false);
  const [loading, setLoading] = useState(true);
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    if (location.state?.toastMessage && !hasShownToast.current) {
      toast.success(location.state.toastMessage);
      hasShownToast.current = true;

      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  useEffect(() => {
    if (!token) return;

    const fetchOrders = async () => {
      setLoading(true);

      try {
        const res = await api.get("/orders/items-by-user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setOrderItems(res.data);
      } catch (error) {
        console.log(error);
        setOrderItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  if (loading) return <div className="container my-5">Loading...</div>;

  return (
    <div className="container my-5">
      <h2>Daftar Pesanan</h2>

      <div className="row">
        {orderItems.map((item) => (
          <div className="col-md-4 mb-3" key={item.id}>
            <Link
              to={`/order/${item.id}`}
              className="text-decoration-none text-dark"
            >
              <div className="card h-100">
                <img
                  src={`http://127.0.0.1:8000/${item.product.image_path.replace(
                    /\\/g,
                    "/"
                  )}`}
                  className="card-img-top"
                  alt={item.product.name}
                  style={{ objectFit: "cover", height: "200px" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.product.name}</h5>
                  <p className="card-text mb-1">
                    Harga Satuan: Rp {item.product.price.toLocaleString()}
                  </p>
                  <p className="card-text mb-1">Quantity: {item.quantity}</p>
                  <p className="fw-bold">
                    Total: Rp{" "}
                    {(item.product.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}

        {orderItems.length === 0 && (
          <div className="col-12">
            <p className="text-muted">Belum ada pesanan.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;

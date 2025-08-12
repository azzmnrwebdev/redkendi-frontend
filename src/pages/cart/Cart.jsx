import api from "../../api";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import useAuth from "../../hooks/useAuth";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Cart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hasShownToast = useRef(false);

  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    if (location.state?.toastMessage && !hasShownToast.current) {
      toast.success(location.state.toastMessage);
      hasShownToast.current = true;

      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  useEffect(() => {
    if (!token) return;

    const fetchCart = async () => {
      setLoading(true);

      try {
        const res = await api.get("/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setCartItems(res.data);
      } catch (error) {
        console.log(error);
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [token]);

  const updateQuantity = async (cartId, productId, newQty) => {
    if (newQty < 0) return;
    setUpdatingId(cartId);

    try {
      if (newQty === 0) {
        await api.delete(`/cart/${cartId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setCartItems((items) => items.filter((item) => item.id !== cartId));

        toast.info("Produk dihapus dari keranjang.");
      } else {
        const formData = new FormData();
        formData.append("product_id", productId);
        formData.append("quantity", newQty);

        await api.put(`/cart/${cartId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setCartItems((items) =>
          items.map((item) =>
            item.id === cartId ? { ...item, quantity: newQty } : item
          )
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("Gagal memperbarui quantity.");
    } finally {
      setUpdatingId(null);
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  if (loading) return <div className="container my-5">Loading...</div>;

  if (cartItems.length === 0)
    return <div className="container my-5">Keranjang kosong.</div>;

  const handleCheckout = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="container my-5">
        <h2>Keranjang Belanja</h2>

        <div className="list-group">
          {cartItems.map(({ id, product, quantity }) => (
            <div
              key={id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <h5>{product.name}</h5>
                <p>
                  Harga: Rp {product.price.toLocaleString()} <br />
                  Total: Rp {(product.price * quantity).toLocaleString()}
                </p>
              </div>

              <div className="d-flex align-items-center gap-2">
                <button
                  className="btn btn-outline-danger"
                  disabled={updatingId === id}
                  onClick={() => updateQuantity(id, product.id, quantity - 1)}
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  className="btn btn-outline-primary"
                  disabled={updatingId === id}
                  onClick={() => updateQuantity(id, product.id, quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        <hr />
        <h4>Total Bayar: Rp {totalPrice.toLocaleString()}</h4>
        <button className="btn btn-success mt-3" onClick={handleCheckout}>
          Checkout
        </button>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Form Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>{/* Body kosong dulu */}</Modal.Body>
      </Modal>
    </>
  );
};

export default Cart;

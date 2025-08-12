import api from "../../api";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const ShowProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/product/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.log(error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="container my-5">Loading...</div>;

  if (!product)
    return <div className="container my-5">Produk tidak ditemukan</div>;

  const handleAddToCart = async () => {
    if (quantity < 1) return;

    setAdding(true);

    try {
      const formData = new FormData();
      formData.append("product_id", product.id);
      formData.append("quantity", quantity);

      await api.post("/cart", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/cart", {
        state: { toastMessage: "Produk berhasil ditambahkan ke keranjang." },
      });
    } catch (error) {
      console.log(error);
      toast.error("Gagal menambahkan ke keranjang.");
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="container my-5">
      <Link to={`/product`} className="text-decoration-none">
        {"< Kembali ke produk"}
      </Link>

      <div className="row mt-4">
        <div className="col-12 col-sm-8 col-md-6">
          <div className="card">
            <img
              src={`http://127.0.0.1:8000/${product.image_path.replace(
                /\\/g,
                "/"
              )}`}
              className="card-img-top"
              alt={product.name}
            />
            <div className="card-body">
              <h2 className="card-title">{product.name}</h2>
              <p className="card-text">{product.description}</p>
              <p className="card-text">
                <strong>Harga:</strong> Rp {product.price.toLocaleString()}
              </p>
              <p className="card-text">
                <small className="text-muted">
                  Kategori: {product.category.name}
                </small>
              </p>
              <p className="card-text">
                <small className="text-muted">
                  Diperbarui: {new Date(product.updated_at).toLocaleString()}
                </small>
              </p>

              {user && (
                <>
                  <div className="d-flex align-items-center mb-3">
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
                      disabled={quantity <= 1 || adding}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="form-control mx-2 text-center"
                      value={quantity}
                      min={1}
                      readOnly
                      style={{ maxWidth: "60px" }}
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      disabled={adding}
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="btn btn-primary"
                    onClick={handleAddToCart}
                    disabled={quantity < 1 || adding}
                  >
                    {adding ? "Menambahkan..." : "Tambahkan ke keranjang"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowProduct;

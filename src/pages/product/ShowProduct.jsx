import api from "../../api";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ShowProduct = () => {
  const { id } = useParams();
  const { user } = useAuth();
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

  if (loading) return <div className="container mt-5">Loading...</div>;

  if (!product)
    return <div className="container mt-5">Produk tidak ditemukan</div>;

  const handleAddToCart = () => {
    //
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
                <button
                  className="btn btn-primary mt-3"
                  onClick={handleAddToCart}
                >
                  Tambahkan ke keranjang
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowProduct;

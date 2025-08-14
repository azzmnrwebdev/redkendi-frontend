import api from "../../api";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [priceOrder, setPriceOrder] = useState("asc");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/category");
        setCategories(res.data);
      } catch (error) {
        console.log(error);
        if (error.response?.data?.detail === "No categories found") {
          setCategories([]);
        }
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        const params = {
          price_order: priceOrder,
        };

        if (selectedCategory) {
          params.category_id = selectedCategory;
        }

        const res = await api.get("/product", { params });
        setProducts(res.data);
      } catch (error) {
        console.log(error);
        if (error.response?.data?.detail === "No products found") {
          setProducts([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, priceOrder]);

  return (
    <div className="container my-5">
      {/* Filter */}
      <form className="row g-3 mb-4">
        <div className="col-12 col-md-6">
          <label htmlFor="category_id" className="form-label">
            Kategori
          </label>

          <select
            id="category_id"
            className="form-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Semua Kategori</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-12 col-md-6">
          <label htmlFor="price_order" className="form-label">
            Harga
          </label>

          <select
            id="price_order"
            className="form-select"
            value={priceOrder}
            onChange={(e) => setPriceOrder(e.target.value)}
          >
            <option value="asc">Termurah</option>
            <option value="desc">Tertinggi</option>
          </select>
        </div>
      </form>

      {/* Loading */}
      {loading && <div>Loading...</div>}

      {/* Produk */}
      {products.length === 0 ? (
        <p>Produk tidak ditemukan</p>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
          {products.map((product) => (
            <div className="col" key={product.id}>
              <Link
                to={`/product/${product.id}`}
                className="text-decoration-none text-dark"
              >
                <div className="card h-100">
                  <img
                    src={`http://127.0.0.1:8000/${product.image_path.replace(
                      /\\/g,
                      "/"
                    )}`}
                    className="card-img-top"
                    alt={product.name}
                    style={{ objectFit: "cover", height: "200px" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text flex-grow-1">
                      {product.description}
                    </p>
                    <p className="card-text">
                      <strong>Harga:</strong> Rp{" "}
                      {product.price.toLocaleString()}
                    </p>
                    <p className="card-text">
                      <small className="text-muted">
                        Kategori: {product.category.name}
                      </small>
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Product;

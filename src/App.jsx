import useAuth from "./hooks/useAuth";
import { Link } from "react-router-dom";

const App = () => {
  const { user } = useAuth();

  return (
    <>
      <div className="container my-5">
        <div className="card bg-light">
          <div className="card-body">
            {user ? (
              <>
                <h1 className="card-title display-4">
                  Selamat Datang Kembali!
                </h1>
                <p className="card-text lead">
                  Temukan produk terbaik dengan harga spesial untuk Anda!
                </p>
                <hr className="my-4" />
                <p>Jelajahi katalog produk kami yang lengkap dan menarik</p>
                <Link
                  className="btn btn-primary btn-lg"
                  to="/product"
                  role="button"
                >
                  Lihat Produk
                </Link>
              </>
            ) : (
              <>
                <h1 className="card-title display-4">
                  Selamat Datang di Mini E-commerce
                </h1>
                <p className="card-text lead">
                  Silakan login untuk menikmati pengalaman belanja online
                  terbaik
                </p>
                <hr className="my-4" />
                <p>
                  Daftar sekarang dan dapatkan promo menarik untuk pembelian
                  pertama!
                </p>
                <Link
                  className="btn btn-primary btn-lg"
                  to="/login"
                  role="button"
                >
                  Login / Daftar
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;

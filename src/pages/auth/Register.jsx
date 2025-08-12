import api from "../../api";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const res = await api.post("/register", {
        name,
        email,
        password,
        confirm_password: confirmPassword,
      });

      if (res.status == 200) {
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        navigate("/login", {
          state: { toastMessage: "Pendaftaran berhasil" },
        });
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.detail) {
        const validationErrors = {};
        let globalMsg = "";

        error.response.data.detail.forEach((err) => {
          if (err.loc.length === 1 && err.loc[0] === "body") {
            globalMsg = err.msg.replace(/^Value error, /i, "");
          } else {
            const field = err.loc[1];
            const cleanMsg = err.msg.replace(/^Value error, /i, "");
            validationErrors[field] = cleanMsg;
          }
        });

        setErrors(validationErrors);
        setGlobalError(globalMsg);
      } else {
        alert("Terjadi kesalahan: " + (error.message || "Unknown error"));
      }

      setPassword("");
      setConfirmPassword("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mb-4">
        <h3 className="fw-bold">Daftar Akun</h3>
        <p className="fw-semibold mb-0">
          Selamat datang di Mini E-commerce, silahkan membuat akun dan melakukan
          pesanan.
        </p>
      </div>

      <form className="row g-3" onSubmit={handleSubmit}>
        {/* Name */}
        <div className="col-12">
          <label htmlFor="name" className="form-label">
            Nama
          </label>
          <input
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        {/* Email */}
        <div className="col-12">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>

        {/* Password */}
        <div className="col-12">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className={`form-control ${
              errors.password || globalError ? "is-invalid" : ""
            }`}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}

          {globalError && <div className="invalid-feedback">{globalError}</div>}
        </div>

        {/* Confirmation Password */}
        <div className="col-12">
          <label htmlFor="confirm_password" className="form-label">
            Konfirmasi Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirm_password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {/* Button Submit */}
        <div className="col-12 mb-3">
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Loading...
              </>
            ) : (
              "Register"
            )}
          </button>
        </div>

        {/* Text */}
        <div className="col-12 text-center">
          Sudah punya akun? <Link to="/login">Masuk disini</Link>
        </div>
      </form>
    </>
  );
};

export default Register;

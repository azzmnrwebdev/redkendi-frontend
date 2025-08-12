import api from "../../api";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.state?.toastMessage) {
      toast.success(location.state.toastMessage);

      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const res = await api.post("/login", {
        email,
        password,
      });

      if (res.status == 200) {
        setEmail("");
        setPassword("");

        const expiresInMinutes = 60;
        const expiryTime = new Date().getTime() + expiresInMinutes * 60 * 1000;

        localStorage.setItem("access_token", res.data.access_token);
        localStorage.setItem("token_expiry", expiryTime.toString());
        localStorage.setItem("user_data", JSON.stringify(res.data.user));

        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;

        if (status === 422 && data.detail) {
          const validationErrors = {};

          data.detail.forEach((err) => {
            const field = err.loc[1];
            const cleanMsg = err.msg.replace(/^Value error, /i, "");
            validationErrors[field] = cleanMsg;
          });

          setErrors(validationErrors);
        } else if (status === 401 && data.detail) {
          toast.error(data.detail);
        }
      }

      setPassword("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mb-4">
        <h3 className="fw-bold">Masuk Akun</h3>
        <p className="fw-semibold mb-0">
          Selamat datang kembali di <Link to={"/"}>Mini E-commerce</Link>.
        </p>
      </div>

      <form className="row g-3" onSubmit={handleSubmit}>
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
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
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
              "Login"
            )}
          </button>
        </div>

        {/* Text */}
        <div className="col-12 text-center">
          Belum punya akun? <Link to="/register">Daftar disini</Link>
        </div>
      </form>

      {/* Toast Container */}
      <ToastContainer theme="colored" />
    </>
  );
};

export default Login;

import { useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.toastMessage) {
      toast.success(location.state.toastMessage);
    }
  }, [location.state]);

  return (
    <>
      <h2 className="text-center mb-4">Login</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100 mb-3">
          Login
        </Button>

        <div className="text-center">
          Belum punya akun? <Link to="/register">Daftar disini</Link>
        </div>
      </Form>

      {/* Toast Container */}
      <ToastContainer theme="colored" />
    </>
  );
};

export default Login;

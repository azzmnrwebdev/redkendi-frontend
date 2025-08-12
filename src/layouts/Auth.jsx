const Auth = ({ children }) => {
  return (
    <div
      className="w-100 min-vh-100"
      style={{ backgroundColor: "#f1f5f9" }}
    >
      <main className="container py-5">
        <div className="row justify-content-center align-items-center min-vh-100">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
            <div className="card border-0 rounded-5 shadow-lg">
              <div className="card-body" style={{ padding: "2rem 2.5rem" }}>
                {children}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Auth;

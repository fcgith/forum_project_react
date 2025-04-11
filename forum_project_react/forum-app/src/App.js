import logo from './logo.svg';
import './App.css';
import {Link, Route, Routes} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Result from "./Result";

// Home component
function Home() {
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="card-body text-center">
          <h2 className="card-title mb-3">Welcome!</h2>
          <p className="card-text mb-4">
            Please log in or register to continue.
          </p>
          <div className="d-grid gap-2">
            <Link to="/login" className="btn btn-primary">
              Log In
            </Link>
            <Link to="/register" className="btn btn-outline-primary">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/result" element={<Result />} />
    </Routes>
  );
}

export default App;
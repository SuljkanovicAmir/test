import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="nav-container">
      <nav>
        <Link className="home" to="/">
          Home
        </Link>
        <Link to="/add-vehicle-model">Add Model</Link>
        <Link to="/add-vehicle-make">Add Make</Link>
        <Link to="/vehicle-makes">Vehicle Makes</Link>
      </nav>
    </div>
  );
}

export default NavBar;

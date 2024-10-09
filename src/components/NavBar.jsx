import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import AddModel from "./AddModel";

function NavBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="nav-container">
      <nav>
        <Link className="home" to="/">
          Home
        </Link>
        <button className="add-btn" onClick={openModal}>
          Add Model
        </button>

        <Link to="/vehicle-makes">Vehicle Makes</Link>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <AddModel closeModal={closeModal} />
        </Modal>
      </nav>
    </div>
  );
}

export default NavBar;

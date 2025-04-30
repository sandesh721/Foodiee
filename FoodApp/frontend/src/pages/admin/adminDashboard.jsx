import axios from "axios";
import { useEffect, useState } from "react";
import { SPRING_PORT } from "../../constants/strings";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../css/admin/dashboard.css";
import Navbar from "../../components/navbar";

function AdminDashboard() {
  const [pendingRestaurants, setPendingRestaurants] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null); // 'approve' or 'reject'
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetchPendingRestaurants();
  }, []);

  const fetchPendingRestaurants = async () => {
    try {
      const response = await axios.get(`${SPRING_PORT}/admin/pendingRestaurants`);
      setPendingRestaurants(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const handleApprove = (id) => {
    setSelectedAction("approve");
    setSelectedId(id);
    setShowModal(true);
  };

  const handleReject = (id) => {
    setSelectedAction("reject");
    setSelectedId(id);
    setShowModal(true);
  };

  const confirmAction = async () => {
    try {
      const url = `${SPRING_PORT}/admin/${selectedAction}Restaurant/${selectedId}`;
      await axios.post(url); // Example: /admin/approveRestaurant/:id or /admin/rejectRestaurant/:id

      toast.success(`Restaurant ${selectedAction === "approve" ? "Approved" : "Rejected"}!`);

      // Remove the restaurant from the list
      setPendingRestaurants(prev => prev.filter(r => r.id !== selectedId));
    } catch (error) {
      toast.error("Action failed. Try again.");
      console.error(error.response?.data || error.message);
    } finally {
      setShowModal(false);
      setSelectedAction(null);
      setSelectedId(null);
    }
  };

  const cancelAction = () => {
    setShowModal(false);
    setSelectedAction(null);
    setSelectedId(null);
  };

  return (
    <>
      <div className="dashboardWrapper">
  <Navbar />
  <div className="adminDashboard">
    <div className="adminDashboardContent">

            <h1 className="request">Registration Request</h1>
          <table className="pendingTable">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingRestaurants.map((restaurant) => (
                <tr className="pendingTr" key={restaurant.id}>
                  <td>{restaurant.name}</td>
                  <td>{restaurant.email}</td>
                  <td>{restaurant.phone}</td>
                  <td>{restaurant.address}</td>
                  
                  <td>
                    <button onClick={() => handleApprove(restaurant.id)}>Approve</button>
                    <button onClick={() => handleReject(restaurant.id)} style={{ marginLeft: "8px" }}>
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal for Confirmation */}
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <p>Are you sure you want to {selectedAction} this restaurant?</p>
              <button onClick={confirmAction}>Yes</button>
              <button onClick={cancelAction} style={{ marginLeft: "10px" }}>Cancel</button>
            </div>
          </div>
        )}

        <ToastContainer />
      </div>

      </div>
      
    </>
  );
}

export default AdminDashboard;

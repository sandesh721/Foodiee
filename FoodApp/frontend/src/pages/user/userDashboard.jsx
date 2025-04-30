import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { useEffect } from "react";

function UserDashboard(){
    const auth = useAuth();
    const navigate = useNavigate();
   
    return(
        <div>
            <h1>Welcome to user Dashboard</h1>
        </div>
    );
}
export default UserDashboard;
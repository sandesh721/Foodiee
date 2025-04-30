import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SPRING_PORT } from '../../constants/strings';

function AdminUsers() {
     const [selectedCategory, setSelectedCategory] = useState("APPROVED");
        const [restaurants, setRestaurants] = useState([]);
        const [filteredRestaurants, setFilteredRestaurants] = useState([]);
        const [searchKeyword, setSearchKeyword] = useState("");
        useEffect(() => {
            const fetchRestaurants = async () => {
                try {
                    const response = await fetch(`${SPRING_PORT}/admin/allRestaurants`);
                    const data = await response.json();; 
                    setRestaurants(data);
                    applyFilter(data, selectedCategory, searchKeyword);
                    console.log(response.data);
                } catch (error) {
                    console.error("Error fetching restaurants:", error);
                }
            };
            fetchRestaurants();
        }, [])
        const applyFilter = (data, Category, Keyword) => {
            if (!data) return; 
            const filtered = data.filter((rest) => {
                const matchStatus = rest.isApproved === Category;
                const matchSearch = 
                    rest.name?.toLowerCase().includes(Keyword.toLowerCase()) ||
                    rest.email?.toLowerCase().includes(Keyword.toLowerCase()) ||
                    rest.phone?.toLowerCase().includes(Keyword.toLowerCase());
                return matchSearch && matchStatus;
            });
            setFilteredRestaurants(filtered); 
        };
        
        const handleCategoryChange = (e) => {
        const category = e.target.value;
        setSelectedCategory(category);
        applyFilter(restaurants, selectedCategory, searchKeyword);
        };
    
        const handleSearch = (e) => {
            setSearchKeyword(e.target.value)
            applyFilter(restaurants,selectedCategory,searchKeyword);
        }
        return (
            <>
                <div className="dashboardWrapper">
                    <Navbar />
                    <div className="adminDashboard">
                        <div className="adminDashboardContent">
                            <h3>All Restaurants</h3>
                            <div className='filter'>
                                <input type="text" placeholder='Enter the serch key..' value={searchKeyword} onChange={handleSearch}/>
                                <select name="status" id="status" value={selectedCategory} onChange={handleCategoryChange}>
     
                                    <option value='APPROVED' key='1'>Approved</option>
                                    <option value='PENDING' key='2'>Pending</option>
                                    <option value='REJECTED' key='3'>Rejected</option>
                                    
                                </select>
                            </div>
    
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
                                    {
                                        filteredRestaurants.map((rest, index) => (
                                        <tr className="pendingTr" key={index}>
                                            <td>{rest.name}</td>
                                            <td>{rest.email}</td>
                                            <td>{rest.phone}</td>
                                            <td>{rest.address}</td>
                                            <td>--actions--</td>
                                        </tr>
                                        ))
                                    }
                                </tbody>
    
    
                                        
                            </table>
                        </div>
                    </div>
                </div>
            </>
        );
}

export default AdminUsers;
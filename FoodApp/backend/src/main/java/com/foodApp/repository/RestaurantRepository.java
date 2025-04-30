package com.foodApp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.foodApp.dto.RestaurantDTO;
import com.foodApp.entity.Restaurant;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
	boolean existsByEmail(String email);

	Restaurant findByEmail(String email);


	List<Restaurant> findByIsApproved(String status);
	
	@Query("SELECT new com.foodApp.dto.RestaurantDTO(r.id, r.name, r.email, r.address, r.phone, r.isApproved) FROM Restaurant r WHERE r.isApproved = 'PENDING'")
	List<RestaurantDTO> fetchPendingRestaurants();
	
	@Query("SELECT new com.foodApp.dto.RestaurantDTO(r.id, r.name, r.email, r.address, r.phone, r.isApproved) FROM Restaurant r")
	List<RestaurantDTO> fetchAllRestaurants();

}

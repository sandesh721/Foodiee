package com.foodApp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.foodApp.dto.LoginRequest;
import com.foodApp.dto.RestaurantDTO;
import com.foodApp.entity.Admin;
import com.foodApp.repository.AdminRepository;
import com.foodApp.repository.RestaurantRepository;
import com.foodApp.serviceImpl.RestaurantServiceImpl;


@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {
	@Autowired
	AdminRepository adminRepo;
	
	@Autowired
	RestaurantRepository restaurantRepo;
	
	@Autowired
	RestaurantServiceImpl restaurantImpl;
	
	@PostMapping("/login")
	public ResponseEntity<String> adminLogin(@RequestBody LoginRequest loginRequest) {
		
		String email = loginRequest.getEmail();
		String password = loginRequest.getPassword();
		
		Admin admin = adminRepo.findByEmail(email);
		
		if(admin == null) {
			ResponseEntity.badRequest().body("User not found!");
		}
		if(!admin.getPassword().equals(password)) {
			ResponseEntity.badRequest().body("Password does not match!");
		}
		return ResponseEntity.ok("Login Successful");
	}
	
	
	
	@PostMapping("/approveRestaurant/{id}")
	public ResponseEntity<String> approveRestaurant(@PathVariable Long id) {
		String result = restaurantImpl.approveRestaurant(id);

	    if (result.startsWith("Restaurant Approved")) {
	        return ResponseEntity.ok(result);
	    } else {
	        return ResponseEntity.badRequest().body(result); // In case it's "not found"
	    }
	}
	@PostMapping("/rejectRestaurant/{id}")
    public ResponseEntity<String> rejectRestaurant(@PathVariable Long id) {
		 String result = restaurantImpl.rejectRestaurant(id);

		    if (result.startsWith("Restaurant Rejected")) {
		        return ResponseEntity.ok(result);
		    } else {
		        return ResponseEntity.badRequest().body(result);
		    }
    }
	@GetMapping("/pendingRestaurants")
	public ResponseEntity<List<RestaurantDTO>> fetchPendingRestaurants() {
	    List<RestaurantDTO> pending = restaurantRepo.fetchPendingRestaurants();
	    return ResponseEntity.ok(pending);
	}

	@GetMapping("/allRestaurants")
	public ResponseEntity<List<RestaurantDTO>> fetchAllRestaurants() {
	    List<RestaurantDTO> all = restaurantRepo.fetchAllRestaurants();
	    return ResponseEntity.ok(all);
	}

	
	
	
	
}

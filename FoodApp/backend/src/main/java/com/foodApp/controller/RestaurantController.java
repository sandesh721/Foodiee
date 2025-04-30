package com.foodApp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.foodApp.dto.LoginRequest;
import com.foodApp.entity.Restaurant;
import com.foodApp.repository.RestaurantRepository;


@RestController
@RequestMapping("/restaurant")
@CrossOrigin(origins = "http://localhost:3000")
public class RestaurantController {

	@Autowired
	RestaurantRepository restaurantRepo;
	@PostMapping("/register")
	public ResponseEntity<String> registerUser(@RequestBody Restaurant restaurant) {
		
		if(restaurantRepo.existsByEmail(restaurant.getEmail())) {
			return ResponseEntity.badRequest().body("Email already Exists");
		}
		
		restaurantRepo.save(restaurant);
		return ResponseEntity.ok("Registration Successful");
	}
	
	@PostMapping("/login")
	public ResponseEntity<String> loginUser(@RequestBody LoginRequest loginRequest) {
		String  email = loginRequest.getEmail();
		String password = loginRequest.getPassword();
		
		Restaurant restaurant = restaurantRepo.findByEmail(email);
		
		if(restaurant == null) {
			ResponseEntity.badRequest().body("User not found!");
		}
		if(!restaurant.getPassword().equals(password)) {
			ResponseEntity.badRequest().body("Password does not match!");
		}
		return ResponseEntity.ok("Login Successful");
	}
	
}

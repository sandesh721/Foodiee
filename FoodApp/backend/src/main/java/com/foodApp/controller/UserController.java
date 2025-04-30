package com.foodApp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.foodApp.dto.LoginRequest;
import com.foodApp.entity.User;
import com.foodApp.repository.UserRepository;


@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

	@Autowired
	UserRepository userRepo;
	@PostMapping("/register")
	public ResponseEntity<String> registerUser(@RequestBody User user) {
		
		if(userRepo.existsByEmail(user.getEmail())) {
			return ResponseEntity.badRequest().body("Email already Exists");
		}
		
		userRepo.save(user);
		return ResponseEntity.ok("Registration Successful");
	}
	
	@PostMapping("/login")		
	public ResponseEntity<String> loginUser(@RequestBody LoginRequest loginRequest) {
		
		String email = loginRequest.getEmail();
		String password = loginRequest.getPassword();
		
		User user = userRepo.findByEmail(email);
		if (user == null) {
	        return ResponseEntity.badRequest().body("User not found");
	    }

	    
	    if (!user.getPassword().equals(password)) {  
	        return ResponseEntity.badRequest().body("Invalid credentials");
	    }

	    return ResponseEntity.ok("Login successful");
		
	}
	
	
	
}

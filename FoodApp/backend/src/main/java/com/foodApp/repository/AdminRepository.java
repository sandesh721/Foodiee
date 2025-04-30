package com.foodApp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.foodApp.dto.LoginRequest;
import com.foodApp.entity.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long> {
	Admin findByEmail(String email);

	void save(LoginRequest loginRequest);
}

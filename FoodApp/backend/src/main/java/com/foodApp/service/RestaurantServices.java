package com.foodApp.service;

import org.springframework.stereotype.Service;

@Service
public interface RestaurantServices {
	String approveRestaurant(Long id);
	String rejectRestaurant(Long id);
}

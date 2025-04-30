package com.foodApp.serviceImpl;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.foodApp.entity.Restaurant;
import com.foodApp.repository.RestaurantRepository;
import com.foodApp.service.RestaurantServices;


@Service
public class RestaurantServiceImpl implements RestaurantServices {
	
	@Autowired
	RestaurantRepository restaurantRepo;
	
	@Override
	public String approveRestaurant(Long id) {
		return restaurantRepo.findById(id).map(restaurant ->{
				restaurant.setIsApproved("APPROVED");
				restaurantRepo.save(restaurant);
				return "Restaurant Approved Successfully";
		}).orElse("Restaurant not found");
	}

	@Override
	public String rejectRestaurant(Long id) {
		return restaurantRepo.findById(id).map(restaurant ->{
			restaurant.setIsApproved("REJECTED");
			restaurantRepo.save(restaurant);
			return "Restaurant Rejected successfully";
		}).orElse("Restaurant not found");
				
	}

}

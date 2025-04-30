package com.foodApp.dto;

public class RestaurantDTO {
	private Long id;
    private String name;
    private String email;
    private String address;
    private String phone;
    private String isApproved;

    public RestaurantDTO(Long id,String name, String email, String address, String phone, String isApproved) {
        this.id = id;
    	this.name = name;
        this.email = email;
        this.address = address;
        this.phone = phone;
        this.isApproved = isApproved;
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getIsApproved() {
		return isApproved;
	}

	public void setIsApproved(String isApproved) {
		this.isApproved = isApproved;
	}

    
}


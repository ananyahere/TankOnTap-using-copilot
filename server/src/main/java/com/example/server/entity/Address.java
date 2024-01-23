package com.example.server.entity;
import org.springframework.data.mongodb.core.mapping.Document;

public class Address {
    private String addressId;
    private String type;
    private String receiver;
    private String location;
    private String city;
    private String phone;
    
    // Constructor
    public Address(String addressId, String type, String receiver, String location, String city, String phone) {
        this.addressId = addressId;
        this.type = type;
        this.receiver = receiver;
        this.location = location;
        this.city = city;
        this.phone = phone;
    }
    
    // Getters and Setters
    public String getAddressId() {
        return addressId;
    }

    public void setAddressId(String addressId) {
        this.addressId = addressId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getReceiver() {
        return receiver;
    }

    public void setReceiver(String receiver) {
        this.receiver = receiver;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}



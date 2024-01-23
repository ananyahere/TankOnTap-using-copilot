package com.example.server.entity;
import java.util.List;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "user")
public class User {
    private String userId;
    private String name;
    private String email;
    private String city;
    private List<Address> address;
    private List<Vehicle> vehicles;
    private List<String> paymentModes;

    /**
     * Constructs a User object with the specified properties.
     *
     * @param userId       the user ID
     * @param name         the user's name
     * @param email        the user's email address
     * @param city         the user's city
     * @param address      the user's addresses
     * @param vehicles     the user's vehicles
     * @param paymentModes the user's payment modes
     */
    public User(String userId, String name, String email, String city, List<Address> address,
                List<Vehicle> vehicles, List<String> paymentModes) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.city = city;
        this.address = address;
        this.vehicles = vehicles;
        this.paymentModes = paymentModes;
    }

    /**
     * Returns the user ID.
     *
     * @return the user ID
     */
    public String getUserId() {
        return userId;
    }

    /**
     * Sets the user ID.
     *
     * @param userId the user ID to set
     */
    public void setUserId(String userId) {
        this.userId = userId;
    }

    /**
     * Returns the user's name.
     *
     * @return the user's name
     */
    public String getName() {
        return name;
    }

    /**
     * Sets the user's name.
     *
     * @param name the user's name to set
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Returns the user's email address.
     *
     * @return the user's email address
     */
    public String getEmail() {
        return email;
    }

    /**
     * Sets the user's email address.
     *
     * @param email the user's email address to set
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * Returns the user's city.
     *
     * @return the user's city
     */
    public String getCity() {
        return city;
    }

    /**
     * Sets the user's city.
     *
     * @param city the user's city to set
     */
    public void setCity(String city) {
        this.city = city;
    }

    /**
     * Returns the user's addresses.
     *
     * @return the user's addresses
     */
    public List<Address> getAddress() {
        return address;
    }

    /**
     * Sets the user's addresses.
     *
     * @param address the user's addresses to set
     */
    public void setAddress(List<Address> address) {
        this.address = address;
    }

    /**
     * Returns the user's vehicles.
     *
     * @return the user's vehicles
     */
    public List<Vehicle> getVehicles() {
        return vehicles;
    }

    /**
     * Sets the user's vehicles.
     *
     * @param vehicles the user's vehicles to set
     */
    public void setVehicles(List<Vehicle> vehicles) {
        this.vehicles = vehicles;
    }

    /**
     * Returns the user's payment modes.
     *
     * @return the user's payment modes
     */
    public List<String> getPaymentModes() {
        return paymentModes;
    }

    /**
     * Sets the user's payment modes.
     *
     * @param paymentModes the user's payment modes to set
     */
    public void setPaymentModes(List<String> paymentModes) {
        this.paymentModes = paymentModes;
    }
    
    /**
     * Returns a string representation of the User object.
     *
     * @return a string representation of the User object
     */
    @Override
    public String toString() {
        return "User{" +
                "userId='" + userId + '\'' +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", city='" + city + '\'' +
                ", address=" + address +
                ", vehicles=" + vehicles +
                ", paymentModes=" + paymentModes +
                '}';
    }
}



package com.example.server.entity;
import java.util.List;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import java.util.Set;

@Document(collection = "user")
public class User {
    @Id
    private String userId;
    private String name;
    private String email;
    private String city;
    private List<Address> addresses;
    private List<Vehicle> vehicles;
    private List<String> paymentModes;
    private String username;
    private String password;

    @DBRef
    private Set<Role> roles;

    public User() {}    

    /**
     * Constructs a User object with the specified properties.
     *
     * @param userId       the user ID
     * @param name         the user's name
     * @param email        the user's email address
     * @param city         the user's city
     * @param addresses      the user's addresses
     * @param vehicles     the user's vehicles
     * @param paymentModes the user's payment modes
     */
    public User(String userId, String name, String email, String city, List<Address> addresses,
                List<Vehicle> vehicles, List<String> paymentModes) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.city = city;
        this.addresses = addresses;
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
    public List<Address> getAddresses() {
        return addresses;
    }

    /**
     * Sets the user's addresses.
     *
     * @param address the user's addresses to set
     */
    public void setAddresses(List<Address> addresses) {
        this.addresses = addresses;
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
     * Returns the user's roles.
     *
     * @return the user's roles
     */
    public Set<Role> getRoles() {
        return roles;
    }

    /**
     * Sets the user's roles.
     *
     * @param roles the user's roles to set
     */
    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }
    
    public String getUsername() {
        return username;
    }
    
    public void setUsername(String username) {
        this.username = username;
    }
    
    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
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
                ", addresses=" + addresses +
                ", vehicles=" + vehicles +
                ", paymentModes=" + paymentModes +
                '}';
    }
}


package com.example.server.entity;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Document(collection = "order")
public class Order {
    private String objectId;
    
    @DBRef
    private User user;
    
    private Address deliveryLocation;
    private double totalAmount;
    private boolean isImmediate;
    private double extraCharges; // shipping charges + taxes
    private String orderTime;
    private String deliveryScheduleTime;
    private List<FuelItem> orderItems;
    private String deliveryOTP;
    private String deliveryTime;
    
    /**
     * Default constructor for the Order class.
     */
    public Order() {
        // Default constructor
    }
    
    /**
     * Constructor for the Order class.
     * @param objectId The unique identifier of the order.
     * @param user The user who placed the order.
     * @param deliveryLocation The delivery location for the order.
     * @param totalAmount The total amount of the order.
     * @param isImmediate Indicates if the order is for immediate delivery.
     * @param extraCharges The extra charges for the order (shipping charges + taxes).
     * @param orderTime The time when the order was placed.
     * @param deliveryScheduleTime The scheduled delivery time for the order.
     * @param orderItems The list of fuel items in the order.
     * @param deliveryOTP The OTP (One-Time Password) for delivery verification.
     * @param deliveryTime The time when the order was delivered.
     */
    public Order(String objectId, User user, Address deliveryLocation, double totalAmount, boolean isImmediate, double extraCharges, String orderTime, String deliveryScheduleTime, List<FuelItem> orderItems, String deliveryOTP, String deliveryTime) {
        this.objectId = objectId;
        this.user = user;
        this.deliveryLocation = deliveryLocation;
        this.totalAmount = totalAmount;
        this.isImmediate = isImmediate;
        this.extraCharges = extraCharges;
        this.orderTime = orderTime;
        this.deliveryScheduleTime = deliveryScheduleTime;
        this.orderItems = orderItems;
        this.deliveryOTP = deliveryOTP;
        this.deliveryTime = deliveryTime;
    }
    
    /**
     * Get the unique identifier of the order.
     * @return The unique identifier of the order.
     */
    public String getObjectId() {
        return objectId;
    }
    
    /**
     * Set the unique identifier of the order.
     * @param objectId The unique identifier of the order.
     */
    public void setObjectId(String objectId) {
        this.objectId = objectId;
    }
    
    /**
     * Get the user who placed the order.
     * @return The user who placed the order.
     */
    public User getUser() {
        return user;
    }
    
    /**
     * Set the user who placed the order.
     * @param userId The user who placed the order.
     */
    public void setUser(User userId) {
        this.user = userId;
    }
    
    /**
     * Get the delivery location for the order.
     * @return The delivery location for the order.
     */
    public Address getDeliveryLocation() {
        return deliveryLocation;
    }
    
    /**
     * Set the delivery location for the order.
     * @param deliveryLocation The delivery location for the order.
     */
    public void setDeliveryLocation(Address deliveryLocation) {
        this.deliveryLocation = deliveryLocation;
    }
    
    /**
     * Get the total amount of the order.
     * @return The total amount of the order.
     */
    public double getTotalAmount() {
        return totalAmount;
    }
    
    /**
     * Set the total amount of the order.
     * @param totalAmount The total amount of the order.
     */
    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }
    
    /**
     * Check if the order is for immediate delivery.
     * @return True if the order is for immediate delivery, false otherwise.
     */
    public boolean isImmediate() {
        return isImmediate;
    }
    
    /**
     * Set whether the order is for immediate delivery.
     * @param immediate True if the order is for immediate delivery, false otherwise.
     */
    public void setImmediate(boolean immediate) {
        isImmediate = immediate;
    }
    
    /**
     * Get the extra charges for the order (shipping charges + taxes).
     * @return The extra charges for the order.
     */
    public double getExtraCharges() {
        return extraCharges;
    }
    
    /**
     * Set the extra charges for the order (shipping charges + taxes).
     * @param extraCharges The extra charges for the order.
     */
    public void setExtraCharges(double extraCharges) {
        this.extraCharges = extraCharges;
    }
    
    /**
     * Get the time when the order was placed.
     * @return The time when the order was placed.
     */
    public String getOrderTime() {
        return orderTime;
    }
    
    /**
     * Set the time when the order was placed.
     * @param orderTime The time when the order was placed.
     */
    public void setOrderTime(String orderTime) {
        this.orderTime = orderTime;
    }
    
    /**
     * Get the scheduled delivery time for the order.
     * @return The scheduled delivery time for the order.
     */
    public String getDeliveryScheduleTime() {
        return deliveryScheduleTime;
    }
    
    /**
     * Set the scheduled delivery time for the order.
     * @param deliveryScheduleTime The scheduled delivery time for the order.
     */
    public void setDeliveryScheduleTime(String deliveryScheduleTime) {
        this.deliveryScheduleTime = deliveryScheduleTime;
    }
    
    /**
     * Get the list of fuel items in the order.
     * @return The list of fuel items in the order.
     */
    public List<FuelItem> getOrderItems() {
        return orderItems;
    }
    
    /**
     * Set the list of fuel items in the order.
     * @param orderItems The list of fuel items in the order.
     */
    public void setOrderItems(List<FuelItem> orderItems) {
        this.orderItems = orderItems;
    }
    
    /**
     * Get the OTP (One-Time Password) for delivery verification.
     * @return The OTP for delivery verification.
     */
    public String getDeliveryOTP() {
        return deliveryOTP;
    }
    
    /**
     * Set the OTP (One-Time Password) for delivery verification.
     * @param deliveryOTP The OTP for delivery verification.
     */
    public void setDeliveryOTP(String deliveryOTP) {
        this.deliveryOTP = deliveryOTP;
    }
    
    /**
     * Get the time when the order was delivered.
     * @return The time when the order was delivered.
     */
    public String getDeliveryTime() {
        return deliveryTime;
    }
    
    /**
     * Set the time when the order was delivered.
     * @param deliveryTime The time when the order was delivered.
     */
    public void setDeliveryTime(String deliveryTime) {
        this.deliveryTime = deliveryTime;
    }
}



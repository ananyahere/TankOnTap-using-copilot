package com.example.server.entity;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "vehicle")
public class Vehicle {
    private String vehicleId;
    private String model;
    private String color;
    private String fuelType;
    private String carType;

    /**
     * Constructs a new Vehicle object with the specified parameters.
     *
     * @param vehicleId The ID of the vehicle.
     * @param model     The model of the vehicle.
     * @param color     The color of the vehicle.
     * @param fuelType  The fuel type of the vehicle.
     * @param carType   The type of the vehicle (e.g., sedan, SUV).
     */
    public Vehicle(String vehicleId, String model, String color, String fuelType, String carType) {
        this.vehicleId = vehicleId;
        this.model = model;
        this.color = color;
        this.fuelType = fuelType;
        this.carType = carType;
    }

    // Getters and Setters

    /**
     * Returns the ID of the vehicle.
     *
     * @return The vehicle ID.
     */
    public String getVehicleId() {
        return vehicleId;
    }

    /**
     * Sets the ID of the vehicle.
     *
     * @param vehicleId The vehicle ID to set.
     */
    public void setVehicleId(String vehicleId) {
        this.vehicleId = vehicleId;
    }

    /**
     * Returns the model of the vehicle.
     *
     * @return The vehicle model.
     */
    public String getModel() {
        return model;
    }

    /**
     * Sets the model of the vehicle.
     *
     * @param model The vehicle model to set.
     */
    public void setModel(String model) {
        this.model = model;
    }

    /**
     * Returns the color of the vehicle.
     *
     * @return The vehicle color.
     */
    public String getColor() {
        return color;
    }

    /**
     * Sets the color of the vehicle.
     *
     * @param color The vehicle color to set.
     */
    public void setColor(String color) {
        this.color = color;
    }

    /**
     * Returns the fuel type of the vehicle.
     *
     * @return The vehicle fuel type.
     */
    public String getFuelType() {
        return fuelType;
    }

    /**
     * Sets the fuel type of the vehicle.
     *
     * @param fuelType The vehicle fuel type to set.
     */
    public void setFuelType(String fuelType) {
        this.fuelType = fuelType;
    }

    /**
     * Returns the type of the vehicle.
     *
     * @return The vehicle type.
     */
    public String getCarType() {
        return carType;
    }

    /**
     * Sets the type of the vehicle.
     *
     * @param carType The vehicle type to set.
     */
    public void setCarType(String carType) {
        this.carType = carType;
    }

    /**
     * Returns a string representation of the Vehicle object.
     *
     * @return A string representation of the Vehicle object.
     */
    @Override
    public String toString() {
        return "Vehicle{" +
                "vehicleId='" + vehicleId + '\'' +
                ", model='" + model + '\'' +
                ", color='" + color + '\'' +
                ", fuelType='" + fuelType + '\'' +
                ", carType='" + carType + '\'' +
                '}';
    }
}


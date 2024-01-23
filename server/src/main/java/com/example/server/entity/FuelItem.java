package com.example.server.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

/**
 * The FuelItem class is used to store information about a fuel item.
 */
public class FuelItem {
    @Id
    private String fuelItemId;
    private double quantity;
    private String unit;

    @DBRef
    private Fuel fuelDetail;

    // Constructors, getters, and setters

    /**
     * Default constructor for FuelItem class.
     */
    public FuelItem() {
    }

    /**
     * Parameterized constructor for FuelItem class.
     * @param fuelItemId The ID of the fuel item.
     * @param quantity The quantity of the fuel item.
     * @param unit The unit of measurement for the fuel item.
     * @param fuel The fuel associated with the fuel item.
     */
    public FuelItem(String fuelItemId, double quantity, String unit, Fuel fuel) {
        this.fuelItemId = fuelItemId;
        this.quantity = quantity;
        this.unit = unit;
        this.fuelDetail = fuel;
    }

    /**
     * Get the ID of the fuel item.
     * @return The fuel item ID.
     */
    public String getFuelItemId() {
        return fuelItemId;
    }

    /**
     * Set the ID of the fuel item.
     * @param fuelItemId The fuel item ID to set.
     */
    public void setFuelItemId(String fuelItemId) {
        this.fuelItemId = fuelItemId;
    }

    /**
     * Get the quantity of the fuel item.
     * @return The fuel item quantity.
     */
    public double getQuantity() {
        return quantity;
    }

    /**
     * Set the quantity of the fuel item.
     * @param quantity The fuel item quantity to set.
     */
    public void setQuantity(double quantity) {
        this.quantity = quantity;
    }

    /**
     * Get the unit of measurement for the fuel item.
     * @return The fuel item unit.
     */
    public String getUnit() {
        return unit;
    }

    /**
     * Set the unit of measurement for the fuel item.
     * @param unit The fuel item unit to set.
     */
    public void setUnit(String unit) {
        this.unit = unit;
    }

    /**
     * Get the fuel associated with the fuel item.
     * @return The fuel item's associated fuel.
     */
    public Fuel getFuelDetail() {
        return fuelDetail;
    }

    /**
     * Set the fuel associated with the fuel item.
     * @param fuel The fuel item's associated fuel to set.
     */
    public void setFuel(Fuel fuel) {
        this.fuelDetail = fuel;
    }
}






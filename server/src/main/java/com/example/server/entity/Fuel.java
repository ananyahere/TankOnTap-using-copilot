package com.example.server.entity;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "fuel")
public class Fuel {
    private String fuelId;
    private String type;
    private double amountInInventory;
    private String unitOfAmountInInventory;
    private Supplier supplier;
    private double basePriceHyd;
    private double basePriceBlr;
    private double basePriceBhu;

    /**
     * Constructs a Fuel object with the specified parameters.
     *
     * @param fuelId                   the fuel ID
     * @param type                     the fuel type
     * @param amountInInventory        the amount of fuel in inventory
     * @param unitOfAmountInInventory  the unit of measurement for the amount of fuel in inventory
     * @param supplier                 the fuel supplier
     * @param basePriceHyd             the base price of fuel in Hyderabad
     * @param basePriceBlr             the base price of fuel in Bangalore
     * @param basePriceBhu             the base price of fuel in Bhuvaneshwar
     */
    public Fuel(String fuelId, String type, double amountInInventory, String unitOfAmountInInventory, Supplier supplier,
                double basePriceHyd, double basePriceBlr, double basePriceBhu) {
        this.fuelId = fuelId;
        this.type = type;
        this.amountInInventory = amountInInventory;
        this.unitOfAmountInInventory = unitOfAmountInInventory;
        this.supplier = supplier;
        this.basePriceHyd = basePriceHyd;
        this.basePriceBlr = basePriceBlr;
        this.basePriceBhu = basePriceBhu;
    }

    // Getters
    public String getFuelId() {
        return fuelId;
    }

    public String getType() {
        return type;
    }

    public double getAmountInInventory() {
        return amountInInventory;
    }

    public String getUnitOfAmountInInventory() {
        return unitOfAmountInInventory;
    }

    public Supplier getSupplier() {
        return supplier;
    }

    public double getBasePriceHyd() {
        return basePriceHyd;
    }

    public double getBasePriceBlr() {
        return basePriceBlr;
    }

    public double getBasePriceBhu() {
        return basePriceBhu;
    }

    // Setters
    public void setFuelId(String fuelId) {
        this.fuelId = fuelId;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setAmountInInventory(double amountInInventory) {
        this.amountInInventory = amountInInventory;
    }

    public void setUnitOfAmountInInventory(String unitOfAmountInInventory) {
        this.unitOfAmountInInventory = unitOfAmountInInventory;
    }

    public void setSupplier(Supplier supplier) {
        this.supplier = supplier;
    }

    public void setBasePriceHyd(double basePriceHyd) {
        this.basePriceHyd = basePriceHyd;
    }

    public void setBasePriceBlr(double basePriceBlr) {
        this.basePriceBlr = basePriceBlr;
    }

    public void setBasePriceBhu(double basePriceBhu) {
        this.basePriceBhu = basePriceBhu;
    }

    /**
     * Returns a string representation of the Fuel object.
     *
     * @return a string representation of the Fuel object
     */
    @Override
    public String toString() {
        return "Fuel{" +
                "fuelId='" + fuelId + '\'' +
                ", type='" + type + '\'' +
                ", amountInInventory=" + amountInInventory +
                ", unitOfAmountInInventory='" + unitOfAmountInInventory + '\'' +
                ", supplier=" + supplier +
                ", basePriceHyd=" + basePriceHyd +
                ", basePriceBlr=" + basePriceBlr +
                ", basePriceBhu=" + basePriceBhu +
                '}';
    }
}


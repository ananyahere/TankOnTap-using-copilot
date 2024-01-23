package com.example.server.entity;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "fuel")
public class Fuel {
    private String fuelId;
    private String type;
    private int amountInInventory;
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
    public Fuel(String fuelId, String type, int amountInInventory, String unitOfAmountInInventory, Supplier supplier,
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

    // Getters and setters

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


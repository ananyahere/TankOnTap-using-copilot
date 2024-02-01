package com.example.server.entity;

import java.util.List;

public class CartResponse {
    private String cartId;
    private List<FuelItem> fuelItems;

    public CartResponse(String cartId, List<FuelItem> fuelItems) {
        this.cartId = cartId;
        this.fuelItems = fuelItems;
    }

    public String getCartId() {
        return cartId;
    }

    public List<FuelItem> getFuelItems() {
        return fuelItems;
    }

    public void setCartId(String cartId) {
        this.cartId = cartId;
    }

    public void setFuelItems(List<FuelItem> fuelItems) {
        this.fuelItems = fuelItems;
    }
}

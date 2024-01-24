package com.example.server.service;

import com.example.server.entity.Cart;
import com.example.server.entity.FuelItem;
import com.example.server.exception.ResourceNotFoundException;
import com.example.server.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartService { 

    @Autowired
    private CartRepository cartRepository;

    /**
     * Adds a fuel item to the cart.
     *
     * @param userId The ID of the user.
     * @param fuelItem The fuel item to add.
     * @return The updated cart.
     */
    public Cart addItemToCart(String userId, FuelItem fuelItem) {
        Cart cart = cartRepository.findByUser_UserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found for user id " + userId));
        cart.getFuels().add(fuelItem);
        return cartRepository.save(cart);
    }

    /**
     * Removes a fuel item from the cart.
     *
     * @param userId The ID of the user.
     * @param fuelItemId The ID of the fuel item to remove.
     * @return The updated cart.
     */
    public Cart removeItemFromCart(String userId, String fuelItemId) {
        Cart cart = cartRepository.findByUser_UserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found for user id " + userId));
        cart.getFuels().removeIf(item -> item.getFuelItemId().equals(fuelItemId));
        return cartRepository.save(cart);
    }

    /**
     * Retrieves the cart for the specified user.
     *
     * @param userId The ID of the user.
     * @return The cart for the specified user.
     */
    public Cart getCartByUserId(String userId) {
        return cartRepository.findByUser_UserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found for user id " + userId));
    }

    public Cart clearCart(String userId) {
        Cart cart = cartRepository.findByUser_UserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found for user id " + userId));
        cart.getFuels().clear();
        return cartRepository.save(cart);
    }
}
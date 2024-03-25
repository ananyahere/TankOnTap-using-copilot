package com.example.server.service;

import com.example.server.entity.Cart;
import com.example.server.entity.FuelItem;
import com.example.server.exception.ResourceNotFoundException;
import com.example.server.repository.CartRepository;
import com.example.server.service.CartService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class CartServiceTests {

    @InjectMocks
    private CartService cartService;

    @Mock
    private CartRepository cartRepository;

    @BeforeEach
    public void init() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testAddItemToCart() {
        String userId = "user1";
        FuelItem fuelItem = new FuelItem();
        Cart cart = new Cart();
        when(cartRepository.findByUser_UserId(userId)).thenReturn(Optional.of(cart));
        when(cartRepository.save(cart)).thenReturn(cart);

        Cart result = cartService.addItemToCart(userId, fuelItem);

        assertEquals(cart, result);
        verify(cartRepository, times(1)).findByUser_UserId(userId);
        verify(cartRepository, times(1)).save(cart);
    }

    @Test
    public void testRemoveItemFromCart() {
        String userId = "user1";
        String fuelItemId = "fuel1";
        FuelItem fuelItem = new FuelItem();
        fuelItem.setFuelItemId(fuelItemId);
        Cart cart = new Cart();
        cart.getFuels().add(fuelItem);
        when(cartRepository.findByUser_UserId(userId)).thenReturn(Optional.of(cart));
        when(cartRepository.save(cart)).thenReturn(cart);

        Cart result = cartService.removeItemFromCart(userId, fuelItemId);

        assertEquals(cart, result);
        assertTrue(cart.getFuels().isEmpty());
        verify(cartRepository, times(1)).findByUser_UserId(userId);
        verify(cartRepository, times(1)).save(cart);
    }

    @Test
    public void testGetCartByUserId() {
        String userId = "user1";
        Cart cart = new Cart();
        when(cartRepository.findByUser_UserId(userId)).thenReturn(Optional.of(cart));

        Cart result = cartService.getCartByUserId(userId);

        assertEquals(cart, result);
        verify(cartRepository, times(1)).findByUser_UserId(userId);
    }

    @Test
    public void testClearCart() {
        String userId = "user1";
        Cart cart = new Cart();
        cart.getFuels().add(new FuelItem());
        when(cartRepository.findByUser_UserId(userId)).thenReturn(Optional.of(cart));
        when(cartRepository.save(cart)).thenReturn(cart);

        Cart result = cartService.clearCart(userId);

        assertEquals(cart, result);
        assertTrue(cart.getFuels().isEmpty());
        verify(cartRepository, times(1)).findByUser_UserId(userId);
        verify(cartRepository, times(1)).save(cart);
    }

    @Test
    public void testCartNotFound() {
        String userId = "user1";
        when(cartRepository.findByUser_UserId(userId)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> cartService.addItemToCart(userId, new FuelItem()));
        assertThrows(ResourceNotFoundException.class, () -> cartService.removeItemFromCart(userId, "fuel1"));
        assertThrows(ResourceNotFoundException.class, () -> cartService.getCartByUserId(userId));
        assertThrows(ResourceNotFoundException.class, () -> cartService.clearCart(userId));
    }
}
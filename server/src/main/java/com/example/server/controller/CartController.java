package com.example.server.controller;

import com.example.server.entity.Cart;
import com.example.server.entity.FuelItem;
import com.example.server.entity.Response;
import com.example.server.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;
    
    @GetMapping("/{userId}")
    public ResponseEntity<Cart> getCart(@PathVariable String userId) {
        Cart cart = cartService.getCartByUserId(userId);
        return ResponseEntity.ok(cart);
    }

    @PostMapping("/{userId}/addItem")
    public ResponseEntity<Cart> addItemToCart(@PathVariable String userId, @RequestBody FuelItem fuelItem) {
        Cart cart = cartService.addItemToCart(userId, fuelItem);
        return ResponseEntity.ok(cart);
    }    

    @DeleteMapping("/{userId}/removeItem")
    public ResponseEntity<Cart> removeItemFromCart(@PathVariable String userId, @RequestBody FuelItem fuelItem) {
        String fuelItemId = fuelItem.getFuelItemId();
        Cart cart = cartService.removeItemFromCart(userId, fuelItemId);
        return ResponseEntity.ok(cart);
    }

    @ExceptionHandler({ Exception.class })
    public ResponseEntity<Response> handleException(Exception ex) {
        Response errorResponse = new Response(null, ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value());
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

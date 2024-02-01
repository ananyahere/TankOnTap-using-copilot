package com.example.server.controller;

import com.example.server.entity.Cart;
import com.example.server.entity.CartResponse;
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
    public ResponseEntity<CartResponse> getCart(@PathVariable String userId) {
        Cart cart = cartService.getCartByUserId(userId);
        CartResponse cartResponse = new CartResponse(cart.getCartId(), cart.getFuels());
        return ResponseEntity.ok(cartResponse);
    }

    @PostMapping("/{userId}/addItem")
    public ResponseEntity<CartResponse> addItemToCart(@PathVariable String userId, @RequestBody FuelItem fuelItem) {
        Cart cart = cartService.addItemToCart(userId, fuelItem);
        CartResponse cartResponse = new CartResponse(cart.getCartId(), cart.getFuels());
        return ResponseEntity.ok(cartResponse);
    }    

    @DeleteMapping("/{userId}/removeItem/{fuelItemId}")
    public ResponseEntity<CartResponse> removeItemFromCart(@PathVariable String userId, @PathVariable String fuelItemId) {
        Cart cart = cartService.removeItemFromCart(userId, fuelItemId);
        CartResponse cartResponse = new CartResponse(cart.getCartId(), cart.getFuels());
        return ResponseEntity.ok(cartResponse);
    }

    @ExceptionHandler({ Exception.class })
    public ResponseEntity<Response> handleException(Exception ex) {
        Response errorResponse = new Response(null, ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value());
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

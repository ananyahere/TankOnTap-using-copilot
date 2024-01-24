package com.example.server.controller;
import com.example.server.entity.Order;
import com.example.server.entity.Response;
import com.example.server.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/api/order")
public class OrderController {
    
    @Autowired
    private OrderService orderService;
    
    @PostMapping("/")
    public ResponseEntity<Response> placeOrder(@RequestBody Order order) {
        Order placedOrder = orderService.placeOrder(order);
        return ResponseEntity.ok(new Response(placedOrder, "Order placed successfully", HttpStatus.OK.value()));
    }

    @GetMapping("/")
    public ResponseEntity<Response> getAllOrders() {
        List<Order> orders = orderService.getAllOrders();
        return ResponseEntity.ok(new Response(orders, "Orders fetched successfully", HttpStatus.OK.value()));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Response> getOrdersByUserId(@PathVariable String userId) {
        List<Order> orders = orderService.getOrderHistoryByUserId(userId);
        return ResponseEntity.ok(new Response(orders, "Orders fetched successfully", HttpStatus.OK.value()));
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<Response> getOrderById(@PathVariable String orderId) {
        Order order = orderService.getOrderDetailsById(orderId);
        return ResponseEntity.ok(new Response(order, "Order fetched successfully", HttpStatus.OK.value()));
    }

    @PostMapping("/{orderId}/status")
    public ResponseEntity<Response> updateOrderStatus(@PathVariable String orderId, @RequestBody String status) {
        Order updatedOrder = orderService.updateOrderStatus(orderId, status);
        return ResponseEntity.ok(new Response(updatedOrder, "Order status updated successfully", HttpStatus.OK.value()));
    }

    @GetMapping("/{orderId}/otp")
    public ResponseEntity<Response> generateDeliveryOTP(@PathVariable String orderId) {
        String otp = orderService.generateDeliveryOTP(orderId);        
        return ResponseEntity.ok(new Response(otp, "OTP generated successfully", HttpStatus.OK.value()));
    }

    @GetMapping("/user/{userId}/last")
    public ResponseEntity<Response> getLastOrderTimePlacedByUser(@PathVariable String userId) {
        LocalDateTime lastOrderTime = orderService.getLastOrderTimePlacedByUser(userId);
        String lastOrderTimeString = lastOrderTime.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);        
        return ResponseEntity.ok(new Response(lastOrderTimeString, "Last order time fetched successfully", HttpStatus.OK.value()));
    }

    @ExceptionHandler({ Exception.class })
    public ResponseEntity<Response> handleException(Exception ex) {
        Response errorResponse = new Response(null, ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value());
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }    
    
}

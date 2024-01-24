package com.example.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.server.exception.ResourceNotFoundException;

import com.example.server.entity.Order;
import com.example.server.repository.OrderRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public Order placeOrder(Order order) {
        if (order.getTotalAmount() <= 0) {
            throw new IllegalArgumentException("Total amount must be greater than zero");
        }
        if (order.getOrderItems() == null || order.getOrderItems().isEmpty()) {
            throw new IllegalArgumentException("Order items cannot be empty");
        }
        if (order.getDeliveryLocation() == null || order.getDeliveryLocation().getLocation().isEmpty()) {
            throw new IllegalArgumentException("Delivery location cannot be empty");
        }
        order.setOrderStatus("CONFIRMED");
        order.setOrderTime(LocalDateTime.now());
        return orderRepository.save(order);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public List<Order> getOrderHistoryByUserId(String userId) {
        return orderRepository.findByUser_UserId(userId);
    }

    public Order getOrderDetailsById(String orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id " + orderId));
    }

    public String generateDeliveryOTP(String orderId) {
        String otp = String.format("%06d", new Random().nextInt(999999));
        Order order = getOrderDetailsById(orderId);
        order.setDeliveryOTP(otp);
        orderRepository.save(order);
        return otp;
    }

    public Order updateOrderStatus(String orderId, String orderStatus) {
        Order order = getOrderDetailsById(orderId);
        order.setOrderStatus(orderStatus);
        return orderRepository.save(order);
    }

    public LocalDateTime getLastOrderTimePlacedByUser(String userId) {
        return orderRepository.findTopByUser_UserIdOrderByOrderTimeDesc(userId)
                .map(Order::getOrderTime)
                .orElseThrow(() -> new ResourceNotFoundException("No orders found for user id " + userId));
    }
}
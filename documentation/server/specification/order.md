# Introduction

This document provides the technical specifications for the Order Module of the on-demand fuel delivery application. The Order Module is responsible for managing user orders, including order placement, order summary, and order tracking.

## Requirements

The Order Module must meet the following functional requirements, as described in the user stories:

- Users should be able to select the type of fuel, choose a supplier, enter the amount of fuel, and specify the unit of measurement.
- Users should be able to add the selected fuel to their cart, view the items in their cart, and move items from the cart to their order.
- Users should be able to place an order by entering delivery details and confirming the order.
- Users should be able to view an order summary, including items in the order, delivery status, delivery person details, shipping address, cost breakup, and estimated delivery time.
- Users should be able to track the progress of their order until it is delivered.

## System Overview

The Order Module consists of several components:

- OrderController: Handles HTTP requests related to orders.
- OrderService: Provides methods for managing orders.
- OrderRepository: Provides methods for accessing the order collection in the database.
- Order: Represents an order in the system.

## Data Models

The Order class represents an order and includes fields for the user ID, order items, delivery details, order status, delivery person details, and cost details.The following data models are used in the Order Module:

### Fuel

- `fuelId`: Unique identifier for the fuel.
- `fuelType`: The type of fuel (e.g., Diesel, Petrol, etc.).
- `suppliers`: A list of suppliers for this type of fuel.

### Supplier

- `supplierId`: Unique identifier for the supplier.
- `name`: The name of the supplier.
- `fuels`: A list of fuels that this supplier provides.

### Cart

- `cartId`: Unique identifier for the cart.
- `userId`: Identifier for the user who owns the cart.
- `items`: A list of cart items.

### CartItem

- `itemId`: Unique identifier for the cart item.
- `fuelId`: Identifier for the fuel in the cart item.
- `supplierId`: Identifier for the supplier of the fuel.
- `quantity`: The quantity of the fuel in the cart item.
- `unit`: The unit of measurement for the quantity.

### Order

- `orderId`: Unique identifier for the order.
- `userId`: Identifier for the user who placed the order.
- `items`: A list of order items.
- `deliveryDetails`: The delivery details for the order.
- `status`: The status of the order (e.g., Confirmed, In Transit, Delivered).
- `deliveryPersonDetails`: The details of the delivery person assigned to the order.
- `shippingAddress`: The shipping address for the order.
- `costBreakup`: The cost breakup of the order, including taxes and any additional charges.
- `estimatedDeliveryTime`: The estimated delivery time for the order.

### OrderItem

- `itemId`: Unique identifier for the order item.
- `fuelId`: Identifier for the fuel in the order item.
- `supplierId`: Identifier for the supplier of the fuel.
- `quantity`: The quantity of the fuel in the order item.
- `unit`: The unit of measurement for the quantity.

### DeliveryDetails

- `location`: The delivery location.
- `expectedTime`: The expected delivery time.

### DeliveryPersonDetails

- `personId`: Unique identifier for the delivery person.
- `name`: The name of the delivery person.
- `contactInfo`: The contact information for the delivery person.

### CostBreakup

- `subtotal`: The subtotal cost of the order.
- `taxes`: The total amount of taxes.
- `additionalCharges`: Any additional charges.
- `total`: The total cost of the order.

## API Specifications

The OrderController provides several endpoints for managing orders, including endpoints for placing an order, viewing an order summary, and tracking an order.

### Fuel Selection and Supplier Selection

- `GET /api/fuels`: Returns a list of available fuels and their suppliers.

### Fuel Quantity and Unit of Measurement

- `POST /api/orders`: Creates a new order. The request body should include the fuel ID, supplier ID, quantity, and unit of measurement.

### Add to Cart

- `POST /api/carts/{userId}/items`: Adds a fuel item to the user's cart. The request body should include the fuel ID, supplier ID, quantity, and unit of measurement.

### View Cart

- `GET /api/carts/{userId}/items`: Returns a list of items in the user's cart.

### Move to Order

- `POST /api/orders/{userId}`: Moves items from the user's cart to their order.

### Place Order

- `POST /api/orders/{userId}/confirm`: Confirms the user's order. The request body should include the delivery details.

### Order Summary, View Order Items, View Delivery Status, View Delivery Person Details, View Shipping Address, View Cost Breakup, Estimated Delivery Time

- `GET /api/orders/{orderId}`: Returns the details of the specified order, including the order items, delivery status, delivery person details, shipping address, cost breakup, and estimated delivery time.

### Track Order

- `GET /api/orders/{orderId}/track`: Returns the tracking information for the specified order.

## User Interface Designs

The user interface for the Order Module should be intuitive and easy to navigate. Here's a high-level overview of the user flow and the corresponding UI designs for each step:

### Fuel and Supplier Selection

The user starts on a page where they can select the type of fuel they want to order. This could be a dropdown menu or a list of options. Once a fuel type is selected, a list of available suppliers should appear. The user can then select their preferred supplier.

### Fuel Quantity and Unit of Measurement

Once a supplier is selected, the user should be able to enter the quantity of fuel they want to order. This could be done through a simple input field. Next to this field, there should be another dropdown menu for the user to select the unit of measurement.

### Add to Cart

After entering the quantity and selecting the unit of measurement, the user can add the item to their cart by clicking an "Add to Cart" button.

### View Cart

The user can view their cart by navigating to the cart page. This page should list all the items in the cart, along with the quantity and price of each item. There should also be an option to remove items from the cart.

### Move to Order

On the cart page, there should be a "Move to Order" button. Clicking this button should move all items from the cart to the order.

### Place Order

After moving items to the order, the user should be able to enter their delivery details and place the order. This could be done on a separate page or a modal. The user should be able to enter their location and expected delivery time, and then click a "Place Order" button to confirm the order.

### Order Summary

After the order is placed, the user should be redirected to an order summary page. This page should display all the details of the order, including the items, delivery status, delivery person details, shipping address, cost breakdown, and estimated delivery time.

### Track Order

On the order summary page, there should be an option to track the order. This could be a "Track Order" button that, when clicked, shows the real-time progress of the order until it is delivered.

The UI should be designed with user-friendliness in mind, ensuring that all elements are easy to understand and interact with. It should also be responsive, meaning it should look and function well on devices of all sizes.

## Business Rules

- Fuel Selection and Supplier Selection: Users must select a type of fuel and a supplier for that fuel. The system should only allow selection of suppliers that provide the chosen fuel.
- Fuel Quantity and Unit of Measurement: Users must specify the quantity of fuel they wish to order and the unit of measurement for that quantity. The system should validate that the entered quantity is a positive number.
- Add to Cart: When a user adds a fuel item to their cart, the system should update the cart to include the new item.
- Move to Order: When a user moves items from their cart to their order, the system should remove those items from the cart and add them to the order.
- Place Order: When a user places an order, they must provide delivery details. The system should validate these details before confirming the order.
- Automatic Cost Calculation: The total cost of an order should be automatically calculated by the system based on the selected location, time, and fuel amount. This calculation should include any taxes and additional charges.
- Order Confirmation: An order is only confirmed when the user clicks on "Order". Once an order is confirmed, it cannot be modified.
- Order Summary: After an order is placed, the user should be able to view an order summary. This summary should include the items in the order, delivery status, delivery person details, shipping address, cost breakup, and estimated delivery time.
- Track Order: Users should be able to track the progress of their order until it is delivered. The system should update the delivery status as the order progresses.

## Performance Requirements

The Order Module should be able to handle a high volume of orders and updates to order statuses.

## Security Considerations

Users should be authenticated before they can place an order. The delivery details and cost details of an order should be securely stored and transmitted.

## Testing Strategy

The Order Module should be thoroughly tested using unit tests, integration tests, and end-to-end tests.

### Unit Tests

These tests should focus on individual components in isolation. For example, you could write unit tests for the methods in the OrderService class, ensuring that each method correctly performs its intended function.

### Integration Tests

These tests should focus on the interaction between components. For example, you could write integration tests that check whether the OrderController and OrderService correctly work together to place an order and generate an order summary.

### End-to-End Tests

These tests should focus on the entire process of placing an order, from selecting a fuel and supplier to viewing the order summary. They should ensure that the entire process works as expected, including the user interface and any external services.

Here are some specific testing strategies for each functionality:

#### Fuel and Supplier Selection

Test that the system correctly displays available fuels and suppliers, and that users can select a fuel and supplier.

#### Fuel Quantity and Unit of Measurement

Test that users can enter a fuel quantity and select a unit of measurement, and that the system correctly calculates the total quantity of fuel.

#### Add to Cart

Test that users can add items to their cart, and that the cart correctly updates to include the new items.

#### View Cart

Test that users can view the items in their cart, and that the cart correctly displays all added items.

#### Move to Order

Test that users can move items from their cart to their order, and that the order correctly updates to include the new items.

#### Place Order

Test that users can enter delivery details and place an order, and that the system correctly creates a new order with the entered details.

#### Automatic Cost Calculation

Test that the system correctly calculates the total cost of an order based on the selected location, time, and fuel amount.

#### Order Confirmation

Test that users can confirm and place an order, and that the system correctly updates the order status to "Confirmed".

#### Order Summary

Test that users can view an order summary after placing an order, and that the summary correctly displays the order details.

#### Track Order

Test that users can track the progress of their order, and that the system correctly updates and displays the delivery status.

## Deployment Strategy

The Order Module should be deployed as part of the on-demand fuel delivery application. It should be scalable to handle varying loads.

## Error Handling and Logging

Errors in the Order Module should be properly handled and logged for debugging purposes.

## Maintenance and Support

The Order Module should be regularly maintained and updated to ensure it continues to meet user needs and performance requirements.
# Cart Module 

## Overview
The Cart module is responsible for managing the shopping cart in the application. It consists of four main components:

- Cart: This is an entity class that represents a shopping cart in the system. It is mapped to the cart collection in the MongoDB database.
- CartRepository: This is a repository interface that provides methods for accessing the cart collection in the MongoDB database.
- CartController: This is a REST controller that handles HTTP requests related to the shopping cart.
- CartService: This is a service class that provides methods for managing the shopping cart.

## Dependencies
The Cart module has dependencies on several other components and libraries:

- User: Used by Cart to associate a cart with a user.
- FuelItem: Used by Cart to represent the fuel items in the cart.
- CartRepository: Used by CartService for accessing the cart collection in the MongoDB database.
- CartService: Used by CartController for managing the shopping cart.
- org.springframework.data.mongodb.repository.MongoRepository: Used by CartRepository to provide methods for accessing the MongoDB database.
- org.springframework.data.mongodb.core.mapping.Document: Used by Cart to map the Cart class to the cart collection in the MongoDB database.
- org.springframework.data.annotation.Id: Used by Cart to indicate the primary key.
- org.springframework.data.mongodb.core.mapping.DBRef: Used by Cart to indicate a DBRef.
- org.springframework.stereotype.Service: Used by CartService to indicate a service class.
- org.springframework.beans.factory.annotation.Autowired: Used by CartController and CartService for dependency injection.
- org.springframework.web.bind.annotation.*: Used by CartController to map methods to HTTP requests.

## CartController

`CartController` is a REST controller that handles HTTP requests related to the shopping cart. It uses CartService to perform operations related to the cart.

### Endpoints

- `GET /api/cart/{userId}`: Retrieves the cart for the user with the given user ID.

```
/**
 * Retrieves the cart for the user with the given user ID.
 *
 * @param userId The ID of the user.
 * @return A ResponseEntity containing the CartResponse.
 */
@GetMapping("/{userId}")
public ResponseEntity<CartResponse> getCart(@PathVariable String userId) {
    // Call CartService's getCartByUserId method
    // Create a new CartResponse with the cart ID and fuels from the cart
    // Return the CartResponse with an OK status
}
```

- `POST /api/cart/{userId}/addItem`: Adds an item to the cart for the user with the given user ID.

```
/**
 * Adds an item to the cart for the user with the given user ID.
 *
 * @param userId The ID of the user.
 * @param fuelItem The fuel item to be added.
 * @return A ResponseEntity containing the CartResponse.
 */
@PostMapping("/{userId}/addItem")
public ResponseEntity<CartResponse> addItemToCart(@PathVariable String userId, @RequestBody FuelItem fuelItem) {
    // Call CartService's addItemToCart method
    // Create a new CartResponse with the cart ID and fuels from the cart
    // Return the CartResponse with an OK status
}
```

- `DELETE /api/cart/{userId}/removeItem/{fuelItemId}`: Removes an item from the cart for the user with the given user ID.

```
/**
 * Removes an item from the cart for the user with the given user ID.
 *
 * @param userId The ID of the user.
 * @param fuelItemId The ID of the fuel item to be removed.
 * @return A ResponseEntity containing the CartResponse.
 */
@DeleteMapping("/{userId}/removeItem/{fuelItemId}")
public ResponseEntity<CartResponse> removeItemFromCart(@PathVariable String userId, @PathVariable String fuelItemId) {
    // Call CartService's removeItemFromCart method
    // Create a new CartResponse with the cart ID and fuels from the cart
    // Return the CartResponse with an OK status
}
```

### Exception Handler

Handles exceptions that occur during the processing of requests.

```
/**
 * Handles exceptions that occur during the processing of requests.
 *
 * @param ex The exception that occurred.
 * @return A ResponseEntity containing the error response.
 */
@ExceptionHandler({ Exception.class })
public ResponseEntity<Response> handleException(Exception ex) {
    // Create a new Response with the exception message and an INTERNAL_SERVER_ERROR status
    // Return the Response with an INTERNAL_SERVER_ERROR status
}
```

## CartService

- `addItemToCart(String userId, FuelItem fuelItem)`: Adds a fuel item to the cart for the user with the given user ID.

```
/**
 * Adds a fuel item to the cart for the user with the given user ID.
 *
 * @param userId The ID of the user.
 * @param fuelItem The fuel item to add.
 * @return The updated cart.
 */
public Cart addItemToCart(String userId, FuelItem fuelItem) {
    // Retrieve the cart for the user
    // Add the fuel item to the cart
    // Save the updated cart
    // Return the updated cart
}
```

- `removeItemFromCart(String userId, String fuelItemId)`: Removes a fuel item from the cart for the user with the given user ID.

```
/**
 * Removes a fuel item from the cart for the user with the given user ID.
 *
 * @param userId The ID of the user.
 * @param fuelItemId The ID of the fuel item to remove.
 * @return The updated cart.
 */
public Cart removeItemFromCart(String userId, String fuelItemId) {
    // Retrieve the cart for the user
    // Remove the fuel item from the cart
    // Save the updated cart
    // Return the updated cart
}
```

- `getCartByUserId(String userId)`: Retrieves the cart for the user with the given user ID.

```
/**
 * Retrieves the cart for the user with the given user ID.
 *
 * @param userId The ID of the user.
 * @return The cart for the user.
 */
public Cart getCartByUserId(String userId) {
    // Retrieve the cart for the user
    // Return the cart
}
```

- `clearCart(String userId)`:  Clears the cart for the user with the given user ID.

```
/**
 * Clears the cart for the user with the given user ID.
 *
 * @param userId The ID of the user.
 * @return The updated cart.
 */
public Cart clearCart(String userId) {
    // Retrieve the cart for the user
    // Clear the cart
    // Save the updated cart
    // Return the updated cart
}
```
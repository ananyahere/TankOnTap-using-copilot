# Authentication Module 

This document provides an overview of the authentication module in the project. The module is primarily composed of three classes: `AuthService`, `AuthController`, and `JWTUtil`.

## Overview

The authentication module is responsible for handling user registration, authentication, and token management in the application. It consists of three main components:

- AuthController: This is a REST controller that handles HTTP requests related to authentication. It provides endpoints for user registration, user authentication, and setting the user's address.

- AuthService: This is a service class that handles user registration and role initialization. It interacts with the UserRepository, UserService, RoleService, and CartRepository to perform its tasks.

- JWTUtil: This is a utility class that handles JSON Web Token (JWT) operations. It provides methods for extracting information from a JWT, checking if a JWT is expired, generating a JWT, and validating a JWT.

## Dependencies

The authentication module has dependencies on several other components and libraries:

- UserRepository: Used by AuthService for checking if a user with a certain username already exists.

- UserService: Used by AuthService for creating a new user, and by AuthController for saving a user's address.

- RoleService: Used by AuthService for creating roles.

- CartRepository: Used by AuthService for saving a new cart for a user.

- BCryptPasswordEncoder: Used by AuthService for encoding a user's password.

- io.jsonwebtoken.Jwts: Used by JWTUtil for parsing and generating JWTs.

- org.springframework.security.core.userdetails.UserDetails: Used by JWTUtil for generating and validating JWTs.

- jakarta.annotation.PostConstruct: (Commented out in the provided code, but typically used for initializing roles after dependency injection.)

## AuthService

The `AuthService` class is a service class responsible for handling user registration and role initialization.

### Methods

- `initRoles()`: This method initializes two roles, "USER" and "ADMIN", and saves them using the `RoleService`.

```
public void initRoles() {
    // Create "USER" and "ADMIN" roles
    // Save roles using RoleService
}
```

- `registerUser(User user)`: This method registers a new user. It first checks if a user with the same username already exists. If not, it encodes the user's password, saves the new user using the `UserService`, creates a new cart for the user, and saves the new cart using the `CartRepository`. It then returns the saved user.

```
/**
 * Registers a new user.
 * 
 * @param user The user object containing the user's information.
 * @return The saved user object.
 */
public User registerUser(User user) {
    // Check if a user with the same username already exists
    // If not, encode the user's password
    // Save the new user using UserService
    // Create a new cart for the user
    // Save the new cart using CartRepository
    // Return the saved user
}
```

## AuthController

The `AuthController` class is a REST controller that handles HTTP requests related to authentication.

### Endpoints

- `POST /api/auth/register`: This endpoint registers a new user. It accepts a `User` object in the request body and returns the registered user.

```
/**
 * Registers a new user.
 *
 * @param user The user object containing the user's information.
 * @return A ResponseEntity containing the registered user.
 */
@PostMapping("/register")
public ResponseEntity<User> registerUser(@RequestBody User user) {
    // Call AuthService's registerUser method
    // Return the registered user
}
```

- `POST /api/auth/authenticate`: This endpoint authenticates a user. It accepts a `JWTRequest` object in the request body and returns a `JWTResponse` object.

```
/**
 * Authenticates the user and generates a JWT.
 *
 * @param authenticationRequest The authentication request containing user credentials.
 * @return The ResponseEntity containing the JWT response.
 */
@PostMapping("/authenticate")
public ResponseEntity<JWTResponse> createAuthenticationToken(@RequestBody JWTRequest authenticationRequest) {
    // Authenticate the user
    // Generate a JWT
    // Return the JWT
}
```

- `POST /api/auth/setAddress`: This endpoint sets the address for a user. It accepts a user ID as a request parameter and an `Address` object in the request body, and returns the saved address.

```
/**
 * Sets the address for a user.
 * 
 * @param userId The ID of the user.
 * @param address The address to be set.
 * @return The ResponseEntity containing the saved address.
 */
@PostMapping("/setAddress")
public ResponseEntity<Address> setAddress(@RequestParam("userId") Long userId, @RequestBody Address address) {
    // Set the address for the user
    // Return the saved address
}
```

## JWTUtil

The `JWTUtil` class is a utility class responsible for handling JSON Web Token (JWT) operations. It uses the `io.jsonwebtoken.Jwts` class from the `jjwt` library to parse and generate JWTs.

### Methods

- `getUsernameFromToken(String token)`: This method returns the username from a JWT. It uses the `getClaimFromToken` method to extract the subject claim, which contains the username.

```
/**
 * Retrieves the username from the provided token.
 * 
 * @param token The token from which to extract the username.
 * @return The username extracted from the token.
 */
public String getUsernameFromToken(String token) {
    // Use the getClaimFromToken method to extract the subject claim
    // The subject claim contains the username
    // Return the username
    return getClaimFromToken(token, Claims::getSubject);
}
```

- `getClaimFromToken(String token, Function<Claims, T> claimsResolver)`: This method returns a specific claim from a JWT. It uses the `getAllClaimsFromToken` method to extract all claims, and then applies the `claimsResolver` function to get a specific claim.

```
/**
 * Retrieves a specific claim from the given token.
 *
 * @param token The token from which to extract the claim.
 * @param claimsResolver The function to apply to the claims to get the specific claim.
 * @return The specific claim extracted from the token.
 */
public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
    // Use the getAllClaimsFromToken method to extract all claims
    // Apply the claimsResolver function to get a specific claim
    // Return the claim
}
```

- `getAllClaimsFromToken(String token)`: This method returns all claims from a JWT. It uses the `Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody()` method to parse the JWT and extract all claims.

```
/**
 * Retrieves all claims from a given JWT token.
 *
 * @param token The JWT token to parse.
 * @return The Claims object containing all claims from the token.
 */
private Claims getAllClaimsFromToken(String token) {
    // Use the Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody() method to parse the JWT
    // This method returns a Claims object, which contains all claims
    // Return the Claims object
}
```

- `isTokenExpired(String token)`: This method checks if a JWT is expired. It uses the `getExpirationDateFromToken` method to get the expiration date, and then checks if the expiration date is before the current date.

```
/**
 * Checks if a JWT token is expired.
 * 
 * @param token The JWT token to check.
 * @return True if the token is expired, false otherwise.
 */
private Boolean isTokenExpired(String token) {
    // Use the getExpirationDateFromToken method to get the expiration date
    // Check if the expiration date is before the current date
    // Return true if the JWT is expired, false otherwise
}
```

- `getExpirationDateFromToken(String token)`: This method returns the expiration date from a JWT. It uses the `getClaimFromToken` method to extract the expiration claim, which contains the expiration date.

```
/**
 * Retrieves the expiration date from the provided token.
 *
 * @param token The token from which to extract the expiration date.
 * @return The expiration date extracted from the token.
 */
public Date getExpirationDateFromToken(String token) {
    // Use the getClaimFromToken method to extract the expiration claim
    // The expiration claim contains the expiration date
    // Return the expiration date
}
```

- `generateToken(UserDetails userDetails)`: This method generates a JWT for a user. It uses the `Jwts.builder().setSubject(userDetails.getUsername()).setIssuedAt(new Date(System.currentTimeMillis())).setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)).signWith(SignatureAlgorithm.HS256, SECRET_KEY).compact()` method to generate a JWT.

```
/**
 * Generates a JSON Web Token (JWT) for the given user details.
 *
 * @param userDetails The user details used to generate the token.
 * @return The generated JWT.
 */
public String generateToken(UserDetails userDetails) {
    // Use the Jwts.builder().setSubject(userDetails.getUsername()).setIssuedAt(new Date(System.currentTimeMillis())).setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)).signWith(SignatureAlgorithm.HS256, SECRET_KEY).compact() method to generate a JWT
    // The JWT contains the username as the subject, the current date as the issued at date, and the current date plus 10 hours as the expiration date
    // The JWT is signed with the HS256 algorithm and the secret key
    // Return the JWT
}
```

- `validateToken(String token, UserDetails userDetails)`: This method validates a JWT. It checks if the username in the JWT matches the username in the `UserDetails` and if the JWT is not expired.

```
/**
 * Validates the given token against the provided UserDetails.
 * 
 * @param token The token to be validated.
 * @param userDetails The UserDetails object containing user information.
 * @return true if the token is valid and matches the user details, false otherwise.
 */
public Boolean validateToken(String token, UserDetails userDetails) {
    // Use the getClaimFromToken method to extract the subject claim
    // The subject claim contains the username
    // Check if the username in the JWT matches the username in the UserDetails
    // Use the isTokenExpired method to check if the JWT is expired
    // Return true if the username matches and the JWT is not expired, false otherwise
}
```
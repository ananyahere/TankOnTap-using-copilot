# User Entity

The User entity is a part of the domain model of the application and represents a user in the system. It is mapped to the user collection in the MongoDB database.

## Class Definition

```
/**
 * Represents a user in the system.
 */
@Document(collection = "user")
public class User {
    // Fields and methods...
}
```

### Fields

The User entity has the following fields:

- `userId`: A unique identifier for the user. It is annotated with `@Id` to indicate that it is the primary key.
- `name`: The name of the user.
- `email`: The email address of the user.
- `city`: The city where the user lives.
- `addresses`: A list of Address objects representing the user's addresses.
- `vehicles`: A list of Vehicle objects representing the user's vehicles.
- `paymentModes`: A list of strings representing the user's payment modes.
- `username`: The username of the user.
- `password`: The password of the user.
- `roles`: A set of Role objects representing the user's roles. It is annotated with `@DBRef` to indicate that it is a DBRef.

### Constructor

The User entity has a constructor that takes the `userId`, `name`, `email`, `city`, `addresses`, `vehicles`, and `paymentModes` as parameters.

### Getters and Setters

The User entity has getters and setters for all its fields.

### toString Method

The User entity overrides the `toString` method to return a string representation of the user.
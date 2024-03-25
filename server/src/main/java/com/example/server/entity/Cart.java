package com.example.server.entity;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Document(collection = "cart")
public class Cart {
    @Id
    private String cartId;

    @DBRef
    private User user;

    private List<FuelItem> fuels;

    // Constructors, getters, and setters

    /**
     * Default constructor for the Cart class.
     */
    public Cart() {
    }

    /**
     * Constructor for the Cart class with parameters.
     *
     * @param cartId The ID of the cart.
     * @param user The user associated with the cart.
     * @param fuels The list of fuel items in the cart.
     */
    public Cart(String cartId, User user, List<FuelItem> fuels) {
        this.cartId = cartId;
        this.user = user;
        this.fuels = fuels;
    }

    /**
     * Retrieves the ID of the cart.
     *
     * @return The cart ID.
     */
    public String getCartId() {
        return cartId;
    }

    /**
     * Sets the ID of the cart.
     *
     * @param cartId The cart ID to set.
     */
    public void setCartId(String cartId) {
        this.cartId = cartId;
    }

    /**
     * Retrieves the user associated with the cart.
     *
     * @return The user object.
     */
    public User getUser() {
        return user;
    }

    /**
     * Sets the user associated with the cart.
     *
     * @param user The user object to set.
     */
    public void setUser(User user) {
        this.user = user;
    }

    /**
     * Retrieves the list of fuel items in the cart.
     *
     * @return The list of fuel items.
     */
    public List<FuelItem> getFuels() {
        return fuels;
    }

    /**
     * Sets the list of fuel items in the cart.
     *
     * @param fuels The list of fuel items to set.
     */
    public void setFuels(List<FuelItem> fuels) {
        this.fuels = fuels;
    }
}







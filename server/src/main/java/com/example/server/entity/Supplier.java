package com.example.server.entity;

public class Supplier {
    private String name;
    private String contactNumber;
    private String email;

    /**
     * Constructs a Supplier object with the specified name, contact number, and email.
     * 
     * @param name           the name of the supplier
     * @param contactNumber  the contact number of the supplier
     * @param email          the email of the supplier
     */
    public Supplier(String name, String contactNumber, String email) {
        this.name = name;
        this.contactNumber = contactNumber;
        this.email = email;
    }

    /**
     * Returns the name of the supplier.
     * 
     * @return the name of the supplier
     */
    public String getName() {
        return name;
    }

    /**
     * Sets the name of the supplier.
     * 
     * @param name  the name of the supplier
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Returns the contact number of the supplier.
     * 
     * @return the contact number of the supplier
     */
    public String getContactNumber() {
        return contactNumber;
    }

    /**
     * Sets the contact number of the supplier.
     * 
     * @param contactNumber  the contact number of the supplier
     */
    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    /**
     * Returns the email of the supplier.
     * 
     * @return the email of the supplier
     */
    public String getEmail() {
        return email;
    }

    /**
     * Sets the email of the supplier.
     * 
     * @param email  the email of the supplier
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * Returns a string representation of the Supplier object.
     * 
     * @return a string representation of the Supplier object
     */
    @Override
    public String toString() {
        return "Supplier{" +
                "name='" + name + '\'' +
                ", contactNumber='" + contactNumber + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}

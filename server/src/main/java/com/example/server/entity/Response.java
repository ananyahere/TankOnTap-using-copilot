package com.example.server.entity;

public class Response {
    private Object data;
    private String message;
    private int statusCode;

    /**
     * Constructs a new Response object with the specified data, message, and status code.
     *
     * @param data       the data to be encapsulated in the response
     * @param message    the message to be included in the response
     * @param statusCode the status code of the response
     */
    public Response(Object data, String message, int statusCode) {
        this.data = data;
        this.message = message;
        this.statusCode = statusCode;
    }

    /**
     * Returns the data encapsulated in the response.
     *
     * @return the data encapsulated in the response
     */
    public Object getData() {
        return data;
    }

    /**
     * Sets the data to be encapsulated in the response.
     *
     * @param data the data to be encapsulated in the response
     */
    public void setData(Object data) {
        this.data = data;
    }

    /**
     * Returns the message included in the response.
     *
     * @return the message included in the response
     */
    public String getMessage() {
        return message;
    }

    /**
     * Sets the message to be included in the response.
     *
     * @param message the message to be included in the response
     */
    public void setMessage(String message) {
        this.message = message;
    }

    /**
     * Returns the status code of the response.
     *
     * @return the status code of the response
     */
    public int getStatusCode() {
        return statusCode;
    }

    /**
     * Sets the status code of the response.
     *
     * @param statusCode the status code of the response
     */
    public void setStatusCode(int statusCode) {
        this.statusCode = statusCode;
    }
}




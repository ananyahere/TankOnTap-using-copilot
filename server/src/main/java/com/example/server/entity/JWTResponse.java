package com.example.server.entity;

public class JWTResponse {
    private User user;
    private String jwtToken;

    public JWTResponse(User user, String jwtToken) {
        this.user = user;
        this.jwtToken = jwtToken;
    }

    public User getUser() {
        return user;
    }

    public String getJwtToken() {
        return jwtToken;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setJwtToken(String jwtToken) {
        this.jwtToken = jwtToken;
    }
}

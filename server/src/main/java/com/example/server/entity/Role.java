package com.example.server.entity;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "role")
public class Role {
    private String title;
    private String description;
    
    public Role(String title, String description) {
        this.title = title;
        this.description = description;
    }
    
    // Getters and setters for title and description
    
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
}

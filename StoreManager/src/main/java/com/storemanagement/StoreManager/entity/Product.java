package com.storemanagement.StoreManager.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;


@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    
    private String name;
    private String description;
    private Double costPrice;
    private Double sellingPrice;
    private long stockQuantity;
    private long longermediateWarningQuantity;
    private long alertQuantity;
    private String imageUrl;
    
    public Double getCostPrice() {
        return costPrice;
    }
    
    public void setCostPrice(Double costPrice) {
        this.costPrice = costPrice;
    }
    
    public long getAlertQuantity() {
        return alertQuantity;
    }
    
    public void setAlertQuantity(long alertQuantity) {
        this.alertQuantity = alertQuantity;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public long getId() {
        return id;
    }
    
    public void setId(long id) {
        this.id = id;
    }
    
    public String getImageUrl() {
        return imageUrl;
    }
    
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
    
    public long getlongermediateWarningQuantity() {
        return longermediateWarningQuantity;
    }
    
    public void setlongermediateWarningQuantity(long longermediateWarningQuantity) {
        this.longermediateWarningQuantity = longermediateWarningQuantity;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public Double getSellingPrice() {
        return sellingPrice;
    }
    
    public void setSellingPrice(Double sellingPrice) {
        this.sellingPrice = sellingPrice;
    }
    
    public long getStockQuantity() {
        return stockQuantity;
    }
    
    public void setStockQuantity(long stockQuantity) {
        this.stockQuantity = stockQuantity;
    }
}

package com.storemanagement.StoreManager.entity;
import jakarta.persistence.*;
import java.time.LocalDateTime;

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
    private long intermediateWarningQuantity;
    private long alertQuantity;
    private String imagePath; // Apenas o nome da imagem será salvo
    private LocalDateTime createdAt;
    
    public Product() {
        this.createdAt = LocalDateTime.now();
    }
    

    public long getId() {
        return id;
    }
    
    public void setId(long id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public Double getCostPrice() {
        return costPrice;
    }
    
    public void setCostPrice(Double costPrice) {
        this.costPrice = costPrice;
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
    
    public long getIntermediateWarningQuantity() {
        return intermediateWarningQuantity;
    }
    
    public void setIntermediateWarningQuantity(long intermediateWarningQuantity) {
        this.intermediateWarningQuantity = intermediateWarningQuantity;
    }
    
    public long getAlertQuantity() {
        return alertQuantity;
    }
    
    public void setAlertQuantity(long alertQuantity) {
        this.alertQuantity = alertQuantity;
    }
    
    public String getImagePath() {
        return imagePath;
    }
    
    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}

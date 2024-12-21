package com.storemanagement.StoreManager.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
public class SaleItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    
    @ManyToOne
    private Product product;
    
    private long quantity;
    
    public SaleItem(Product product, long quantity) {
        this.product = product;
        this.quantity = quantity;
    }
    public SaleItem(long id,Product product, long quantity) {
        this.id = id;
        this.product = product;
        this.quantity = quantity;
    }
    
    public long getId() {
        return id;
    }
    
    public void setId(long id) {
        this.id = id;
    }
    
    public Product getProduct() {
        return product;
    }
    
    public void setProduct(Product product) {
        this.product = product;
    }
    
    public long getQuantity() {
        return quantity;
    }
    
    public void setQuantity(long quantity) {
        this.quantity = quantity;
    }
}

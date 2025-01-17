package com.storemanagement.StoreManager.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Entity
public class Sale {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    
    @OneToMany(mappedBy = "sale", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SaleItem> items;
    
    private Double discount;
    
    private LocalDateTime saleDate;
    
    @PrePersist
    public void prePersist() {
        this.saleDate = LocalDateTime.now();
    }
    
    public List<SaleItem> getItems() {
        return items;
    }
    
    public void setItems(List<SaleItem> items) {
        this.items = items;
        if (items != null) {
            items.forEach(item -> item.setSale(this));
        }
    }
    
    public long getId() {
        return id;
    }
    
    public void setId(long id) {
        this.id = id;
    }
    
    public Double getDiscount() {
        return discount != null ? discount : 0;
    }
    
    public void setDiscount(Double discount) {
        this.discount = discount;
    }
    
    public LocalDateTime getSaleDate() {
        return saleDate;
    }
    
    public void setSaleDate(LocalDateTime saleDate) {
        this.saleDate = saleDate;
    }
}

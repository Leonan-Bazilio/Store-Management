package com.storemanagement.StoreManager.dto;

import com.storemanagement.StoreManager.entity.Sale;
import com.storemanagement.StoreManager.entity.SaleItem;

import jakarta.persistence.OneToMany;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class ResSaleDTO {
   
    private long id;
    private List<ResSaleItemDTO> items;
    private LocalDateTime saleDate;
    
    public ResSaleDTO(Sale sale) {
        setItems( sale.getItems());
        setId(  sale.getId());
        setSaleDate( sale.getSaleDate());
    }
    
    public LocalDateTime getSaleDate() {
        return saleDate;
    }
    
    public void setSaleDate(LocalDateTime saleDate) {
        this.saleDate = saleDate;
    }
    
    public List<ResSaleItemDTO> getItems() {
        return items;
    }
    
    public void setItems(List<SaleItem> items) {
        
        this.items = items.stream().map(item->
                new ResSaleItemDTO(item.getProduct(),item.getQuantity())).toList();
    }
    
    public long getId() {
        return id;
    }
    
    public void setId(long id) {
        this.id = id;
    }
}

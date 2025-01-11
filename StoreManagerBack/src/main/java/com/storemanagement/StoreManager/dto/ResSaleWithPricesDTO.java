package com.storemanagement.StoreManager.dto;

import com.storemanagement.StoreManager.entity.Sale;
import com.storemanagement.StoreManager.entity.SaleItem;

import java.time.LocalDateTime;
import java.util.List;

public class ResSaleWithPricesDTO {
    private long id;
    private List<ItemWithPriceDTO> items;
    private LocalDateTime saleDate;
    private Double discount;
    private Double totalPrice;
    public ResSaleWithPricesDTO(Sale sale) {
        setItems( sale.getItems());
        setId(  sale.getId());
        setSaleDate( sale.getSaleDate());
        setDiscount(sale.getDiscount());
        setTotalPrice();
    }
    
    public LocalDateTime getSaleDate() {
        return saleDate;
    }
    
    public void setSaleDate(LocalDateTime saleDate) {
        this.saleDate = saleDate;
    }
    
    public List<ItemWithPriceDTO> getItems() {
        return items;
    }
    
    public void setItems(List<SaleItem> items) {
        this.items = items.stream().map(item->
                new ItemWithPriceDTO(item)).toList();
    }
    
    public long getId() {
        return id;
    }
    
    public void setId(long id) {
        this.id = id;
    }
    
    public Double getDiscount() {
        return discount;
    }
    
    public void setDiscount(Double discount) {
        this.discount = discount;
    }
    
    public Double getTotalPrice() {
        return totalPrice;
    }
    public void setTotalPrice() {
        
        double total= this.items.stream()
                .mapToDouble(ItemWithPriceDTO::getSubTotal)
                .sum();
        this.totalPrice =total-discount;
    }
}

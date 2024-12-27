package com.storemanagement.StoreManager.dto;

import com.storemanagement.StoreManager.entity.Sale;
import com.storemanagement.StoreManager.entity.SaleItem;

import java.time.LocalDateTime;
import java.util.List;

public class ResSaleWithPricesDTO {
    private long id;
    private List<ItemWithPriceDTO> items;
    private LocalDateTime saleDate;
    private Double totalPrice;
    public ResSaleWithPricesDTO(Sale sale) {
        setItems( sale.getItems());
        setId(  sale.getId());
        setSaleDate( sale.getSaleDate());
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
                new ItemWithPriceDTO(item.getProduct(),item.getQuantity())).toList();
    }
    
    public long getId() {
        return id;
    }
    
    public void setId(long id) {
        this.id = id;
    }
    
    public Double getTotalPrice() {
        return totalPrice;
    }
    public void setTotalPrice() {
        this.totalPrice = this.items.stream()
                .mapToDouble(ItemWithPriceDTO::getSubTotal)
                .sum();
    }
}

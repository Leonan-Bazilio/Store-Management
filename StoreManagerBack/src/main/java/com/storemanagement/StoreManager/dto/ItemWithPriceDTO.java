package com.storemanagement.StoreManager.dto;

import com.storemanagement.StoreManager.entity.Product;

public class ItemWithPriceDTO {
    private Product product;
    private long quantity;
    private double subTotal;
    
    public ItemWithPriceDTO(Product product, long quantity) {
        this.product = product;
        this.quantity = quantity;
        this.subTotal =product.getSellingPrice()*quantity;
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
    
    public double getSubTotal() {
        return subTotal;
    }
    
    public void setSubTotal(double subTotal) {
        this.subTotal = subTotal;
    }
}
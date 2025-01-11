package com.storemanagement.StoreManager.dto;

import com.storemanagement.StoreManager.entity.Product;
import com.storemanagement.StoreManager.entity.Sale;
import com.storemanagement.StoreManager.entity.SaleItem;

public class ItemWithPriceDTO {
    private Product product;
    private long quantity;
    private double subTotal;
    
    public ItemWithPriceDTO(SaleItem item) {
        setProduct(item.getProduct());
        setQuantity(item.getQuantity());
        setSubTotal(item.getProduct().getSellingPrice(),item.getQuantity());
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
    
    public void setSubTotal(double sellingPrice, long quantity) {
        this.subTotal = sellingPrice*quantity;
    }
}

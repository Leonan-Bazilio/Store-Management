package com.storemanagement.StoreManager.exception;

public class InsufficientStockException extends BusinessException {
    public InsufficientStockException(String productName) {
        super("Insufficient stock for product: " + productName);
    }
}

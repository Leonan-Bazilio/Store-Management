package com.storemanagement.StoreManager.exception;

public class ProductNotFoundException extends BusinessException {
    public ProductNotFoundException(long id) {
        super("Product with ID " + id + " not found.");
    }
}

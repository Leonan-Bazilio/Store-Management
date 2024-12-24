package com.storemanagement.StoreManager.dto;

public class ReqSaleItemDTO {
    private long id;
    private long quantity;

    public ReqSaleItemDTO(long id, long quantity) {
        this.id = id;
        this.quantity = quantity;
    }

    public long getQuantity() {
        return quantity;
    }

    public void setQuantity(long quantity) {
        this.quantity = quantity;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
}

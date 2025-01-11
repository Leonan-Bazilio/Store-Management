package com.storemanagement.StoreManager.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class ReqSaleDTO {
    
    @JsonProperty("items")
    private List<ReqSaleItemDTO> listItemsDTO;
    private Double discount;
    
    public ReqSaleDTO(List<ReqSaleItemDTO> listItemsDTO, Double discount) {
        this.listItemsDTO = listItemsDTO;
        this.discount = discount;
    }
    
    public List<ReqSaleItemDTO> getListItemsDTO() {
        return listItemsDTO;
    }
    
    public void setListItemsDTO(List<ReqSaleItemDTO> listItemsDTO) {
        this.listItemsDTO = listItemsDTO;
    }
    
    public Double getDiscount() {
        return discount;
    }
    
    public void setDiscount(Double discount) {
        this.discount = discount;
    }
}

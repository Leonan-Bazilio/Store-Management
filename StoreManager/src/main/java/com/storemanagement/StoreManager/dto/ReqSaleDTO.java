package com.storemanagement.StoreManager.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class ReqSaleDTO {
    
    @JsonProperty("items")
    List<ReqSaleItemDTO> reqSaleItemDTOList;
    
    public ReqSaleDTO(List<ReqSaleItemDTO> reqSaleItemDTOList) {
        this.reqSaleItemDTOList = reqSaleItemDTOList;
    }
    
    public List<ReqSaleItemDTO> getReqSaleItemDTOList() {
        return reqSaleItemDTOList;
    }
    
    public void setReqSaleItemDTOList(List<ReqSaleItemDTO> reqSaleItemDTOList) {
        this.reqSaleItemDTOList = reqSaleItemDTOList;
    }
}

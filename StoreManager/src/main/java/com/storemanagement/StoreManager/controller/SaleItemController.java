package com.storemanagement.StoreManager.controller;

import com.storemanagement.StoreManager.dto.ReqSaleItemDTO;
import com.storemanagement.StoreManager.dto.ResSaleItemDTO;
import com.storemanagement.StoreManager.entity.SaleItem;
import com.storemanagement.StoreManager.service.SaleItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/saleItem")
public class SaleItemController {
    @Autowired
    private SaleItemService saleService;
    
    
    @GetMapping
    public ResponseEntity<List<SaleItem>> findAll() {
        return ResponseEntity.ok(saleService.findAllSaleItem());
    }
    
    @PostMapping
    public ResponseEntity<ResSaleItemDTO> registerSale(@RequestBody ReqSaleItemDTO sale) {
        return ResponseEntity.ok(saleService.createSaleItem(sale));
    }
}
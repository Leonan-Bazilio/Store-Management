package com.storemanagement.StoreManager.controller;

import com.storemanagement.StoreManager.dto.ReqSaleItemDTO;
import com.storemanagement.StoreManager.dto.ResSaleDTO;
import com.storemanagement.StoreManager.entity.Sale;
import com.storemanagement.StoreManager.service.SaleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sales")
public class SaleController {
    private final SaleService saleService;

    public SaleController(SaleService saleService) {
        this.saleService = saleService;
    }

    @GetMapping
    public ResponseEntity<List<Sale>> findAll() {
        return ResponseEntity.ok(saleService.findAll());
    }

    @PostMapping
    public ResponseEntity<Sale> registerSale(@RequestBody List<ReqSaleItemDTO> sale) {
        return ResponseEntity.ok(saleService.registerSale(sale));
    }
}

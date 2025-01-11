package com.storemanagement.StoreManager.controller;

import com.storemanagement.StoreManager.dto.ReqSaleDTO;
import com.storemanagement.StoreManager.dto.ReqSaleItemDTO;
import com.storemanagement.StoreManager.dto.ResSaleDTO;
import com.storemanagement.StoreManager.dto.ResSaleWithPricesDTO;
import com.storemanagement.StoreManager.entity.Sale;
import com.storemanagement.StoreManager.service.SaleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sales")
public class SaleController {
    private final SaleService saleService;

    public SaleController(SaleService saleService) {
        this.saleService = saleService;
    }

    @GetMapping
    public ResponseEntity<List<ResSaleDTO>> findAll() {
        return ResponseEntity.ok(saleService.findAllSales());
    }
    @GetMapping("/prices")
    public ResponseEntity<List<ResSaleWithPricesDTO>> findAllSalesWithPrices() {
        return ResponseEntity.ok(saleService.findAllSalesWithPrices());
    }

    @PostMapping
    public ResponseEntity<ResSaleDTO> registerSale(@RequestBody ReqSaleDTO sale) {
        return ResponseEntity.ok(saleService.registerSale(sale));
    }
}

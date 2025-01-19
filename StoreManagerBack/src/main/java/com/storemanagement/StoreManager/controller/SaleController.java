package com.storemanagement.StoreManager.controller;

import com.storemanagement.StoreManager.dto.ReqSaleDTO;
import com.storemanagement.StoreManager.dto.ReqSaleItemDTO;
import com.storemanagement.StoreManager.dto.ResSaleDTO;
import com.storemanagement.StoreManager.dto.ResSaleWithPricesDTO;
import com.storemanagement.StoreManager.entity.Sale;
import com.storemanagement.StoreManager.entity.SaleItem;
import com.storemanagement.StoreManager.service.SaleItemService;
import com.storemanagement.StoreManager.service.SaleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/sales")
public class SaleController {
    private final SaleService saleService;
    private final SaleItemService saleItemService;
    public SaleController(SaleService saleService, SaleItemService saleItemService) {
        this.saleService = saleService;
        this.saleItemService = saleItemService;
    }
    @GetMapping("teste")
    public ResponseEntity<List<SaleItem>> findAllsaleItem() {
        return ResponseEntity.ok(saleItemService.findAllSaleItems());
    }

    @GetMapping
    public ResponseEntity<List<ResSaleDTO>> findAll() {
        return ResponseEntity.ok(saleService.findAllSales());
    }
    @GetMapping("/prices")
    public ResponseEntity<List<ResSaleWithPricesDTO>> findAllSalesWithPrices() {
        return ResponseEntity.ok(saleService.findAllSalesWithPrices());
    }
    @GetMapping("/{id}")
    public Optional<Sale> findSaleById(@PathVariable long id) {
        Optional<Sale> sale =saleService.findSaleById(id);
        return sale;
    }

    @PostMapping
    public ResponseEntity<ResSaleDTO> registerSale(@RequestBody ReqSaleDTO sale) {
        return ResponseEntity.ok(saleService.registerSale(sale));
    }
}

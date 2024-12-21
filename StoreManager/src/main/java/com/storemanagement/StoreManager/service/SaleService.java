package com.storemanagement.StoreManager.service;

import com.storemanagement.StoreManager.dto.ReqSaleDTO;
import com.storemanagement.StoreManager.dto.ReqSaleItemDTO;
import com.storemanagement.StoreManager.dto.ResSaleDTO;
import com.storemanagement.StoreManager.dto.ResSaleItemDTO;
import com.storemanagement.StoreManager.entity.Product;
import com.storemanagement.StoreManager.entity.Sale;
import com.storemanagement.StoreManager.entity.SaleItem;
import com.storemanagement.StoreManager.exception.InsufficientStockException;
import com.storemanagement.StoreManager.repository.SaleRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class SaleService {
    private final SaleRepository saleRepository;
    private final ProductService productService;
    private final SaleItemService saleItemService;
    
    public SaleService(SaleRepository saleRepository, ProductService productService, SaleItemService saleItemService) {
        this.saleRepository = saleRepository;
        this.productService = productService;
        this.saleItemService =saleItemService;
    }
    
    @Transactional
    public ResSaleDTO registerSale(List<ReqSaleItemDTO> sale) {
        List<SaleItem> resItems = saleItemService.createSaleItemAll(sale);
        Sale newSale = new Sale();
        newSale.setItems(resItems);
        //tenho que criar as verificaçoes se a quantidade do produto esta disponivel e diminir a quantidade em stock apos a venda da certo
        Sale savedSale = saleRepository.save(newSale);
        return new ResSaleDTO(savedSale);
    }
    
    
    
    public List<Sale> findAll() {
        return saleRepository.findAll();
    }
    
}

package com.storemanagement.StoreManager.service;


import com.storemanagement.StoreManager.dto.ReqSaleDTO;
import com.storemanagement.StoreManager.dto.ReqSaleItemDTO;
import com.storemanagement.StoreManager.dto.ResSaleDTO;
import com.storemanagement.StoreManager.dto.ResSaleWithPricesDTO;
import com.storemanagement.StoreManager.entity.Sale;
import com.storemanagement.StoreManager.entity.SaleItem;
import com.storemanagement.StoreManager.repository.SaleRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class SaleService {
    private final SaleRepository saleRepository;
    private final SaleItemService saleItemService;

    public SaleService(SaleRepository saleRepository,SaleItemService saleItemService) {
        this.saleRepository = saleRepository;
        this.saleItemService =saleItemService;
    }
    
    public List<ResSaleDTO> findAllSales() {
        List<Sale> sales =saleRepository.findAll();
        return sales.stream().map(ResSaleDTO::new).toList();
    }
    
    public List<ResSaleWithPricesDTO> findAllSalesWithPrices() {
        List<Sale> sales =saleRepository.findAll();
        return sales.stream().map(ResSaleWithPricesDTO::new).toList();
    }
    public Optional<Sale> findSaleById( long saleId) {
        Optional<Sale> sale =saleRepository.findById(saleId);
        return sale;
    }
    
    
    @Transactional
    public ResSaleDTO registerSale(ReqSaleDTO sale) {
        List<SaleItem> resItems = saleItemService.createSaleItemAll(sale.getListItemsDTO());
        Sale newSale = new Sale();
        newSale.setItems(resItems);
        newSale.setDiscount(sale.getDiscount());
        Sale savedSale = saleRepository.save(newSale);
        
        return new ResSaleDTO(savedSale);
    }
    
    @Transactional
    public ResSaleDTO updateSale(ReqSaleDTO sale, long id) {
        Optional<Sale> saleData= findSaleById(id);
        List<SaleItem> resItems = saleItemService.createSaleItemAll(sale.getListItemsDTO());
        Sale newSale = new Sale();
        newSale.setItems(resItems);
        newSale.setDiscount(sale.getDiscount());
        Sale savedSale = saleRepository.save(newSale);
        
        return new ResSaleDTO(savedSale);
    }
    

}

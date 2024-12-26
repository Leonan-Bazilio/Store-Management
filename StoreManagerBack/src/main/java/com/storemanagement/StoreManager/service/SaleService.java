package com.storemanagement.StoreManager.service;


import com.storemanagement.StoreManager.dto.ReqSaleItemDTO;
import com.storemanagement.StoreManager.dto.ResSaleDTO;
import com.storemanagement.StoreManager.entity.Sale;
import com.storemanagement.StoreManager.entity.SaleItem;
import com.storemanagement.StoreManager.repository.SaleRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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
    
    @Transactional
    public ResSaleDTO registerSale(List<ReqSaleItemDTO> saleItemDTOList) {
        List<SaleItem> resItems = saleItemService.createSaleItemAll(saleItemDTOList);
        Sale newSale = new Sale();
        newSale.setItems(resItems);
        Sale savedSale = saleRepository.save(newSale);
        
        return new ResSaleDTO(savedSale);
    }

    

}

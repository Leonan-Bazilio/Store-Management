package com.storemanagement.StoreManager.service;

import com.storemanagement.StoreManager.dto.ReqSaleItemDTO;
import com.storemanagement.StoreManager.dto.ResSaleItemDTO;
import com.storemanagement.StoreManager.entity.Product;
import com.storemanagement.StoreManager.entity.SaleItem;
import com.storemanagement.StoreManager.repository.SaleItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SaleItemService {
    
    @Autowired
    SaleItemRepository saleItemRepository;
    
    @Autowired
    ProductService productService;
    
    public List<SaleItem> findAllSaleItem(){
        return saleItemRepository.findAll();
    }
    
    public ResSaleItemDTO createSaleItem(ReqSaleItemDTO item){
        SaleItem saleItem = formatedSaleItem(item);
        SaleItem savedSaleItem = saleItemRepository.save(saleItem);
        return new ResSaleItemDTO(savedSaleItem.getProduct(),savedSaleItem.getQuantity());
    }
    public List<SaleItem> createSaleItemAll(List<ReqSaleItemDTO> items){
        List<SaleItem> saleItemList = items.stream().map(this::formatedSaleItem).toList();
        
        return saleItemRepository.saveAll(saleItemList);
    }
    public SaleItem formatedSaleItem(ReqSaleItemDTO item){
        Product product = productService.findById(item.getId());
        return new SaleItem(product,item.getQuantity());
    }
}

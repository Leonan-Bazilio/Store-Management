package com.storemanagement.StoreManager.service;

import com.storemanagement.StoreManager.dto.ReqSaleItemDTO;
import com.storemanagement.StoreManager.entity.Product;
import com.storemanagement.StoreManager.entity.SaleItem;
import com.storemanagement.StoreManager.repository.SaleItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class SaleItemService {

    @Autowired
    SaleItemRepository saleItemRepository;

    @Autowired
    ProductService productService;

    @Transactional
    public List<SaleItem> createSaleItemAll(List<ReqSaleItemDTO> items){
        productService.decreaseProductListAndSave(items);
        List<SaleItem> saleItemList = items.stream().map(this::formatedSaleItem).toList();

        return saleItemRepository.saveAll(saleItemList);
    }
    public SaleItem formatedSaleItem(ReqSaleItemDTO item){
        Product product = productService.getProductById(item.getId());
        return new SaleItem(product,item.getQuantity());
    }
}

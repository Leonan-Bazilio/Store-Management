package com.storemanagement.StoreManager.service;

import com.storemanagement.StoreManager.dto.ReqSaleItemDTO;
import com.storemanagement.StoreManager.entity.Product;
import com.storemanagement.StoreManager.exception.InsufficientStockException;
import com.storemanagement.StoreManager.exception.ProductNotFoundException;
import com.storemanagement.StoreManager.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }
    
    public List<Product> findAll() {
        return productRepository.findAll();
    }
    
    public Product findById(long id) {
        return productRepository.findById(id).orElseThrow(() -> new ProductNotFoundException(id));
    }
    
    @Transactional
    public Product save(Product product) {
        return productRepository.save(product);
    }
    
    @Transactional
    public void delete(long id) {
        Product product = findById(id);
        productRepository.delete(product);
    }
    
    @Transactional
    public void decreaseProductListAndSave(List<ReqSaleItemDTO> items){
        List<Product> productList = items.stream().map(this::decreaseProduct).toList();
        productRepository.saveAll(productList);
    }
    @Transactional
    public Product decreaseProduct(ReqSaleItemDTO item){
        Product product = findById(item.getId());
        if(product.getStockQuantity()-item.getQuantity() >= 0) {
            product.setStockQuantity(product.getStockQuantity() - item.getQuantity());
            return product;
        }else{
            throw new InsufficientStockException(product.getName());
        }
    }
}

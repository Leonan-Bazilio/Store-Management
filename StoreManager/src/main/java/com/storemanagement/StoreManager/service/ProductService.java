package com.storemanagement.StoreManager.service;

import com.storemanagement.StoreManager.entity.Product;
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
}

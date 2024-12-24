package com.storemanagement.StoreManager.service;

import com.storemanagement.StoreManager.dto.ReqSaleItemDTO;
import com.storemanagement.StoreManager.entity.Product;
import com.storemanagement.StoreManager.exception.InsufficientStockException;
import com.storemanagement.StoreManager.exception.ProductNotFoundException;
import com.storemanagement.StoreManager.repository.ProductRepository;
import com.storemanagement.StoreManager.utils.ImageHandler;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.util.List;

@Service
public class ProductService {
    
    
    
    private final ProductRepository productRepository;
    private final ImageHandler imageHandler;
    
    public ProductService(ProductRepository productRepository,ImageHandler imageHandler) {
        this.productRepository = productRepository;
        this.imageHandler =imageHandler;
    }
    
    
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
    
    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(()-> new ProductNotFoundException(id));
    }
    @Transactional
    public Product createProduct(Product product, MultipartFile image) throws IOException {
        
        String fileName = imageHandler.saveImage(image);
        product.setImagePath(fileName);
        return productRepository.save(product);
        
    }
    @Transactional
    public Product updateProduct(Long id, Product productDetails, MultipartFile image) throws IOException {
        Product product = productRepository.findById(id).orElseThrow(() -> new RuntimeException("Produto não encontrado"));
        
        if (image != null) {
            String fileName = imageHandler.saveImage(image);
            
            product.setImagePath(fileName);
        }
        
        product.setName(productDetails.getName());
        product.setDescription(productDetails.getDescription());
        product.setCostPrice(productDetails.getCostPrice());
        product.setSellingPrice(productDetails.getSellingPrice());
        product.setStockQuantity(productDetails.getStockQuantity());
        product.setIntermediateWarningQuantity(productDetails.getIntermediateWarningQuantity());
        product.setAlertQuantity(productDetails.getAlertQuantity());
        
        return productRepository.save(product);
    }
    @Transactional
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
    @Transactional
    public void decreaseProductListAndSave(List<ReqSaleItemDTO> items){
        List<Product> productList = items.stream().map(this::decreaseProduct).toList();
        productRepository.saveAll(productList);
    }
    @Transactional
    public Product decreaseProduct(ReqSaleItemDTO item){
        Product product = getProductById(item.getId());
        if(product.getStockQuantity()-item.getQuantity() >= 0) {
            product.setStockQuantity(product.getStockQuantity() - item.getQuantity());
            return product;
        }else{
            throw new InsufficientStockException(product.getName());
        }
    }
}




















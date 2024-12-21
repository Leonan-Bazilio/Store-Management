package com.storemanagement.StoreManager.repository;

import com.storemanagement.StoreManager.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}

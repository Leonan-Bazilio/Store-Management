package com.storemanagement.StoreManager.repository;

import com.storemanagement.StoreManager.entity.Sale;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SaleRepository extends JpaRepository<Sale, Long> {
}

package com.storemanagement.StoreManager.repository;

import com.storemanagement.StoreManager.entity.SaleItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SaleItemRepository extends JpaRepository<SaleItem ,Long > {
}
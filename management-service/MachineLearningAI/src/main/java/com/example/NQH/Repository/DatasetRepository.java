package com.example.NQH.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.NQH.Entity.DatasetEntity;

public interface DatasetRepository extends JpaRepository<DatasetEntity, Long>{
	
}

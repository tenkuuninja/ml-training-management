package com.example.NQH.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.NQH.Entity.DatasetEntity;
@Repository
public interface DatasetRepository extends JpaRepository<DatasetEntity, Long>{	
	
}

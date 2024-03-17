package com.example.NQH.Entity;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity

public class ModelEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	float bestTestLoss ;
	
	float bestTraingingLoss;
	
	@ManyToOne
    @JoinColumn(name = "CSV_id", nullable = false)
	private CSVEntity CSV;
	
	@OneToMany(mappedBy = "CSV")
	private List<EvaluationEntity> evaluations;
}

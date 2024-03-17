package com.example.NQH.Entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ModelEntity extends BaseEntity{

	private String name;
	
	private String linkModel;
	
	private double bestTestLoss ;
	
	private double bestTraingingLoss;
	
	@ManyToOne
    @JoinColumn(name = "CSV_id", nullable = false)
	private CSVEntity CSV;
	
	@OneToMany(mappedBy = "model", cascade = CascadeType.ALL)
	private List<EvaluationEntity> evaluations;
}

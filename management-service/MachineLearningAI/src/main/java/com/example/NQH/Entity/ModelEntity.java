package com.example.NQH.Entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	String linkModel;
	
	float bestTestLoss ;
	
	float bestTraingingLoss;
	
	@ManyToOne
    @JoinColumn(name = "CSV_id", nullable = false)
	private CSVEntity CSV;
	
	@OneToMany(mappedBy = "model", cascade = CascadeType.ALL)
	private List<EvaluationEntity> evaluations;
}

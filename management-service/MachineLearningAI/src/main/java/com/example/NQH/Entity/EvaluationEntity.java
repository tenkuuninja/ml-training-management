package com.example.NQH.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class EvaluationEntity extends BaseEntity{

	@Column 
	private float f1score;
	@Column 
	private float mse;
	@Column 
	private float rmse;
	@Column 
	private float mae;
	@Column 
	private double rsquared;
	
	@ManyToOne
    @JoinColumn(name = "model_id")
	private ModelEntity model;
	
}

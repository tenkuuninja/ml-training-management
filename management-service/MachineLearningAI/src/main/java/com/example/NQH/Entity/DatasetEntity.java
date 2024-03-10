package com.example.NQH.Entity;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor

@Entity
public class DatasetEntity extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column
	private List<String> labels;
	@Column
	private String name;
	@Column
	private String link;
	@Column 
	private double Accuracy;
	@Column 
	private double Precision;
	@Column 
	private double Recall ;
	@Column 
	private double F1_score;
	@Column 
	private double MSE;
	@Column 
	private double RMSE;
	@Column 
	private double MAE;
	@Column 
	private double R_squared;
}

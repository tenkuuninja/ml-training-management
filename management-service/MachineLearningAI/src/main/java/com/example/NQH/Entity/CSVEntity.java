package com.example.NQH.Entity;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
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

public class CSVEntity extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(columnDefinition = "TEXT")
	private String labels;
	@Column
	private String name;
	@Column
	private String link;
	@Column 
	private float accuracy;
	@Column 
	private float precision_score;
	@Column 
	private float recall_score ;
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
}

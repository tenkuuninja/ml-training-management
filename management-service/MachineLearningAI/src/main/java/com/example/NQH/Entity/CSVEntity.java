package com.example.NQH.Entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;

import jakarta.persistence.OneToMany;

import lombok.AllArgsConstructor;
import lombok.Builder;

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

	@Column(columnDefinition = "TEXT")
	private String labels;
	@Column
	private String name;
	@Column
	private String link;
	@Column
	private String fileName;

	@OneToMany(mappedBy = "CSV", cascade = CascadeType.ALL)
	private List<ModelEntity> model;

}

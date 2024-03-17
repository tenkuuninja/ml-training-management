package com.example.NQH.Service;

import java.util.List;

import com.example.NQH.Entity.ModelEntity;


public interface ModelService {

	ModelEntity addModel(String link, double d, double e,String name);

	ModelEntity getModel(Long id);

	List<ModelEntity> getAllModels();

	ModelEntity deleteModel(Long id);

}
		
package com.example.NQH.Service.impliments;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.NQH.Entity.ModelEntity;
import com.example.NQH.Repository.ModelRepository;
import com.example.NQH.Service.ModelService;

import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class ModelServiceImp implements ModelService{
	
	private final ModelRepository modelRepository;
	@Override
	public ModelEntity addModel(String link,double testLoss,double trainLoss,String name) {
		ModelEntity model = new ModelEntity();
		model.setBestTestLoss(testLoss);
		model.setBestTestLoss(trainLoss);
		model.setLinkModel(link);
		model.setName(name);
		return modelRepository.save(model);
	}
	@Override
	public ModelEntity getModel(Long id) {
		return modelRepository.findById(id).get();
	}
	
	@Override
	public List<ModelEntity> getAllModels() {
		return modelRepository.findAll();
	}
	
	@Override 
	public ModelEntity deleteModel(Long id) {
		ModelEntity model = modelRepository.findById(id).get();
		modelRepository.delete(model);;
		return model;
	}
}

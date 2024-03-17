package com.example.NQH.Service.impliments;

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
	
	
}

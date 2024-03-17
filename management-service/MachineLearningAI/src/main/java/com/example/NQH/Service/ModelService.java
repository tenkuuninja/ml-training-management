package com.example.NQH.Service;

import org.springframework.stereotype.Service;

import com.example.NQH.Entity.ModelEntity;

@Service
public interface ModelService {

	ModelEntity addModel(String link, double d, double e);

}

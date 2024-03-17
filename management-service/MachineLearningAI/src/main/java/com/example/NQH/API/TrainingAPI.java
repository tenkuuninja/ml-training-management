package com.example.NQH.API;

import org.springframework.web.bind.annotation.RestController;

import com.example.NQH.API.DTO.TrainingDTO;
import com.example.NQH.Entity.ModelEntity;
import com.example.NQH.Service.FlaskApiService;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RequiredArgsConstructor
@RestController
public class TrainingAPI {
	private final FlaskApiService flaskApiService;
	
	@PostMapping("/training")
	public String Training(@RequestBody TrainingDTO data) {
		
		Mono<String> result = flaskApiService.callFlaskApi(data.getLinkFileTrain(),data.getLinkFileTestl(),data.getFeatureLabels(),data.getTargetLabel());
		result.subscribe(
			response	-> {
				
			}
				
				
				);
		return null;
		
	}
	
}

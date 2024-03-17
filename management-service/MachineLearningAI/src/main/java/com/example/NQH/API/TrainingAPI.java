package com.example.NQH.API;

import org.springframework.web.bind.annotation.RestController;

import com.example.NQH.API.DTO.TrainingDTO;
import com.example.NQH.Entity.ModelEntity;
import com.example.NQH.Service.FlaskApiService;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@RequiredArgsConstructor
@RestController
public class TrainingAPI {
	private final FlaskApiService flaskApiService;
	
	@PostMapping("/training")
	public String Training(@RequestParam("fileTrain") String linkFileTrain,
						   @RequestParam("fileTest") String linkFileTest ,
						   @RequestParam("featureLabels") String[] featureLabels,
						   @RequestParam("targetLabel") String targetLabel   ) {
		
		Mono<String> result = flaskApiService.callFlaskApi(linkFileTrain,linkFileTest ,featureLabels,targetLabel );
		
		result.subscribe(
			response	-> {
				
			}
				
				
				);
		return null;
		
	}
	
}

package com.example.NQH.API;

import org.springframework.web.bind.annotation.RestController;

import com.example.NQH.Entity.FlaskResponseEntity;

import com.example.NQH.Service.FlaskApiService;
import com.example.NQH.Service.ModelService;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;

import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RequestParam;

@RequiredArgsConstructor
@RestController
public class TrainingAPI {
	private final FlaskApiService flaskApiService;
	private final ModelService modelService;

	@PostMapping("/training")
	public void Training(@RequestParam("fileTrain") String linkFileTrain,
			@RequestParam("fileTest") String linkFileTest,
			@RequestParam("featureLabels") String[] featureLabels,
			@RequestParam("targetLabel") String targetLabel,
			@RequestParam("name") String name) {

		Mono<FlaskResponseEntity> result = flaskApiService.callFlaskApi(linkFileTrain, linkFileTest, featureLabels,
				targetLabel);

		result.subscribe(
				response -> {
					modelService.addModel(response.getModelFilename(), response.getBestTestLoss(),
							response.getBestTrainingLoss(),name);
				}
		);

	}
}

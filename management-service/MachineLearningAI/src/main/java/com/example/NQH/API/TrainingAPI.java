package com.example.NQH.API;



import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.NQH.API.DTO.FlaskRespone;
import com.example.NQH.Service.FlaskApiService;
import com.example.NQH.Service.ModelService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

import org.springframework.web.reactive.function.client.WebClientResponseException;
@Slf4j
@RequiredArgsConstructor
@CrossOrigin
@RestController
public class TrainingAPI {
	private final FlaskApiService flaskApiService;
	private final ModelService modelService;

	@PostMapping("/training")
	public Mono<FlaskRespone> Training(@RequestParam("fileTrain") String linkFileTrain,
			@RequestParam("fileTest") String linkFileTest,
			@RequestParam("featureLabels") String[] featureLabels,
			@RequestParam("targetLabel") String targetLabel,
			@RequestParam("name") String name) {

		log.info("linkFileTest: "+linkFileTest);
		
		Mono<FlaskRespone> result = flaskApiService.callFlaskApi(linkFileTrain, linkFileTest, featureLabels,
				targetLabel);
//	    return result.onErrorResume(WebClientResponseException.class, error -> {
//	        // Xử lý lỗi ở đây, ví dụ:
//	        log.error("An error occurred while calling Flask API: " + error.getMessage());
//	        // Trả về một phản hồi mặc định hoặc null tùy theo yêu cầu của bạn
//	        return Mono.just(new FlaskRespone()); // hoặc trả về một phản hồi mặc định khác
//	    }).doOnSuccess(response -> {
//	        // Xử lý kết quả thành công ở đây
////	        modelService.addModel(response.getModelFilename(), response.getBestTestLoss(), response.getBestTrainingLoss(), name);
//	    	log.info(String.valueOf(response.getBest_test_loss()));
//	    });
		
		result.subscribe(
				a -> {
					log.info(String.valueOf(a.getBest_test_loss()));
			        // Handle result here
			    }
				);
		
		
		return null;
		
	}
}

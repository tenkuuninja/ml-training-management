package com.example.NQH.Service.impliments;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.example.NQH.Entity.FlaskResponseEntity;
import com.example.NQH.Entity.RequestDataEntity;
import com.example.NQH.Service.FlaskApiService;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class FlaskApiServiceImp implements FlaskApiService {

	private final WebClient.Builder webClientBuilder;;

	@Override
	public Mono<FlaskResponseEntity> callFlaskApi(String trainFileLink, String testFileLink, String[] labelsFeatures,
			String labelTarget) {
		String flaskApiUrl = "http://localhost:5000/train";
		RequestDataEntity requestData = new RequestDataEntity(trainFileLink, testFileLink, labelsFeatures, labelTarget);
		return webClientBuilder.build()
				.post()
				.uri(flaskApiUrl)
				.bodyValue(requestData)
				.retrieve()
				.bodyToMono(FlaskResponseEntity.class);
	}
}

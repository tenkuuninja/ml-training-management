package com.example.NQH.Service.impliments;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import com.example.NQH.API.DTO.FlaskRespone;
import com.example.NQH.API.DTO.RequestData;

import com.example.NQH.Service.FlaskApiService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
@Slf4j
public class FlaskApiServiceImp implements FlaskApiService {

	private final WebClient.Builder webClientBuilder;;

	@Override
	public Mono<FlaskRespone> callFlaskApi(String trainFileLink, String testFileLink, String[] labelsFeatures,
			String labelTarget) {
		
		log.info("trainFileLink: "+trainFileLink);
		
		String flaskApiUrl = "http://127.0.0.1:5000/training";
		RequestData requestData = new RequestData(trainFileLink, testFileLink, labelsFeatures, labelTarget);
		
		log.info(requestData.getLabelTarget());
		return webClientBuilder.build()
				.post()
				.uri(flaskApiUrl)
				.bodyValue(BodyInserters.fromValue(requestData))
				.retrieve()
				.bodyToMono(FlaskRespone.class);
	}
}

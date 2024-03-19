package com.example.NQH.Service;
import com.example.NQH.API.DTO.FlaskRespone;


import reactor.core.publisher.Mono;

public interface FlaskApiService {
	public Mono<FlaskRespone> callFlaskApi(String trainFileLink, String testFileLink, String[] labelsFeatures, String labelTarget);
}

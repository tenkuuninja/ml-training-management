package com.example.NQH.Service;
import reactor.core.publisher.Mono;

public interface FlaskApiService {
	public Mono<String> callFlaskApi(String trainFileLink, String testFileLink, String[] labelsFeatures, String labelTarget);
}

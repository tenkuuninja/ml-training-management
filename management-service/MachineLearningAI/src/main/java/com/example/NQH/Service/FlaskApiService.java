package com.example.NQH.Service;
import com.example.NQH.Entity.FlaskResponseEntity;

import reactor.core.publisher.Mono;

public interface FlaskApiService {
	public Mono<FlaskResponseEntity> callFlaskApi(String trainFileLink, String testFileLink, String[] labelsFeatures, String labelTarget);
}

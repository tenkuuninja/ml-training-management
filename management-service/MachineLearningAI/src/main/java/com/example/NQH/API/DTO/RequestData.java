package com.example.NQH.API.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RequestData {
	
	private String trainFileLink;
    private String testFileLink;
    private String[] labelsFeatures;
    private String labelTarget;
    
}

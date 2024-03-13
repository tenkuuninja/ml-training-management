package com.example.NQH.Service;

import java.io.IOException;
import java.util.List;

import org.springframework.http.ResponseEntity;

import com.example.NQH.Entity.CSVEntity;

public interface CSVService {
	void readCSVAndSaveLabels(String filePath) throws IOException;
	
	CSVEntity getCSV(Long id);
	
	List<CSVEntity> getAllCSV();



	CSVEntity updateCSV(Long id);

	CSVEntity deleteCSV(Long id);
}

package com.example.NQH.Service;

import java.io.IOException;
import java.util.List;

import com.example.NQH.Entity.CSVEntity;

public interface CSVService {
	void readCSVAndSaveLabels(String filePath,String fileName) throws IOException;
	
	CSVEntity getCSV(Long id);
	
	List<CSVEntity> getAllCSV();



	CSVEntity updateCSV(Long id,String name);

	CSVEntity deleteCSV(Long id);
}

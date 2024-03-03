package com.example.NQH.Service.impliments;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;

import com.example.NQH.Entity.DatasetEntity;
import com.example.NQH.Repository.DatasetRepository;
import com.example.NQH.Service.CSVService;

import lombok.RequiredArgsConstructor;
@RequiredArgsConstructor
public class CSVServiceImpl implements CSVService {
	
	private final DatasetRepository datasetRepository;

	@Override
	public void readCSVAndSaveLabels(String filePath) throws IOException{
        List<String> labels = new ArrayList<>();
        try (
            Reader reader = new FileReader(filePath);
            CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT);
        ) {
            for (CSVRecord csvRecord : csvParser) {
                // Assume that the first row contains labels
                for (String label : csvRecord) {
                    labels.add(label);
                }
                break; 
            }
            File file = new File(filePath);
           DatasetEntity dataset  = new DatasetEntity();
           dataset.setName(file.getName());
           dataset.setLink(filePath);
           dataset.setLabels(labels);
           datasetRepository.save(dataset);
        }
	}
}

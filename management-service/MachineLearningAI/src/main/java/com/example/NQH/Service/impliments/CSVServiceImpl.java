package com.example.NQH.Service.impliments;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;
import java.nio.file.Paths;
import java.util.List;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.example.NQH.Entity.CSVEntity;
import com.example.NQH.Repository.DatasetRepository;
import com.example.NQH.Service.CSVService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service

public class CSVServiceImpl implements CSVService {

	private final DatasetRepository datasetRepository;

	@Override		
	public void readCSVAndSaveLabels(String fileName,String name) throws IOException {

		String path = Paths.get("").toAbsolutePath().toString() + "/public/Dataset/";
		String filePath = new String(path + fileName);
		String homeURL = ServletUriComponentsBuilder.fromCurrentContextPath().toUriString();
		String fileLink = homeURL + "/files/" + fileName;
		
		StringBuilder labelsBuilder = new StringBuilder();
		try (
				Reader reader = new FileReader(filePath);
				CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT);) {
			for (CSVRecord csvRecord : csvParser) {
				// Assume that the first row contains labels
				for (String label : csvRecord) {
					labelsBuilder.append(label);
					labelsBuilder.append(",");
				}
				break;
			}
			String labels = labelsBuilder.toString();

			File file = new File(filePath);
			CSVEntity dataset = new CSVEntity();
			dataset.setFileName(file.getName());
			dataset.setLink(fileLink);
			dataset.setLabels(labels);
			dataset.setName(name);

//			log.info(labels);

			datasetRepository.save(dataset);
		}
	}

	@Override
	public CSVEntity getCSV(Long id) {
		return datasetRepository.findById(id).get();
	}

	@Override
	public List<CSVEntity> getAllCSV() {
		return datasetRepository.findAll();
	}
	
	@Override
	public CSVEntity updateCSV(Long id,String name) {
		CSVEntity csv = datasetRepository.findById(id).get();
		csv.setName(name);
		datasetRepository.save(csv);
		return csv;
	}

	@Override 
	public CSVEntity deleteCSV(Long id) {
		CSVEntity csv = datasetRepository.findById(id).get();
		datasetRepository.delete(csv);;
		return csv;
	}
	
	

}

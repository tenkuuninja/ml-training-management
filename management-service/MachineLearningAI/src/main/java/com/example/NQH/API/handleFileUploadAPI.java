package com.example.NQH.API;

import java.io.IOException;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.NQH.Service.CSVService;
import com.example.NQH.Service.UploadCSVService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@RestController
@CrossOrigin
@Slf4j
public class handleFileUploadAPI {
	private final UploadCSVService uploadCSVService;
	private final CSVService csvService;
	
	@PostMapping("/upload")
	public void handleFileUpload(@RequestParam("file") MultipartFile file,@RequestParam("name")String  data) throws IOException {
		uploadCSVService.UploadFile(file);
		
//		log.info(file.getOriginalFilename());

		String fileName = file.getOriginalFilename();
	
		csvService.readCSVAndSaveLabels(fileName, data);
	}
}

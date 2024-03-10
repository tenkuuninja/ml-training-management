package com.example.NQH.API;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.NQH.Service.CSVService;
import com.example.NQH.Service.UploadCSVService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestBody;

@RequiredArgsConstructor
@RestController
public class handleFileUploadAPI {
	private final UploadCSVService uploadCSVService;
	private final CSVService csvService;
	
	@PostMapping("/upload")
	public void handleFileUpload(@RequestParam("file") MultipartFile file) throws IOException {
		uploadCSVService.UploadFile(file);
		
//		String linkFiels = new String("E:/MCLN/ml-training-management/Dataset/" +file.getName());
//		
//		csvService.readCSVAndSaveLabels(linkFiels);
	}
}

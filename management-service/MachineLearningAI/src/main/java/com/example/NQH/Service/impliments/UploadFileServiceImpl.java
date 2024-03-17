package com.example.NQH.Service.impliments;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Paths;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.example.NQH.Service.UploadCSVService;
@Service
public class UploadFileServiceImpl implements UploadCSVService {

	public String UploadFile(MultipartFile file) {
		if (file.isEmpty()) {
			return "Please select a file to upload";
		}
		String path = Paths.get("").toAbsolutePath().toString() + "/public/Dataset/";
		new File(path).mkdirs();
		try (InputStream inputStream = file.getInputStream();
				OutputStream outputStream = new FileOutputStream(
						path + file.getOriginalFilename())) {

			byte[] buffer = new byte[1024];
			int bytesRead;
			while ((bytesRead = inputStream.read(buffer)) != -1) {
				outputStream.write(buffer, 0, bytesRead);
			}
			return "File uploaded successfully: " + file.getOriginalFilename();
		} catch (IOException e) {
			e.printStackTrace();
			return "Failed to upload file: " + e.getMessage();
		}
	}
}

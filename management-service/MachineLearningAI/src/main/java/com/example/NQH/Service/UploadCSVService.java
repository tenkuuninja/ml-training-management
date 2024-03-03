package com.example.NQH.Service;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

public interface UploadCSVService {
	String UploadFile(@RequestParam("file") MultipartFile file);
}

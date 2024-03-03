package com.example.NQH.Service;

import java.io.IOException;
import java.util.List;

public interface CSVService {
	void readCSVAndSaveLabels(String filePath) throws IOException;
}

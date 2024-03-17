package com.example.NQH.API;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.NQH.Entity.CSVEntity;
import com.example.NQH.Repository.DatasetRepository;
import com.example.NQH.Service.CSVService;

import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
@CrossOrigin
@RestController
public class CSVApi {
	public final CSVService csvService;
	public final DatasetRepository datasetRepository;
	
	@GetMapping("/CSV/{id}")
	public ResponseEntity<CSVEntity> CSV(@PathVariable("id") Long id){
		CSVEntity CSV = csvService.getCSV(id);
		return ResponseEntity.ok().body(CSV);
	}
	
	@GetMapping("/CSV")
	public ResponseEntity<List<CSVEntity>> CSV(){
		List<CSVEntity> CSV = csvService.getAllCSV();
		return ResponseEntity.ok().body(CSV);
	}
	@PutMapping("/CSV/{id}")
	public ResponseEntity<CSVEntity>updateCSV(@PathVariable("id") Long id, @RequestParam("name") String name) {
		CSVEntity CSV = csvService.updateCSV(id,name);
		return ResponseEntity.ok().body(CSV);
	}
	
	@DeleteMapping("/CSV/{id}")
	public ResponseEntity<CSVEntity> deleteCSV(@PathVariable("id") Long id)
	{
		CSVEntity CSV = csvService.deleteCSV(id);
		return ResponseEntity.ok().body(CSV);
	}
	
	@GetMapping("/files/{fileName}")
    public ResponseEntity<Resource> getFile(@PathVariable("fileName") String fileName) throws IOException {
		String path = Paths.get("").toAbsolutePath().toString() + "/public/Dataset/";
        File file = new File(path + fileName);
        
        if (!file.exists()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        byte[] fileContent = Files.readAllBytes(file.toPath());
        ByteArrayResource resource = new ByteArrayResource(fileContent);

        return ResponseEntity.ok()
                .contentLength(fileContent.length)
                .header("Content-type", "application/octet-stream")
                .header("Content-disposition", "attachment; filename=\"" + fileName + "\"")
                .body(resource);
    }
}

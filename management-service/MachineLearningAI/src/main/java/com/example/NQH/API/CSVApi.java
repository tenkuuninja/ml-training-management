package com.example.NQH.API;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.NQH.Entity.CSVEntity;
import com.example.NQH.Repository.DatasetRepository;
import com.example.NQH.Service.CSVService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;


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
	public ResponseEntity<CSVEntity>updateCSV(@PathVariable("id") Long id, @RequestBody String entity) {
		CSVEntity CSV = csvService.updateCSV(id);
		return ResponseEntity.ok().body(CSV);
	}
	
	@DeleteMapping("/CSV/{id}")
	public ResponseEntity<CSVEntity> deleteCSV(@PathVariable("id") Long id)
	{
		CSVEntity CSV = csvService.deleteCSV(id);
		return ResponseEntity.ok().body(CSV);
	}
	
}

package com.example.NQH.API.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TrainingDTO {
	String name;
	String linkFileTrain;
	String linkFileTestl;
	String targetLabel;
	String[] featureLabels;
}

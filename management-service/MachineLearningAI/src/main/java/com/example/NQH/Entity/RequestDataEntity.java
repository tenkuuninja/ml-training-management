package com.example.NQH.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name="RequestData")
public class RequestDataEntity {
	private String trainFileLink;
    private String testFileLink;
    private String[] labelsFeatures;
    private String labelTarget;
}

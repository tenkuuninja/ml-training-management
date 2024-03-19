package com.example.NQH.API.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FlaskRespone {

    
    private String model_filename;

    
    private double best_training_loss;

    
    private double best_test_loss;
}

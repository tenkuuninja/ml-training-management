package com.example.NQH.Entity;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;
import lombok.Data;

@Entity
@Data

public class FlaskResponseEntity extends BaseEntity{


    @JsonProperty("model_filename")
    private String modelFilename;

    @JsonProperty("best_training_loss")
    private double bestTrainingLoss;

    @JsonProperty("best_test_loss")
    private double bestTestLoss;
}

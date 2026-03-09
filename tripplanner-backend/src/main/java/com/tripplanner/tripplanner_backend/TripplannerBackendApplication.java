package com.tripplanner.tripplanner_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(
        exclude = {DataSourceAutoConfiguration.class}
)
public class TripplannerBackendApplication {
       public static void main(String[] args) {
        SpringApplication.run(TripplannerBackendApplication.class, args);
    }
}
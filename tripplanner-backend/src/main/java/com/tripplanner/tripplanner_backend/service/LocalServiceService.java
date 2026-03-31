package com.tripplanner.tripplanner_backend.service;

import com.tripplanner.tripplanner_backend.model.LocalService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class LocalServiceService {

    public List<LocalService> searchServices(String location, String category){

        List<LocalService> all = loadServices();

        return all.stream()
                .filter(s -> s.getCategory().equalsIgnoreCase(category))
                .filter(s -> s.getLocation().equalsIgnoreCase(location))
                .collect(Collectors.toList());
    }

    private List<LocalService> loadServices(){

        try{

            ObjectMapper mapper = new ObjectMapper();

            InputStream is = getClass()
                    .getClassLoader()
                    .getResourceAsStream("local_services.json");

            return mapper.readValue(is,
                    new TypeReference<List<LocalService>>() {});

        }catch(Exception e){
            e.printStackTrace();
            return new ArrayList<>();
        }
    }
}
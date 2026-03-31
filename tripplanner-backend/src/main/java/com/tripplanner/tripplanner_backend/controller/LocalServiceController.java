package com.tripplanner.tripplanner_backend.controller;

import com.tripplanner.tripplanner_backend.model.LocalService;
import com.tripplanner.tripplanner_backend.service.LocalServiceService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/services")
@CrossOrigin(origins = {"http://localhost:3000","http://localhost:5173"})
public class LocalServiceController {

    private final LocalServiceService service;

    public LocalServiceController(LocalServiceService service){
        this.service = service;
    }

    @GetMapping("/search")
    public List<LocalService> search(
            @RequestParam String location,
            @RequestParam String category
    ){
        return service.searchServices(location,category);
    }
}
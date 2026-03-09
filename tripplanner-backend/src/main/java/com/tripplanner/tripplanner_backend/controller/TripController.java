package com.tripplanner.tripplanner_backend.controller;

import com.tripplanner.tripplanner_backend.service.BotsonicService;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping()
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class TripController {

    private final BotsonicService botsonicService;

    // constructor injection
    public TripController(BotsonicService botsonicService) {
        this.botsonicService = botsonicService;
    }

    @PostMapping("/planner")
    public Map<String, Object> planTrip(@RequestBody Map<String, String> request) {

        String userMessage = request.get("message");

        // call AI
        // String aiReply = botsonicService.askBotsonic(userMessage);

        // Map<String, Object> response = new HashMap<>();
        // response.put("reply", aiReply);

        // return response;
        // call AI (now returns structured Map)
    Map<String, Object> aiResponse =
            botsonicService.askBotsonic(userMessage);

    return aiResponse;
    }
}

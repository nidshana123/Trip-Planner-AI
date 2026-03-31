package com.tripplanner.tripplanner_backend.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping()
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class TripController {

    @PostMapping("/planner")
    public Map<String, Object> planTrip(@RequestBody Map<String, String> request) {

        String message = request.get("message").toLowerCase();

        Map<String, Object> result = new HashMap<>();

        // 🔥 STATIC LOGIC
        if (message.contains("coimbatore")) {

            String itinerary =
                    "Day 1:\n" +
                    "- 9:00 AM: Visit Marudamalai Temple\n" +
                    "- 12:00 PM: Lunch\n" +
                    "- 3:00 PM: VOC Park and Zoo\n\n" +

                    "Day 2:\n" +
                    "- 9:00 AM: Isha Yoga Center & Adiyogi\n" +
                    "- 12:00 PM: Siruvani Waterfalls\n\n" +

                    "Day 3:\n" +
                    "- 10:00 AM: Gedee Car Museum\n" +
                    "- 1:00 PM: Kovai Kondattam\n" +
                    "- 4:00 PM: Perur Pateeswarar Temple";

            List<String> locations = Arrays.asList(
                    "Marudamalai Temple",
                    "VOC Park and Zoo",
                    "Isha Yoga Center",
                    "Siruvani Waterfalls",
                    "Gedee Car Museum",
                    "Kovai Kondattam",
                    "Perur Pateeswarar Temple"
            );

            result.put("itinerary_text", itinerary);
            result.put("locations", locations);

        } else if (message.contains("goa")) {

            String itinerary =
                    "Day 1:\n" +
                    "- Visit Baga Beach\n" +
                    "- Explore Fort Aguada\n\n" +

                    "Day 2:\n" +
                    "- Dudhsagar Waterfalls\n" +
                    "- Basilica of Bom Jesus\n\n" +

                    "Day 3:\n" +
                    "- Chapora Fort\n" +
                    "- Palolem Beach";

            List<String> locations = Arrays.asList(
                    "Baga Beach",
                    "Fort Aguada",
                    "Dudhsagar Waterfalls",
                    "Basilica of Bom Jesus",
                    "Chapora Fort",
                    "Palolem Beach"
            );

            result.put("itinerary_text", itinerary);
            result.put("locations", locations);

        } else {

            result.put("itinerary_text",
                    "Please enter a valid destination like Coimbatore or Goa.");

            result.put("locations", new ArrayList<>());
        }

        return result;
    }
}
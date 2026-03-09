// package com.tripplanner.tripplanner_backend.service;

// import org.springframework.stereotype.Service;
// import org.springframework.web.client.RestTemplate;
// import org.springframework.http.*;

// import java.util.*;

// @Service
// public class BotsonicService {

//     private final String API_URL =
//         "https://api-bot.writesonic.com/v1/botsonic/generate";

//     private final String BOT_TOKEN =
//         "11b82e0f-7ed9-4d48-a95d-8d239e151dca";

//     public String askBotsonic(String userMessage) {

//         RestTemplate restTemplate = new RestTemplate();

//         // ✅ Headers
//         HttpHeaders headers = new HttpHeaders();
//         headers.setContentType(MediaType.APPLICATION_JSON);

//         // Botsonic uses token header
//         headers.set("token", BOT_TOKEN);

//         // ✅ Request Body (VERY IMPORTANT FORMAT)
//         Map<String, Object> body = new HashMap<>();
//         body.put("input_text", userMessage);
//         body.put("chat_id", UUID.randomUUID().toString());

//         HttpEntity<Map<String, Object>> request =
//                 new HttpEntity<>(body, headers);

//         ResponseEntity<String> response =
//                 restTemplate.postForEntity(
//                         API_URL,
//                         request,
//                         String.class
//                 );

//         return response.getBody();
//     }
// }
// package com.tripplanner.tripplanner_backend.service;

// import org.springframework.stereotype.Service;
// import org.springframework.web.client.RestTemplate;
// import org.springframework.http.*;

// import java.util.*;

// import com.fasterxml.jackson.databind.JsonNode;
// import com.fasterxml.jackson.databind.ObjectMapper;

// @Service
// public class BotsonicService {

//     private final String API_URL =
//         "https://api-bot.writesonic.com/v1/botsonic/generate";

//     private final String BOT_TOKEN =
//         "11b82e0f-7ed9-4d48-a95d-8d239e151dca"; // regenerate token after testing

//     public String askBotsonic(String userMessage) {

//         RestTemplate restTemplate = new RestTemplate();

//         // ✅ Headers
//         HttpHeaders headers = new HttpHeaders();
//         headers.setContentType(MediaType.APPLICATION_JSON);
//         headers.set("token", BOT_TOKEN);

//         // ✅ Request body
//         Map<String, Object> body = new HashMap<>();
//         // body.put("input_text", userMessage);
//         String structuredPrompt = 
//     "Generate a travel itinerary.\n" +
//     "Return STRICT JSON in this format:\n" +
//     "{\n" +
//     "  \"itinerary_text\": \"...\",\n" +
//     "  \"locations\": [\"Place1\", \"Place2\"]\n" +
//     "}\n\n" +
//     "User request: " + userMessage;

//         body.put("input_text", structuredPrompt);
//         body.put("chat_id", UUID.randomUUID().toString());

//         HttpEntity<Map<String, Object>> request =
//                 new HttpEntity<>(body, headers);

//         ResponseEntity<String> response =
//                 restTemplate.postForEntity(
//                         API_URL,
//                         request,
//                         String.class
//                 );

//         try {
//             // ✅ Parse JSON response
//             ObjectMapper mapper = new ObjectMapper();
//             JsonNode root = mapper.readTree(response.getBody());

//             // Extract ONLY AI reply
//             return root.get("answer").asText();

//         } catch (Exception e) {
//             e.printStackTrace();
//             return "Error parsing AI response.";
//         }
//     }
// }
// package com.tripplanner.tripplanner_backend.service;

// import com.fasterxml.jackson.databind.JsonNode;
// import com.fasterxml.jackson.databind.ObjectMapper;
// import org.springframework.stereotype.Service;
// import org.springframework.web.client.RestTemplate;
// import org.springframework.http.*;

// import java.util.*;
// import java.util.regex.Matcher;
// import java.util.regex.Pattern;

// @Service
// public class BotsonicService {

//     private final String API_URL =
//             "https://api-bot.writesonic.com/v1/botsonic/generate";

//     private final String BOT_TOKEN =
//             "11b82e0f-7ed9-4d48-a95d-8d239e151dca";

//     public Map<String, Object> askBotsonic(String userMessage) {

//         RestTemplate restTemplate = new RestTemplate();

//         HttpHeaders headers = new HttpHeaders();
//         headers.setContentType(MediaType.APPLICATION_JSON);
//         headers.set("token", BOT_TOKEN);

//         Map<String, Object> body = new HashMap<>();
//         body.put("input_text", userMessage);
//         body.put("chat_id", UUID.randomUUID().toString());

//         HttpEntity<Map<String, Object>> request =
//                 new HttpEntity<>(body, headers);

//         ResponseEntity<String> response =
//                 restTemplate.postForEntity(
//                         API_URL,
//                         request,
//                         String.class
//                 );

//         String responseBody = response.getBody();

//         try {
//             ObjectMapper mapper = new ObjectMapper();

//             // 🔥 Parse directly
//             JsonNode root = mapper.readTree(responseBody);

//             String answer = root.get("answer").asText();

//             // 🔥 Extract locations from address lines
//             List<String> locations = new ArrayList<>();

//             // Pattern pattern = Pattern.compile(
//             //         "Address:\\s*([^\\-]+)",
//             //         Pattern.CASE_INSENSITIVE
//             // );
//                         Pattern pattern = Pattern.compile(
//                     "(Visit|Explore|Have fun at|Relax and enjoy fun activities at)\\s+([^\\.,]+)",
//                     Pattern.CASE_INSENSITIVE
//             );

//             Matcher matcher = pattern.matcher(answer);

//             while (matcher.find()) {
//                 locations.add(matcher.group(2).trim());
//             }

//             // Matcher matcher = pattern.matcher(answer);

//             // while (matcher.find()) {
//             //     locations.add(matcher.group(1).trim());
//             // }

//             Map<String, Object> result = new HashMap<>();
//             result.put("itinerary_text", answer);
//             result.put("locations", locations);

//             return result;

//         } catch (Exception e) {
//             e.printStackTrace();
//             throw new RuntimeException("Failed to parse Botsonic response");
//         }
//     }
// };

//     return result;
// }
//     }

//     private List<String> loadPlaces() throws IOException {

//         return Files.readAllLines(
//                 Paths.get("src/main/resources/places.txt")
//         );
//     }
// }
// package com.tripplanner.tripplanner_backend.service;

// import com.fasterxml.jackson.databind.JsonNode;
// import com.fasterxml.jackson.databind.ObjectMapper;
// import org.springframework.stereotype.Service;
// import org.springframework.web.client.RestTemplate;
// import org.springframework.http.*;

// import java.io.InputStream;
// import java.util.*;

// @Service
// public class BotsonicService {

//     private final String API_URL =
//             "https://api-bot.writesonic.com/v1/botsonic/generate";

//     private final String BOT_TOKEN =
//             "11b82e0f-7ed9-4d48-a95d-8d239e151dca";

//     public Map<String, Object> askBotsonic(String userMessage) {

//         RestTemplate restTemplate = new RestTemplate();

//         HttpHeaders headers = new HttpHeaders();
//         headers.setContentType(MediaType.APPLICATION_JSON);
//         headers.set("token", BOT_TOKEN);

//         Map<String, Object> body = new HashMap<>();
//         // body.put("input_text", userMessage);
//         String dataset = loadDataset();

// String prompt =
//         "Use the following travel dataset to generate itinerary.\n\n" +
//         dataset +
//         "\n\nUser request: " + userMessage +
//         "\n\nGenerate a clean 3 day itinerary.";

// body.put("input_text", prompt);
//         body.put("chat_id", UUID.randomUUID().toString());

//         HttpEntity<Map<String, Object>> request =
//                 new HttpEntity<>(body, headers);

//         ResponseEntity<String> response =
//                 restTemplate.postForEntity(
//                         API_URL,
//                         request,
//                         String.class
//                 );

//         try {

//             ObjectMapper mapper = new ObjectMapper();
//             JsonNode root = mapper.readTree(response.getBody());

//             String answer = root.get("answer").asText();

//             Map<String, Object> result = new HashMap<>();
//             result.put("itinerary_text", answer);
//             result.put("locations", new ArrayList<>());

//             return result;

//         } catch (Exception e) {
//             e.printStackTrace();
//             throw new RuntimeException("Botsonic parsing failed");
//         }
//     }
//     private String loadDataset() {

//     try {

//         ObjectMapper mapper = new ObjectMapper();

//         InputStream is = getClass()
//                 .getClassLoader()
//                 .getResourceAsStream("travel_dataset.json");

//         JsonNode dataset = mapper.readTree(is);

//         return dataset.toString();

//     } catch (Exception e) {

//         e.printStackTrace();
//         return "";
//     }
//         }
// }
package com.tripplanner.tripplanner_backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

import java.io.InputStream;
import java.util.*;

@Service
public class BotsonicService {

    private final String API_URL =
            "https://api-bot.writesonic.com/v1/botsonic/generate";

    private final String BOT_TOKEN =
            "f79a642c-b22f-4156-98c4-8930c0c404b4";

    public Map<String, Object> askBotsonic(String userMessage) {

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("token", BOT_TOKEN);

        String dataset = loadDataset();

        String prompt =
                "Use the following travel dataset to generate itinerary.\n\n" +
                dataset +
                "\n\nUser request: " + userMessage +
                "\n\nGenerate a clean 3 day itinerary.";

        Map<String, Object> body = new HashMap<>();
        body.put("input_text", prompt);
        body.put("chat_id", UUID.randomUUID().toString());

        HttpEntity<Map<String, Object>> request =
                new HttpEntity<>(body, headers);

        ResponseEntity<String> response =
                restTemplate.postForEntity(
                        API_URL,
                        request,
                        String.class
                );

        try {

            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response.getBody());

            String answer = "";

            // SAFE PARSING
            if (root.has("answer")) {
                answer = root.get("answer").asText();
            }
            else if (root.has("message")) {
                answer = root.get("message").asText();
            }
            else if (root.has("data") && root.get("data").has("answer")) {
                answer = root.get("data").get("answer").asText();
            }
            else {
                answer = response.getBody();
            }

            Map<String, Object> result = new HashMap<>();
        //     result.put("itinerary_text", answer);

        //     // locations empty for now
        //     result.put("locations", new ArrayList<>());
        result.put("itinerary_text", answer);

                // extract locations using dataset
                List<String> datasetPlaces = loadPlaces();
                List<String> locations = new ArrayList<>();

                for (String place : datasetPlaces) {

                if (answer.toLowerCase().contains(place.toLowerCase())) {
                        locations.add(place);
                }
                }

                result.put("locations", locations);

            return result;

        } catch (Exception e) {

            e.printStackTrace();
            throw new RuntimeException("Botsonic parsing failed");
        }
    }

    private String loadDataset() {

        try {

            ObjectMapper mapper = new ObjectMapper();

            InputStream is = getClass()
                    .getClassLoader()
                    .getResourceAsStream("travel_dataset.json");

            JsonNode dataset = mapper.readTree(is);

            return dataset.toString();

        } catch (Exception e) {

            e.printStackTrace();
            return "";
        }
    }
    private List<String> loadPlaces() {

    try {

        ObjectMapper mapper = new ObjectMapper();

        InputStream is = getClass()
                .getClassLoader()
                .getResourceAsStream("travel_dataset.json");

        JsonNode root = mapper.readTree(is);

        List<String> places = new ArrayList<>();

        JsonNode destinations = root.get("destinations");

        for (JsonNode city : destinations) {

            JsonNode popularPlaces = city.get("popular_places");

            for (JsonNode place : popularPlaces) {
                places.add(place.asText());
            }
        }

        return places;

    } catch (Exception e) {

        e.printStackTrace();
        return new ArrayList<>();
    }
        }
}
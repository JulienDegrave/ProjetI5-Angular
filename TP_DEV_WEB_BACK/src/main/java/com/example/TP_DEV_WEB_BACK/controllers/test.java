package com.example.TP_DEV_WEB_BACK.controllers;

import com.example.TP_DEV_WEB_BACK.models.*;
import com.example.TP_DEV_WEB_BACK.models.Record;
import com.example.TP_DEV_WEB_BACK.models.RecordItem;
import com.example.TP_DEV_WEB_BACK.services.MusicService;
import com.example.TP_DEV_WEB_BACK.services.NoteService;
import com.example.TP_DEV_WEB_BACK.services.AuthService;
import net.minidev.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class test {

    MusicService musicService;
    NoteService noteService;

    AuthService authService;

    private test(MusicService ms, NoteService ns, AuthService as)
    {
        musicService = ms;
        noteService = ns;
        authService = as;
    }

    @GetMapping("/hello")
    private ResponseEntity<String> hello()
    {
        Logger logger = (Logger) LoggerFactory.getLogger(test.class);
        logger.info("Received hello:");
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.setContentType(MediaType.TEXT_PLAIN);

        return ResponseEntity.ok()
                .headers(responseHeaders)
                .body("Hello world !");
    }

    @GetMapping("/admin")
    public ResponseEntity<String> getAdmin(Principal principal) {
        JwtAuthenticationToken token = (JwtAuthenticationToken) principal;
        String userName = (String) token.getTokenAttributes().get("name");
        String userEmail = (String) token.getTokenAttributes().get("email");
        return ResponseEntity.ok("Hello Admin \nUser Name : " + userName + "\nUser Email : " + userEmail);
    }

    @GetMapping("/user")
    public ResponseEntity<String> getUser(Principal principal)
    {
        JwtAuthenticationToken token = (JwtAuthenticationToken) principal;
        String userName = (String) token.getTokenAttributes().get("name");
        String userEmail = (String) token.getTokenAttributes().get("email");

        return ResponseEntity.ok("Hello User \nUser Name : " + userName + "\nUser Email : " + userEmail);
    }
    @PostMapping("/write")
    private ResponseEntity<String> write(@RequestBody Record rc)
    {
        Logger logger = (Logger) LoggerFactory.getLogger(test.class);
        logger.info("Received write:");
        logger.info(rc.getTimeSlot().toString());
        logger.info(String.valueOf(rc.getNotes().get("1")));

        musicService.save(rc);// associer la note à l'objet "Music" sauvegardé précédemment

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.setContentType(MediaType.APPLICATION_JSON);

        JSONObject response = new JSONObject();
        response.put("message", "Music written");
        return ResponseEntity.ok()
                .headers(responseHeaders)
                .body(response.toJSONString());
    }

    @GetMapping("/getRecord")
    private Record getRecord(@RequestParam String name)
    {
        return musicService.getByName(name);
    }

    @DeleteMapping("/deleteRecord")
    private ResponseEntity<String> deleteRecord(@RequestParam String name)
    {
        Logger logger = (Logger) LoggerFactory.getLogger(test.class);
        logger.info("DELETE");
        boolean ok = musicService.deleteRecordByName(name);
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.setContentType(MediaType.APPLICATION_JSON);

        JSONObject response = new JSONObject();
        response.put("message", "Record deleted");
        return ResponseEntity.ok()
                .headers(responseHeaders)
                .body(response.toJSONString());
    }

    @PostMapping("/login")
    private ResponseEntity<String> login(@RequestBody MUser data)
    {
        Logger logger = (Logger) LoggerFactory.getLogger(test.class);
        logger.info(data.getLogin());
        String token = authService.login(data.getLogin(), data.getPassword());
        logger.info(token);


        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.setContentType(MediaType.APPLICATION_JSON);

        JSONObject response = new JSONObject();
        response.put("message", "Logged");
        response.put("Authorization", token);
        return ResponseEntity.ok()
                .headers(responseHeaders)
                .body(response.toJSONString());
    }

    @GetMapping("/getAllRecords")
    private List<Record> getAllRecords()
    {
        Logger logger = (Logger) LoggerFactory.getLogger(test.class);
        logger.info("getAllRecords :");
        return musicService.getAllMusics();
    }
    @PostMapping("/records")
    public void addRecord(@RequestBody java.lang.Record record)
    {
        Logger logger = (Logger) LoggerFactory.getLogger(test.class);
        logger.info("Received record:");
        logger.info("Received record:");
    }
}

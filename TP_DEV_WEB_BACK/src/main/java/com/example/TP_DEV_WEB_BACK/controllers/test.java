package com.example.TP_DEV_WEB_BACK.controllers;

import com.example.TP_DEV_WEB_BACK.models.Record;
import com.example.TP_DEV_WEB_BACK.models.RecordItem;
import com.example.TP_DEV_WEB_BACK.services.MusicService;
import com.example.TP_DEV_WEB_BACK.services.NoteService;
import net.minidev.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class test {

    MusicService musicService;
    NoteService noteService;

    private test(MusicService ms, NoteService ns)
    {
        musicService = ms;
        noteService = ns;
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

    @GetMapping("/bulbOn")
    private String bulbOn()
    {
        return "On";
    }

    @GetMapping("/bulbOff")
    private String bulbOff()
    {
        return "Off";
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

    @GetMapping("/getMusic")
    private Record getMusic(@RequestParam String name)
    {
        return musicService.getByName(name);
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

package com.example.TP_DEV_WEB_BACK.services;

import com.example.TP_DEV_WEB_BACK.controllers.test;
import com.example.TP_DEV_WEB_BACK.models.Record;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


@Service
public class VoiceAnalyzeServiceImpl implements VoiceAnalyzerService
{

    @Override
    public Record analyzeAudioFile(String file_path)
    {
        String apiUrl = "http://127.0.0.1:8000/record_analyzer/analyze?url=" + file_path;

        // Créer une instance de RestTemplate
        RestTemplate restTemplate = new RestTemplate();
        String json = restTemplate.getForObject(apiUrl, String.class);

        // Conversion de la réponse en objet Record
        Record record = null;
        try {
            ObjectMapper mapper = new ObjectMapper();
            record = mapper.readValue(json, Record.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        Logger logger = (Logger) LoggerFactory.getLogger(test.class);
        logger.info("json!");
        logger.info(json);
        logger.info("Record!");
        logger.info(record.getName());

        return record;
    }
}

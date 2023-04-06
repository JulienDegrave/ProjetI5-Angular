package com.example.TP_DEV_WEB_BACK.services;

import com.example.TP_DEV_WEB_BACK.models.Record;
import com.example.TP_DEV_WEB_BACK.repositories.MusicRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MusicServiceImpl implements MusicService
{
    @Autowired
    MusicRepo musicRepo;

    @Override
    public void save(Record song)
    {
        musicRepo.save(song);
    }
    @Override
    public Record getByName(String name)
    {
        return musicRepo.findByName(name);
    }

    @Override
    public List<Record> getAllMusics() {
        return musicRepo.findAll();
    }
}
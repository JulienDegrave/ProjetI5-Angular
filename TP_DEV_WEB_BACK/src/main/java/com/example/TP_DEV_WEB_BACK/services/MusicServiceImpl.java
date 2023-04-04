package com.example.TP_DEV_WEB_BACK.services;

import com.example.TP_DEV_WEB_BACK.models.Music;
import com.example.TP_DEV_WEB_BACK.repositories.MusicRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MusicServiceImpl implements MusicService
{
    @Autowired
    MusicRepo musicRepo;

    @Override
    public void save(Music song)
    {
        musicRepo.save(song);
    }
    @Override
    public Music getById(Long id)
    {
        return musicRepo.findById(id).orElse(null);
    }

    @Override
    public List<Music> getAllMusics()
    {
        return musicRepo.findAll();
    }
}
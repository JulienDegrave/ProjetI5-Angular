package com.example.TP_DEV_WEB_BACK.services;
import com.example.TP_DEV_WEB_BACK.models.Music;
import java.util.List;

public interface MusicService
{
    void save(Music song);
    Music getById(Long id);

    List<Music> getAllMusics();

}

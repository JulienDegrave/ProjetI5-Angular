package com.example.TP_DEV_WEB_BACK.services;
import com.example.TP_DEV_WEB_BACK.models.Record;
import java.util.List;

public interface MusicService
{
    void save(Record song);
    Record getByName(String name);

    List<Record> getAllMusics();

    boolean deleteRecordByName(String name);
}

package com.example.TP_DEV_WEB_BACK.repositories;

import com.example.TP_DEV_WEB_BACK.models.Record;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MusicRepo extends JpaRepository<Record, Long>
{
    public Record findByName(String name);
}

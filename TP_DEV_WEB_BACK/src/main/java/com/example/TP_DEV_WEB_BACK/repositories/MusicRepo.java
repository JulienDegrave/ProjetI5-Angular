package com.example.TP_DEV_WEB_BACK.repositories;

import com.example.TP_DEV_WEB_BACK.models.Record;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@EnableTransactionManagement
public interface MusicRepo extends JpaRepository<Record, Long>
{
    public Record findByName(String name);
    @Transactional
    public int deleteByName(String name);
}

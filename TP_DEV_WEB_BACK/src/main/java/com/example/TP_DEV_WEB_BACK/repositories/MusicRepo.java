package com.example.TP_DEV_WEB_BACK.repositories;

import com.example.TP_DEV_WEB_BACK.models.Music;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MusicRepo extends JpaRepository<Music, Long>
{

}

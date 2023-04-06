package com.example.TP_DEV_WEB_BACK.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.TP_DEV_WEB_BACK.models.RecordItem;
public interface NoteRepo extends JpaRepository<RecordItem, Long>
{

}

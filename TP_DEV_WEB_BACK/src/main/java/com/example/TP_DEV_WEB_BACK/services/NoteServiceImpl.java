package com.example.TP_DEV_WEB_BACK.services;
import com.example.TP_DEV_WEB_BACK.models.RecordItem;
import com.example.TP_DEV_WEB_BACK.repositories.NoteRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoteServiceImpl implements NoteService
{
    @Autowired
    NoteRepo noteRepo;

    @Override
    public void save(RecordItem recordItem) {
        noteRepo.save(recordItem);
    }

    @Override
    public List<RecordItem> getNotesList() {
        return noteRepo.findAll();
    }
}
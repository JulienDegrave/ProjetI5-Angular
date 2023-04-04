package com.example.TP_DEV_WEB_BACK.services;
import java.util.List;
import com.example.TP_DEV_WEB_BACK.models.Note;

public interface NoteService
{
    void save(Note song);
    List<Note> getNotesList();

}

package com.example.TP_DEV_WEB_BACK.services;
import java.util.List;
import com.example.TP_DEV_WEB_BACK.models.RecordItem;

public interface NoteService
{
    void save(RecordItem song);
    List<RecordItem> getNotesList();

}

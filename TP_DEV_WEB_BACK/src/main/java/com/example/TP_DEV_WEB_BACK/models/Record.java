package com.example.TP_DEV_WEB_BACK.models;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Entity
@Table(name="MUSIC_TABLE")
public class Record {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @OneToMany(orphanRemoval=true, cascade=CascadeType.ALL)
    @JoinColumn(name="record_id") // join column is in table for Note
    private Map<Double,RecordItem> notes;

    public Double getTimeSlot() {
        return timeSlot;
    }

    public void setTimeSlot(Double timeSlot) {
        this.timeSlot = timeSlot;
    }

    private Double timeSlot;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Map<Double,RecordItem> getNotes() {
        return notes;
    }

    public void setNotes(Map<Double,RecordItem> recordItems) {
        this.notes = recordItems;
    }

    public void addNote(RecordItem n, Double time)
    {
        if(this.notes == null)
        {
            this.notes = new HashMap<Double,RecordItem>();
        }
        //this.notes.put(time, n);
    }
}

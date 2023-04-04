package com.example.TP_DEV_WEB_BACK.models;
import com.example.TP_DEV_WEB_BACK.models.Note;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="MUSIC_TABLE")
public class Music {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Integer duration;
    @OneToMany(orphanRemoval=true, cascade=CascadeType.ALL)
    @JoinColumn(name="music_id") // join column is in table for Note
    private List<Note> notes;

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

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public List<Note> getNotes() {
        return notes;
    }

    public void setNotes(List<Note> notes) {
        this.notes = notes;
    }

    public void addNote(Note n)
    {
        if(this.notes == null)
        {
            this.notes = new ArrayList<Note>();
        }
        this.notes.add(n);
    }
}

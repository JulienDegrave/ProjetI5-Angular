package com.example.TP_DEV_WEB_BACK.models;
import jakarta.persistence.*;

@Entity
@Table(name="NOTES_TABLE")
public class RecordItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String note;
    private Double timeout;

    public RecordItem(String n, Double t)
    {
        this.note = n;
        this.timeout = t;

    }
    public RecordItem()
    {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Double getTimeout() {
        return timeout;
    }

    public void setTimeout(Double time) {
        this.timeout = time;
    }
}

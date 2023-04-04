package com.example.TP_DEV_WEB_BACK.controllers;

import com.example.TP_DEV_WEB_BACK.models.Music;
import com.example.TP_DEV_WEB_BACK.models.Note;
import com.example.TP_DEV_WEB_BACK.services.MusicService;
import com.example.TP_DEV_WEB_BACK.services.NoteService;
import com.example.TP_DEV_WEB_BACK.services.NoteServiceImpl;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class test {

    MusicService musicService;
    NoteService noteService;

    private test(MusicService ms, NoteService ns)
    {
        musicService = ms;
        noteService = ns;
    }

    @GetMapping("/hello")
    private String hello()
    {
        return "<h1>Hello world !</h1>";
    }

    @GetMapping("/bulbOn")
    private String bulbOn()
    {
        return "On";
    }

    @GetMapping("/bulbOff")
    private String bulbOff()
    {
        return "Off";
    }
    @GetMapping("/write")
    private String write()
    {
        Note n1 = new Note("D3", 5.77);
        Note n2 = new Note("A#3", 7.17);
        Note n3 = new Note("E3", 17.17);
        Note n4 = new Note();

        Music myMusic = new Music();
        myMusic.setName("Super musique");
        myMusic.setDuration(20);
        myMusic.addNote(n1);
        myMusic.addNote(n2);
        myMusic.addNote(n3);
        myMusic.addNote(n4);

        musicService.save(myMusic);// associer la note à l'objet "Music" sauvegardé précédemment
        //noteService.save(n); // sauvegarder l'objet "Note" après l'objet "Music"

        return "Music written";
    }

    @GetMapping("/getMusic")
    private Music getMusic(@RequestParam Integer id)
    {
        return musicService.getById(Long.valueOf(id));
    }

    @GetMapping("/getAllMusics")
    private List<Music> getAllMusics()
    {
        return musicService.getAllMusics();
    }
}

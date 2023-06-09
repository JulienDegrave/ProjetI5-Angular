import librosa
import numpy as np
import time
from pydub import AudioSegment
from pydub.generators import Sine
import json

def convert_to_json(id, timeslot, name, notes_, times_):
    # Création du dictionnaire de notes
    notes_dict = {}
    for i in range(len(notes_)):
        # Conversion de l'indice de temps en une valeur de temps
        #timeout += int(times[i]) * timeslot
        
        # Ajout de la note au dictionnaire
        note_dict = {
            "id": i+1,
            "note": notes_[i],
            "timeout": 1.5 * 100
        }
        notes_dict[times_[i]] = note_dict
    
    # Création de l'objet JSON final
    json_obj = {
        "id": id,
        "name": name,
        "notes": notes_dict,
        "timeSlot": timeslot
    }
    
    # Encodage de l'objet JSON en une chaîne de caractères JSON
    json_str = json.dumps(json_obj,  ensure_ascii=False)
    
    return json_str

def generate_audio_file(notes, times, filename, duration):
    segment = AudioSegment.silent(duration=duration*1000)
    for note, time in zip(notes, times):
        freq = librosa.note_to_hz(note)
        duration_ms = 300  # 0.4 seconds
        volume = -10  # -10 dBFS
        waveform = Sine(freq).to_audio_segment(duration_ms)
        waveform = waveform + volume
        start_pos = int(time * 1000)
        segment = segment.overlay(waveform, position=start_pos)

    segment.export(filename, format='wav')


def analyzeAudioFile(filepath : str):

    # load audio file
    y, sr = librosa.load(filepath)
    windowLength = 2048
    hop_length = 512  # change hop length to match piptrack default
    spec = librosa.stft(y,hop_length=hop_length)

    onset_env = librosa.onset.onset_strength(y=y, sr=sr,
                                            hop_length=hop_length,
                                            aggregate=np.median)


    print("onset_env")
    print(onset_env)

    peaks = librosa.util.peak_pick(onset_env,  7, 7, 7, 7, 0.5, 5)
    times = librosa.times_like(onset_env, sr=sr, hop_length=hop_length)
    times_keeped = times[peaks]
    print(times_keeped)
    timeSlot = 0.015* 1000
    # get pitches and magnitudes
    pitches, magnitudes = librosa.core.pitch.piptrack(y=y, sr=sr)
    # get note and time for each frame
    notes = []
    times = []
    print(pitches)
    prev_note = None
    prev_time = 0
    for t in range(pitches.shape[1]):
        time = librosa.frames_to_time(t, sr=sr, hop_length=hop_length)
        idx = np.argmax(magnitudes[:, t])
        if pitches[idx, t] > 0:
            freq = pitches[idx, t]
            target_freq = freq
            closest_note = librosa.hz_to_note(
                    librosa.midi_to_hz(
                        np.round(
                            librosa.hz_to_midi(target_freq)
                        )
                    )
                )
            # calculate the difference between the target and actual frequency
            diff = target_freq - freq
            # adjust the frequency of the note
            freq += diff

            
            
            note = librosa.hz_to_note(pitches[idx, t])
            if time in times_keeped:
                time = round(time, 3) * 1000
                print(timeSlot)
                while(time % timeSlot != 0):
                    time = time+1
                    print(time)

                time = time / 1000
                print(time)       
                notes.append(note)
                times.append(time)
                prev_note = note
                prev_time = time

                

    # Fix timeSlot to be multiple of 0.015
    
    #clean_note(times, notes)
    for time, note in zip(times, notes):
            print(time, note)

    print(convert_to_json(200,0.015, "generated_song",notes, times))
    #generate_audio_file(notes,times, "gented_file.wav", duration=len(y)/sr )
    return convert_to_json(111,0.015, "generated_song",notes, times)

def clean_note(times, notes):

    print('')

    lastCharCount = {}
    for time, note in zip(times, notes):
        
        print(time, note)
        # Retrieve last character of note into variable named 'lastChar'
        lastChar = note[-1]
        
        # Count the time of each possible value appears for 'lastChar'
        if lastChar in lastCharCount:
            lastCharCount[lastChar] += 1
        else:
            lastCharCount[lastChar] = 1

    # Retrieve the value that appear the most often in 'lastChar'
    mostCommonLastChar = max(lastCharCount, key=lastCharCount.get)
    print("The most common last character is:", mostCommonLastChar)

    # Remove all note and time entries where their last character is different than 'mostCommonLastChar'
    for i in range(len(notes)-1, -1, -1):
        if notes[i][-1] != mostCommonLastChar:
            notes.pop(i)
            times.pop(i)



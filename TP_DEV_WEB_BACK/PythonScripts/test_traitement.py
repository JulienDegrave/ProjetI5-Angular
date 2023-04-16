import numpy as np
import aubio
from scipy.io import wavfile

def load_audio(filename):
    return aubio.source(filename)

def process_audio():
    filename = "recordPiano.pcm"
    audio_source = load_audio(filename)
    samplerate = audio_source.samplerate

    pitch_detector = aubio.pitch("default", 1024, 1024//2, samplerate)
    detected_pitch = []

    while True:
        samples, read = audio_source()
        pitch = pitch_detector(samples)[0]
        if pitch != 0:
            detected_pitch.append(pitch)
        if read < 2048:
            break

    if len(detected_pitch) > 0:
        pitch_mean = np.mean(detected_pitch)
        note = get_note_from_pitch(pitch_mean)
        print("Detected pitch: {:.2f} Hz".format(pitch_mean))
        print("Mapped note: {}".format(note))
    else:
        print("No pitch detected")

def get_note_from_pitch(pitch):
    note_names = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
    note_index = 12 * (np.log2(pitch / 440) + 1)
    return note_names[round(note_index) % 12]

process_audio()

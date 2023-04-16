import librosa
import numpy as np

# load audio file
y, sr = librosa.load('recordPiano.wav')

# get pitches and magnitudes
pitches, magnitudes = librosa.core.pitch.piptrack(y=y, sr=sr)

# get note for each frame
notes = []
for t in range(pitches.shape[1]):
    idx = np.argmax(magnitudes[:, t])
    if pitches[idx, t] > 0:
        note = librosa.hz_to_note(pitches[idx, t])
    else:
        note = "No note detected"
    notes.append(note)

print(notes)

import librosa
import numpy as np
import os

# Load the audio file
audio_file =  os.getcwd() + "/Back/recordPiano.wav"
y, sr = librosa.load(audio_file)

# Convert the audio signal to frequency-domain representation using Short-Time Fourier Transform (STFT)
stft = librosa.stft(y)

# Compute the magnitude spectrogram of the STFT
mag_spec = np.abs(stft)

# Map the magnitude spectrogram to the Mel scale
mel_spec = librosa.feature.melspectrogram(S=mag_spec, sr=sr)

# Convert the Mel spectrogram to decibels
mel_spec_db = librosa.power_to_db(mel_spec)

# Estimate the pitches of the notes using the Mel spectrogram
pitches, magnitudes = librosa.piptrack(S=mel_spec_db, sr=sr)

print(pitches)
# Convert the pitches to frequencies
frequencies = librosa.core.midi_to_hz(pitches)

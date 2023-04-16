import sounddevice as sd
from scipy.io import wavfile

def RecordVoice():
    duration = 5 # seconds
    sample_rate = 44100 # Hz
    filename = "recording.wav"

    print("Testing microphone for {} seconds...".format(duration))
    recording = sd.rec(int(duration * sample_rate), samplerate=sample_rate, channels=1)
    sd.wait()
    print("Recording finished.")

    # Save recording to WAV file
    wavfile.write(filename, sample_rate, recording)

RecordVoice()

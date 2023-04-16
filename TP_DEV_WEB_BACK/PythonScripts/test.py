import matplotlib.pyplot as plt
from scipy.fftpack import fft
from scipy.io import wavfile
import os
import plotly.graph_objects as go

PATH = ''

# Configuration
FPS = 30
FFT_WINDOW_SECONDS = 0.25 # how many seconds of audio make up an FFT window

# Note range to display
FREQ_MIN = 10
FREQ_MAX = 1000

# Notes to display
TOP_NOTES = 3

# Names of the notes
NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]

# Output size. Generally use SCALE for higher res, unless you need a non-standard aspect ratio.
RESOLUTION = (1920, 1080)
SCALE = 2 # 0.5=QHD(960x540), 1=HD(1920x1080), 2=4K(3840x2160)

# Download my sample audio
# wget https://github.com/jeffheaton/present/raw/master/youtube/video/sample_audio/piano_c_major_scale.wav
AUDIO_FILE = "recordPiano.wav"
fs, data = wavfile.read(os.path.join(PATH,AUDIO_FILE)) # load the data
audio = data # this is a two channel soundtrack, get the first track
FRAME_STEP = (fs / FPS) # audio samples per video frame
FFT_WINDOW_SIZE = int(fs * FFT_WINDOW_SECONDS)
AUDIO_LENGTH = len(audio)/fs

def plot_fft(p, xf, fs, notes, dimensions=(960,540)):
  layout = go.Layout(
      title="frequency spectrum",
      autosize=False,
      width=dimensions[0],
      height=dimensions[1],
      xaxis_title="Frequency (note)",
      yaxis_title="Magnitude",
      font={'size' : 24}
  )

  fig = go.Figure(layout=layout,
                  layout_xaxis_range=[FREQ_MIN,FREQ_MAX],
                  layout_yaxis_range=[0,1]
                  )
  
  fig.add_trace(go.Scatter(
      x = xf,
      y = p))
  
  for note in notes:
    fig.add_annotation(x=note[0]+10, y=note[2],
            text=note[1],
            font = {'size' : 48},
            showarrow=False)
  return fig

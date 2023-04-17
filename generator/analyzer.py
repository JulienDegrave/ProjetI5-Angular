import pyautogui
import pyaudio
import wave


def analyzeAudioFile(filepath : str):

    keys = ['&', '~', '"', '\'', '(', '-', '`', '_', {'x': 1270, 'y': 550}, '@']

    # TBD ===> DIminuer d'une tonality quand on passe au G !
    noteNames = ['A3', 'Db4', 'E4', 'A4', 'Db5', 'E5', 'A5', 'Db6', 'E6', 'A6']
    noteNamesDraw = ['B3', 'E4', 'Ab4', 'B4', 'D5', 'Gb5', 'Ab5', 'B5', 'D6', 'Gb6']

    CHUNK = 1024
    FORMAT = pyaudio.paInt16
    CHANNELS = 2
    RATE = 44100
    RECORD_SECONDS = 2

    print("Start in 2 seconds")
    pyautogui.sleep(2)
    print("Start !")

    audio = pyaudio.PyAudio()


    for i in range(0, 10):

        note=keys[i]
        noteName=noteNames[i]

        print("Record " + noteName)
        
        stream = audio.open(format=FORMAT,
                    input_device_index = 0,
                    channels=CHANNELS,
                    rate=RATE,
                    input=True,
                    frames_per_buffer=CHUNK)
        
        if type(note) is dict:
            pyautogui.moveTo(note['x'], note['y'])
            pyautogui.mouseDown()
        else:
            pyautogui.keyDown(note)
        
        frames = []
        for i in range(0, int(RATE / CHUNK * RECORD_SECONDS)):
            data = stream.read(CHUNK)
            frames.append(data)    

        if type(note) is dict:
            pyautogui.mouseUp()
        else:
            pyautogui.keyUp(note)
        
        stream.stop_stream()
        stream.close()

        wf = wave.open('notes/' + noteName + '.wav', 'wb')
        wf.setnchannels(CHANNELS)
        wf.setsampwidth(audio.get_sample_size(FORMAT))
        wf.setframerate(RATE)
        wf.writeframes(b''.join(frames))
        wf.close()

    pyautogui.keyDown("space")
    for i in range(0, 10):

        note=keys[i]
        noteName=noteNamesDraw[i]

        print("Record " + noteName)
        
        stream = audio.open(format=FORMAT,
                    input_device_index = 0,
                    channels=CHANNELS,
                    rate=RATE,
                    input=True,
                    frames_per_buffer=CHUNK)
        
        if type(note) is dict:
            pyautogui.moveTo(note['x'], note['y'])
            pyautogui.mouseDown()
        else:
            pyautogui.keyDown(note)
        
        frames = []
        for i in range(0, int(RATE / CHUNK * RECORD_SECONDS)):
            data = stream.read(CHUNK)
            frames.append(data)    

        if type(note) is dict:
            pyautogui.mouseUp()
        else:
            pyautogui.keyUp(note)
        
        stream.stop_stream()
        stream.close()

        wf = wave.open('notes/' + noteName + '.wav', 'wb')
        wf.setnchannels(CHANNELS)
        wf.setsampwidth(audio.get_sample_size(FORMAT))
        wf.setframerate(RATE)
        wf.writeframes(b''.join(frames))
        wf.close()    

    audio.terminate()
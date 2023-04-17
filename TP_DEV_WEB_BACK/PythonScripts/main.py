# from flask import Flask, request

# app = Flask(__name__)

# @app.route('/record_analyzer/analyze', methods=['POST'])
# def analyze_record():
#     # Récupération du chemin d'accès vers le fichier audio
#     audio_path = request.get_data(as_text=True)

#     # Analyse du fichier audio
#     # (à remplacer par votre propre code d'analyse)
#     result = analyze(audio_path)

#     # Retourne le résultat au format JSON
#     return result

# # Fonction d'analyse à remplacer par votre propre code
# def analyze(audio_path):
#     return {'result': 'OK'}

# if __name__ == '__main__':
#     app.run(debug=True)


from fastapi import FastAPI
from fastapi.responses import JSONResponse
import json

from analyzer import *

app = FastAPI()


@app.get("/record_analyzer/analyze/")
async def read_item(url: str = ""):
    json_data  = analyzeAudioFile(url)
    return JSONResponse(content=json.loads(json_data))
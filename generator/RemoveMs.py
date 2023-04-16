from pydub import AudioSegment
import os

# Définir le chemin du dossier contenant les fichiers WAV
chemin_dossier = "../MusicTranslator/src/assets/harmo-mp3"

# Parcourir tous les fichiers WAV dans le dossier
for fichier in os.listdir(chemin_dossier):
    if fichier.endswith(".wav"):
        # Charger le fichier WAV avec Pydub
        chemin_fichier = os.path.join(chemin_dossier, fichier)
        audio = AudioSegment.from_file(chemin_fichier, format="wav")
        print(fichier)

        # Retirer les 50 premières millisecondes du fichier
        audio = audio[170:]

        # Écrire le fichier WAV modifié dans le même dossier
        nouveau_nom_fichier = "m_" + fichier
        chemin_nouveau_fichier = os.path.join(chemin_dossier, nouveau_nom_fichier)
        audio.export(chemin_nouveau_fichier, format="wav")
# ProjetI5-Angular

Architecture:
 
==> Dossier Keycloack 

   API d'authentification

==> Dossier MusicTranslator

   Front-end

==> Dossier TP_DEV_WEB_BACK

   Back-end

==> Dossier generator

   Outils python	


### RUN APPLICATION ###


1) Run spring boot application
2) Run Keycloack
	=> cd .\keycloak-21.0.2\keycloak-21.0.2\bin\
	=> .\kc.bat start-dev
3) Run angular application
	=> cd .\MusicTranslator\
	=> npm start
4) Run record analyzer application (optionnal, used to analyze audio record in order to retrieve notes)
	=> cd .\TP_DEV_WEB_BACK\PythonScripts\ 
	=> python.exe -m uvicorn main:app --reload
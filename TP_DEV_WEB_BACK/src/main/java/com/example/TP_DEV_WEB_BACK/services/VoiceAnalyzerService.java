package com.example.TP_DEV_WEB_BACK.services;

import com.example.TP_DEV_WEB_BACK.models.Record;

public interface VoiceAnalyzerService
{
    public Record analyzeAudioFile(String file_path);
}

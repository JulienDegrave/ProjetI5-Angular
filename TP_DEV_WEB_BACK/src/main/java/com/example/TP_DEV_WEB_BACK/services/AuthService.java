package com.example.TP_DEV_WEB_BACK.services;

public interface AuthService {
    String login(String username, String password);

    boolean logout();
}

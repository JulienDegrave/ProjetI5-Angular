package com.example.TP_DEV_WEB_BACK.services;

import org.springframework.http.*;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.stereotype.Service;
import com.example.TP_DEV_WEB_BACK.services.AuthService;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.DefaultResponseErrorHandler;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;

@Service
public class AuthServiceImpl implements AuthService
{
    private static final String TOKEN_ENDPOINT = "http://localhost:8080/realms/SpringBootKeycloack/protocol/openid-connect/token";

    @Override
    public String login(String username, String password)
    {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "password");
        body.add("client_id", "login-app");
        body.add("username", username);
        body.add("password", password);

        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(body, headers);

        RestTemplate restTemplate = new RestTemplate();
        restTemplate.setErrorHandler(new DefaultResponseErrorHandler() {
            @Override
            public boolean hasError(ClientHttpResponse response) throws IOException {
                if (response.getStatusCode() == HttpStatus.UNAUTHORIZED ) {
                    return false; // ignore 401 response without body
                }
                return super.hasError(response);
            }
        });
        ResponseEntity<String> responseEntity = restTemplate.postForEntity(
                TOKEN_ENDPOINT,
                requestEntity,
                String.class
        );

        if(requestEntity.hasBody())
        {
            String accessToken = responseEntity.getBody().split(",")[0].split(":")[1].replaceAll("\"", "");

            return accessToken;
        }

        return null;
    }

    @Override
    public boolean logout() {
        return false;
    }
}

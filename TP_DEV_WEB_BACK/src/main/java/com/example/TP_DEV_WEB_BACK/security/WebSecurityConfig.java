package com.example.TP_DEV_WEB_BACK.security;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    public static final String ADMIN = "admin";
    public static final String USER = "user";
    private final JwtAuthConverter jwtAuthConverter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception
    {

        Logger logger = (Logger) LoggerFactory.getLogger(WebSecurityConfig.class);
        logger.info("SecurityFilterChain");
        http.cors().and() // add CORS configuration
                .authorizeHttpRequests()
                .requestMatchers(HttpMethod.GET, "/api/getAllRecords").hasRole(USER)
                .requestMatchers(HttpMethod.GET, "/api/getRecord/**").hasRole(USER)
                .requestMatchers(HttpMethod.DELETE, "/api/deleteRecord/**").hasRole("USER")
                .requestMatchers(HttpMethod.POST, "/login").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/write").hasRole(USER)
                .requestMatchers(HttpMethod.POST, "/api/computeVoiceRecord").hasRole(USER)
                .requestMatchers(HttpMethod.GET, "/api/admin").hasRole(ADMIN)
                .requestMatchers(HttpMethod.GET, "/api/user").hasAnyRole(ADMIN, USER)
                .anyRequest().authenticated()
                .and().csrf().disable();
        http.oauth2ResourceServer()
                .jwt()
                .jwtAuthenticationConverter(jwtAuthConverter);
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*")); // set allowed origins
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}
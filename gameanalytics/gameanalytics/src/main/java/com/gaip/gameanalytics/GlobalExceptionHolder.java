package com.gaip.gameanalytics;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestControllerAdvice
public class GlobalExceptionHolder {
    @ExceptionHandler(PlayerNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String handlePlayerException(PlayerNotFoundException ex){
        return ex.getMessage();
    }
}

package com.lionelstudio.app.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String home() {

        return "user/home";
    }

    @GetMapping("/admin")
    public String admin() {

        return "admin/dashboard";
    }
}
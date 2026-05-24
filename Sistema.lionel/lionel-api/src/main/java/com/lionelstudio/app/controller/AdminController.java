package com.lionelstudio.app.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AdminController {

    @GetMapping("/admin/login")
    public String login() {
        return "admin/login";
    }

    @GetMapping("/admin/dashboard")
    public String dashboard() {
        return "admin/dashboard";
    }

    @GetMapping("/admin/imagens")
    public String imagens() {
        return "admin/imagens";
    }

    @GetMapping("/admin/demandas")
    public String demandas() {
        return "admin/demandas";
    }
}
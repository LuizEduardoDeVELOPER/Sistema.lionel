package com.lionelstudio.app.controller;

import com.lionelstudio.app.entity.TattooImage;
import com.lionelstudio.app.repository.TattooImageRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tattoos")
public class TattooController {

    private final TattooImageRepository repository;

    public TattooController(TattooImageRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<TattooImage> listar() {
        return repository.findAll();
    }

    @PostMapping
    public TattooImage salvar(@RequestBody TattooImage tattoo) {
        return repository.save(tattoo);
    }
}
package com.lionelstudio.app.service;

import com.lionelstudio.app.entity.TattooImage;
import com.lionelstudio.app.repository.TattooImageRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TattooImageService {

    private final TattooImageRepository repository;

    public TattooImageService(TattooImageRepository repository) {
        this.repository = repository;
    }

    public List<TattooImage> getAllImages() {
        return repository.findAll();
    }

    public TattooImage saveImage(TattooImage tattooImage) {
    return repository.save(tattooImage);
}
}
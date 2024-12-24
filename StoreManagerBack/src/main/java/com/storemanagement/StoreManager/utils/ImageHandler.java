package com.storemanagement.StoreManager.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Component
public class ImageHandler {
    
    @Value("${product.image.upload-dir}")
    private String uploadDir;
    
    public String saveImage(MultipartFile image) throws IOException {
        String fileName = image.getOriginalFilename();
        File dest = new File(uploadDir, fileName);
        image.transferTo(dest);
        return fileName;
    }
    
}

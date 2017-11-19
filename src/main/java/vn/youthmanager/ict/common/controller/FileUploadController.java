package vn.youthmanager.ict.common.controller;

import java.util.Locale;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import vn.youthmanager.ict.common.service.FileUploadService;

/**
 * @author Khoa Le
 */
@Controller
@RequestMapping(value = "/fileUploadForm")
public class FileUploadController {

	@Autowired
	private FileUploadService fileUploadService;

	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String top(Locale locale, Model model) {
		return "common/fileUploadForm";
	}

	/**
     * Process file uploaded from client
     * 
     * @param request : MultipartHttpServletRequest
     * @param response : HttpServletResponse
     * @return upload result
     */
    @RequestMapping(value = "/upload", method = RequestMethod.POST)
    public @ResponseBody String upload(MultipartHttpServletRequest request, HttpServletResponse response) {
        // start uploading
        String uploadResult = fileUploadService.uploadFile(request);
        // upload result: -1: failed/1: successful
        return uploadResult;
    }

    /**
     * Process image loading on client
     * 
     * @param imageName : image name received from client
     * @return image data in byte array
     */
    @RequestMapping(value = "/image/{imageName}")
    @ResponseBody
    public byte[] getImage(@PathVariable(value = "imageName") String imageName) {
        return fileUploadService.getImage(imageName);
    }

    /**
     * Delete image
     * 
     * @param imageName : image name received from client
     * @return delete result
     */
    @RequestMapping(value = "/deleteImage")
    @ResponseBody
    public String deleteImage(@RequestParam(value = "imageName") String imageName) {
        return fileUploadService.deleteImage(imageName);
    }

    /**
     * Show full image on client
     * 
     * @param imageName : image name received from client
     * @return image data in ResponseEntity
     */
    @RequestMapping(value = "/showImage/{imageName}", method = RequestMethod.GET)
    public ResponseEntity<byte[]> showImage(@PathVariable(value = "imageName") String imageName) {
    	return fileUploadService.showImage(imageName);
    }
}

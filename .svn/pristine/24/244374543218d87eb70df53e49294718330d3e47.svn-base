package vn.youthmanager.ict.common.service;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;

import org.apache.log4j.Logger;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import vn.youthmanager.ict.common.cnst.Constants;
import vn.youthmanager.ict.common.util.Util;

/**
 * @author Khoa Le
 */
@Service
public class FileUploadService {

	private static Logger logger = Logger.getLogger(FileUploadService.class);

	// Variables definition
	private static final String LOG_INFO_PREFIX = "INFO,";
	private static final String LOG_ERROR_PREFIX = "ERROR,";

	/**
     * Process file uploaded from client
     * 
     * @param request�@: MultipartHttpServletRequest
     * @return upload result
     */
    public String uploadFile(MultipartHttpServletRequest request) {
    	// variable definition
        String returnData = Constants.UPLOAD_RESULT_SUCCESSFUL;
        String fileName = "";

        logger.info(LOG_INFO_PREFIX + Util.getUserInfo().getID() + ",Upload file starts");

        // get file
        Iterator<String> itr = request.getFileNames();
        MultipartFile file = request.getFile(itr.next());
        // create folder if not existed
        File uploadFolder = new File(Constants.UPLOAD_PATH);
        if (!uploadFolder.exists()) {
        	uploadFolder.mkdirs();
        }
        // create file name
        DateFormat dateFormat = new SimpleDateFormat("yyyyMMddHHmmss");
        Date date = new Date();
        fileName = Util.getUserInfo().getID() + "_UPLOAD_" + dateFormat.format(date);
        // start creating file
        File uploadFile = new File(Constants.UPLOAD_PATH + fileName + ".jpg");
        try {
        	BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(uploadFile));
            stream.write(file.getBytes());
            stream.close();
            logger.info(LOG_INFO_PREFIX + Util.getUserInfo().getID() + ",Upload file successfully");
            // return file name to client
            returnData = fileName;
        } catch (Exception ex) {
        	ex.printStackTrace();
            logger.error(LOG_ERROR_PREFIX + Util.getUserInfo().getID() + ",java.lang.Exception: " + ex.getMessage());
            returnData = Constants.UPLOAD_RESULT_FAILED;
        }

        return returnData;
    }

    /**
     * Get image file from path to display on client
     * 
     * @param imageName : image name received from client
     * @return image data in byte array
     */
	public byte[] getImage(String imageName) {
		// create folder if not existed
        File uploadFolder = new File(Constants.UPLOAD_PATH);
        if (!uploadFolder.exists()) {
        	uploadFolder.mkdirs();
        }
        // start getting file
        File serverFile = new File(Constants.UPLOAD_PATH + imageName + ".jpg");
		try {
			return Files.readAllBytes(serverFile.toPath());
		} catch (IOException ex) {
			ex.printStackTrace();
            logger.error(LOG_ERROR_PREFIX + Util.getUserInfo().getID() + ",java.io.IOException: " + ex.getMessage());
			return null;
		}
	}

	/**
	 * Delete image file based on image name
	 * 
	 * @param imageName : image name received from client
	 * @return String : delete successfully: 1/delete failed: -1
	 */
	public String deleteImage(String imageName) {
		// variable definition
        String returnValue = Constants.DELETE_RESULT_SUCCESSFUL;
        // create folder if not existed
        File uploadFolder = new File(Constants.UPLOAD_PATH);
        if (!uploadFolder.exists()) {
        	uploadFolder.mkdirs();
        }
        // start getting file
        File serverFile = new File(Constants.UPLOAD_PATH + imageName + ".jpg");
		if (!serverFile.delete()) {
			// delete failed
			returnValue = Constants.DELETE_RESULT_FAILED;
		}
		return returnValue;
	}

	/**
     * Show full image on client
     * 
     * @param imageName : image name received from client
     * @return image data in ResponseEntity
     */
	public ResponseEntity<byte[]> showImage(String imageName) {
		// get image as byte array
	    byte[] media = getImage(imageName);
	    // return image to client with headers
	    HttpHeaders headers = new HttpHeaders();
	    headers.setContentType(MediaType.IMAGE_JPEG);
	    ResponseEntity<byte[]> responseEntity = new ResponseEntity<byte[]>(media, headers, HttpStatus.OK);
	    return responseEntity;
	}
}

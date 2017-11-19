package vn.youthmanager.ict.common.cnst;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class Constants {

	// Constants definition
	// Upload path
	public static final String UPLOAD_PATH = "C:/Banana Data/images/";

	// Role type value
	public static final String ROLE_TYPE_SYSTEM_MANAGER = "1";
	public static final String ROLE_TYPE_BUSINESS_MANAGER = "2";
	public static final String ROLE_TYPE_FARM_MANAGER = "3";
	public static final String ROLE_TYPE_AREA_MANAGER = "4";

	// Delete flag value
	public static final String DELETE_FLAG_ON = "1";
	public static final String DELETE_FLAG_OFF = "0";

	// Default Charater for DB
	public static final String REPORT_CHARATER = "R";
	public static final String DETAIL_REPORT_CHARATER = "D";
	public static final String CATE_CHARATER = "C";
	public static final String CRITERIA_CHARATER = "CR";
	public static final String UNIVERSITY_CHARATER = "UN";
	public static final String COUNTRY_CHARATER = "CO";
	public static final String CITY_CHARATER = "CI";
	public static final String DISTRICT_CHARATER = "DI";
	public static final String WARDS_CHARATER = "W";
	public static final String TOWN_CHARATER = "T";
	public static final String GROUPS_CHARATER = "G";
	public static final String SPECIALIZED_REPORT_CHARATER = "SP";
	public static final String PERSON_CHARATER = "PE";
	public static final String NOTE_REPORT_CHARATER = "NT";
	public static final String PROCESS_PERSON_CHARATER = "PP";
	public static final String FAMILY_RELATION_PERSON_CHARATER = "FP";
	public static final String EDUCATION_CHARATER = "E";
	public static final String SIGNATURE_CHARATER = "S";
	// report Default 
	public static final Integer REPORT_DEFAULT = 999;
	public static final Integer DEFAULT_ID = 999;
	public static final Integer PERSON_DEFAULT_ID = 99999;
	public static final String DEFAULT_PARAMS = "9999";
	// flag value
	public static final String FLAG_OFF = "1";
	public static final String FLAG_ON = "2";
	// Max Length ID
	public static final Integer MAX_LENGHT_ID = 3;
	// Constant used when searching data: Nothing is searched
    public static final String SEARCH_CONDITION_NO_SELECT = "-2";
    // When blank fields exist
 	public static final String VALIDATE_BLANK_FIELDS = "-2";
 	// When field is in wrong format
 	public static final String VALIDATE_WRONG_FORMAT = "-3";
 	// When new password and new password confirm do not match
 	public static final String VALIDATE_PASSWORD_NOT_MATCH = "-4";
 	// When current password is not correct
  	public static final String VALIDATE_PASSWORD_NOT_CORRECT = "-5";
    // Update info to DB successfully
    public static final String UPDATE_RESULT_SUCCESSFUL = "1";
    // Update info to DB failed
    public static final String UPDATE_RESULT_FAILED = "-1";
    // Insert info to DB successfully
    public static final String INSERT_RESULT_SUCCESSFUL = "1";
    // Insert info to DB with duplicated id
    public static final String INSERT_RESULT_DUPLICATED = "0";
    // Insert info to DB with wrong config
    public static final String INSERT_RESULT_CONFIG_NOT_CORRECT = "-6";
    // Insert info to DB failed
    public static final String INSERT_RESULT_FAILED = "-1";
    // Delete info to DB successfully
    public static final String DELETE_RESULT_SUCCESSFUL = "1";
    // Delete info to DB failed
    public static final String DELETE_RESULT_FAILED = "-1";
    // Upload file to server successfully
    public static final String UPLOAD_RESULT_SUCCESSFUL = "1";
    // Upload file to server failed
    public static final String UPLOAD_RESULT_FAILED = "-1";
    
    public static String encryptMD5(String input) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] messageDigest = md.digest(input.getBytes());
            BigInteger number = new BigInteger(1, messageDigest);
            String hashtext = number.toString(16);
            while (hashtext.length() < 32) {
                hashtext = "0" + hashtext;
            }
            return hashtext;
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }
}
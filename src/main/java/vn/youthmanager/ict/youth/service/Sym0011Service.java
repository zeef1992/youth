package vn.youthmanager.ict.youth.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import vn.youthmanager.ict.common.cnst.Constants;
import vn.youthmanager.ict.common.cnst.LoggerMessage;
import vn.youthmanager.ict.common.db.model.QltnMCountry;
import vn.youthmanager.ict.common.util.Util;
import vn.youthmanager.ict.youth.dao.Sym0011Dao;
import vn.youthmanager.ict.youth.db.model.Sym0011Conditions;
import vn.youthmanager.ict.youth.db.model.Sym0011Result;

@Service
public class Sym0011Service {

	private static Logger logger = Logger.getLogger(Sym0003Service.class);
	
	@Autowired
	private Sym0011Dao Sym0011Dao;
	
	// Variables definition
    PlatformTransactionManager txManager;
    @Autowired
    private ApplicationContext appContext;
    

    /**
     * Search University in DB based on search conditions received from client
     * 
     * @param searchConditions : data received from client
     * @return List of Universitys data
     */
	public List<Sym0011Result> searchData(Sym0011Conditions searchConditions) {
		List<Sym0011Result> bnn0018ResultList = new ArrayList<Sym0011Result>();
        HashMap<String, Object> params = createSearchConditionParams(searchConditions);
        try {
            logger.info(LoggerMessage.SEARCHING_STRATED);
            // search starts
            bnn0018ResultList = Sym0011Dao.getSym0011Mapper().searchData(params);
            logger.info(LoggerMessage.EXECUTION_FINISHED);
            if (bnn0018ResultList.size() > 0) {
                // "real" total from search result
                String searchDataTotalCounts = Sym0011Dao.getSym0011Mapper().getSearchDataTotalCounts(params);
                bnn0018ResultList.get(0).setSearchDataTotalCounts(searchDataTotalCounts);
                // handle University input data
                convertSanitize(bnn0018ResultList);
                logger.info(LoggerMessage.SEARCHING_FINISHED);
                logger.info("  ==> " + searchDataTotalCounts + " item(s)");
            } else {
                logger.info(LoggerMessage.SEARCHING_FINISHED);
                logger.info(LoggerMessage.ZERO_ITEM);
            }
        } catch (OutOfMemoryError ex) {
            ex.printStackTrace();
            Sym0011Result tempObj = new Sym0011Result();
            tempObj.setSearchDataTotalCounts("-1");
            bnn0018ResultList.add(tempObj);
        } catch (Exception ex) {
            ex.printStackTrace();
            bnn0018ResultList = null;
        }
        return bnn0018ResultList;
	}
	
	/**
     * Create search conditions parameters from data received from client
     * 
     * @param searchConditions : data received from client
     * @return HashMap object
     */
    private HashMap<String, Object> createSearchConditionParams(Sym0011Conditions searchConditions) {
        HashMap<String, Object> params = new HashMap<String, Object>();
        // country Name
        params.put("countryName", searchConditions.getCountryName().equals("") ? "" : "%" + searchConditions.getCountryName() + "%");
        // country Code
        params.put("countryCode", searchConditions.getCountryCode().equals("") ? "" : "%" + searchConditions.getCountryCode() + "%");
        // From parameter
        params.put("fromRow", Integer.valueOf(searchConditions.getFromRow()));
        // Number of items in a page
        params.put("itemCount", Integer.valueOf(searchConditions.getItemCount()));

        return params;
    }
	
    
	/**
     * Handle University input data
     * 
     * @param inputData : search result data list
     */
    private void convertSanitize(List<Sym0011Result> inputData) {
        for (int i = 0; i < inputData.size(); i++) {
        	Sym0011Result currentData = inputData.get(i);
            // University Name
            currentData.setCountryName(Util.convertSanitize(currentData.getCountryName()));
            // University Code
            currentData.setCountryCode(Util.convertSanitize(currentData.getCountryCode()));
        }
    }
    
    /**
     * Update Country's information to DB
     * 
     * @param UniversityData : data received from client
     * @return String : update successfully: 1/update failed: -1
     */
    public String updateData(QltnMCountry universityData) {
        // variable definition
        String returnValue = Constants.UPDATE_RESULT_SUCCESSFUL;
        // update starts
        try {
        	// check logged in University id
            if (Util.getUserInfo().getID() == null) {
            	logger.error(LoggerMessage.ERROR_MESSAGE+ "Could not get logged in Country's id");
                returnValue = Constants.UPDATE_RESULT_FAILED;
                return returnValue;
            }
            // check for Report input
            if (!checkInputBlankFields(universityData)) {
            	// blank field(s)
            	logger.error(LoggerMessage.ERROR_MESSAGE +"Blank fields");
                returnValue = Constants.VALIDATE_BLANK_FIELDS;
                return returnValue;
            }
            // transaction starts
            DefaultTransactionDefinition def = new DefaultTransactionDefinition();
            def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
            txManager = (PlatformTransactionManager) appContext.getBean("transactionManager");
            TransactionStatus status = txManager.getTransaction(def);
            try {
            	QltnMCountry universityObj = new QltnMCountry();
            	// University Id
            	universityObj.setCountryId(universityData.getCountryId());
                // University Name
            	universityObj.setCountryName(universityData.getCountryName());
            	// University Code
            	universityObj.setCountryCode(universityData.getCountryCode());
            	// update User id
        		universityObj.setUpdateUserId(Util.getUserInfo().getID());
                // delete flag
                universityObj.setDeleteFlag(universityData.getDeleteFlag());

                int result = Sym0011Dao.getQltnMCountryMapper().updateByPrimaryKeySelective(universityObj);
                if (result > 0) { // update successfully
                    // register to DB
                    txManager.commit(status);
                } else {
                    returnValue = Constants.UPDATE_RESULT_FAILED;
                    txManager.rollback(status);
                }
            } catch (Exception ex) {
                ex.printStackTrace();
                logger.error(LoggerMessage.ERROR_MESSAGE + ex.getMessage());
                returnValue = Constants.UPDATE_RESULT_FAILED;
                txManager.rollback(status);
            } 
        } catch (Exception ex) {
            ex.printStackTrace();
            logger.error(LoggerMessage.ERROR_MESSAGE + ex.getMessage());
            returnValue = Constants.UPDATE_RESULT_FAILED;
        }
        return returnValue;
    }

    /**
     * Insert Country's information to DB
     * 
     * @param UniversityData : data received from client
     * @return String : insert successfully: 1/insert failed: -1
     */
    public String insertData(QltnMCountry countryData) {
        // variable definition
        String returnValue = Constants.INSERT_RESULT_SUCCESSFUL;
        // insert starts
        try {
        	// check logged in University id
        	if (Util.getUserInfo().getID() == null) {
            	logger.error("Error message: Could not get logged in Country's id");
                returnValue = Constants.INSERT_RESULT_FAILED;
                return returnValue;
            }
        	// check for University input
            if (!checkInputBlankFields(countryData)) {
            	// blank field(s)
            	logger.error("Error message: Blank fields");
                returnValue = Constants.VALIDATE_BLANK_FIELDS;
                return returnValue;
            }
        	// transaction starts
            DefaultTransactionDefinition def = new DefaultTransactionDefinition();
            def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
            txManager = (PlatformTransactionManager) appContext.getBean("transactionManager");
            TransactionStatus status = txManager.getTransaction(def);
            try {
            	HashMap<String, Object> params = new HashMap<String, Object>();
            	params.put("countryIdDefault", Constants.DEFAULT_PARAMS);
            	String idNumberStr = Sym0011Dao.getSym0011Mapper().getLastIdCountry(params);
            	int idNumber = 0;
            	if (idNumberStr != null) {
            		idNumber = Integer.parseInt(idNumberStr.substring(2));
            	}
            	if (idNumber < Constants.DEFAULT_ID) {
            		idNumber = idNumber + 1;
            		String countryId = Constants.COUNTRY_CHARATER + String.format("%0" + Constants.MAX_LENGHT_ID + "d", idNumber);
            		QltnMCountry universityObj = new QltnMCountry();
            		// countryId 
            		universityObj.setCountryId(countryId);
            		// University Code
            		universityObj.setCountryCode(countryData.getCountryCode());
                    // University Name
            		universityObj.setCountryName(countryData.getCountryName());
                    // create University id
            		universityObj.setCreateUserId(Util.getUserInfo().getID());
                    // update User id
            		universityObj.setUpdateUserId(Util.getUserInfo().getID());
                    // delete flag
            		universityObj.setDeleteFlag(Constants.DELETE_FLAG_OFF);

                    int result = Sym0011Dao.getQltnMCountryMapper().insert(universityObj);
                    if (result > 0) { // insert successfully
                        // register to DB
                        txManager.commit(status);
                    } else {
                        returnValue = Constants.INSERT_RESULT_FAILED;
                        txManager.rollback(status);
                    }
            	}
            } catch (DuplicateKeyException ex) {
                ex.printStackTrace();
                logger.error("Error message: " + ex.getMessage());
                returnValue = Constants.INSERT_RESULT_DUPLICATED;
                txManager.rollback(status);
            }  catch (Exception ex) {
                ex.printStackTrace();
                logger.error("Error message: " + ex.getMessage());
                returnValue = Constants.INSERT_RESULT_FAILED;
                txManager.rollback(status);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
            logger.error("Error message: " + ex.getMessage());
            returnValue = Constants.INSERT_RESULT_FAILED;
        }
        return returnValue;
    }
    /**
     * Delete University from DB
     * 
     * @param criteriaID : Country's id to delete
     * @return String : delete successfully: 1/delete failed: -1
     */
    public String deleteData(String countryId) {
    	// variable definition
        String returnValue = Constants.DELETE_RESULT_SUCCESSFUL;
        // delete starts
        try {
        	// transaction starts
            DefaultTransactionDefinition def = new DefaultTransactionDefinition();
            def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
            txManager = (PlatformTransactionManager) appContext.getBean("transactionManager");
            TransactionStatus status = txManager.getTransaction(def);
            try {
            	QltnMCountry QltnMCountry = new QltnMCountry();
            	QltnMCountry.setCountryId(countryId);
            	QltnMCountry.setDeleteFlag(Constants.DELETE_FLAG_ON);
            	// update University id
            	QltnMCountry.setUpdateUserId(Util.getUserInfo().getID());
                int result = Sym0011Dao.getQltnMCountryMapper().updateByPrimaryKeySelective(QltnMCountry);
                if (result > 0) { // delete successfully
                    // register to DB
                    txManager.commit(status);
                } else {
                    returnValue = Constants.DELETE_RESULT_FAILED;
                    txManager.rollback(status);
                }
            } catch (Exception ex) {
                ex.printStackTrace();
                logger.error("Error message: " + ex.getMessage());
                returnValue = Constants.DELETE_RESULT_FAILED;
                txManager.rollback(status);
            } 
        } catch (Exception ex) {
            ex.printStackTrace();
            logger.error("Error message: " + ex.getMessage());
            returnValue = Constants.DELETE_RESULT_FAILED;
        }
        return returnValue;
	}

    /**
     * Get University information based on Country's id
     * 
     * @param criteriaID : Country's id received from client
     * @return University data
     */
	public QltnMCountry getSingleData(String countryId) {
		return Sym0011Dao.getQltnMCountryMapper().selectByPrimaryKey(countryId);
	}

    /**
     * Check input: blank fields
     * 
     * @param UniversityData : data received from client
     * @return boolean : all fields have value: true/blank fields exist: false
     */
 	private boolean checkInputBlankFields(QltnMCountry countryData) {
 		if (countryData.getCountryName().equals("")) {
 			return false;
 		} else {
 			return true;
 		}
 	}
}

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
import vn.youthmanager.ict.common.db.model.QltnMEducational;
import vn.youthmanager.ict.common.util.Util;
import vn.youthmanager.ict.youth.dao.Sym0022Dao;
import vn.youthmanager.ict.youth.db.model.Sym0022Conditions;
import vn.youthmanager.ict.youth.db.model.Sym0022Result;

@Service
public class Sym0022Service {

private static Logger logger = Logger.getLogger(Sym0003Service.class);
	
	@Autowired
	private Sym0022Dao Sym0022Dao;
	
	// Variables definition
    PlatformTransactionManager txManager;
    @Autowired
    private ApplicationContext appContext;
    

    /**
     * Search user in DB based on search conditions received from client
     * 
     * @param searchConditions : data received from client
     * @return List of users data
     */
	public List<Sym0022Result> searchData(Sym0022Conditions searchConditions) {
		List<Sym0022Result> bnn0022ResultList = new ArrayList<Sym0022Result>();
        HashMap<String, Object> params = createSearchConditionParams(searchConditions);
        try {
            logger.info(LoggerMessage.SEARCHING_STRATED);
            // search starts
            bnn0022ResultList = Sym0022Dao.getSym0022Mapper().searchData(params);
            logger.info(LoggerMessage.EXECUTION_FINISHED);
            if (bnn0022ResultList.size() > 0) {
                // "real" total from search result
                String searchDataTotalCounts = Sym0022Dao.getSym0022Mapper().getSearchDataTotalCounts(params);
                bnn0022ResultList.get(0).setSearchDataTotalCounts(searchDataTotalCounts);
                // handle user input data
                convertSanitize(bnn0022ResultList);
                logger.info(LoggerMessage.SEARCHING_FINISHED);
                logger.info("  ==> " + searchDataTotalCounts + " item(s)");
            } else {
                logger.info(LoggerMessage.SEARCHING_FINISHED);
                logger.info(LoggerMessage.ZERO_ITEM);
            }
        } catch (OutOfMemoryError ex) {
            ex.printStackTrace();
            Sym0022Result tempObj = new Sym0022Result();
            tempObj.setSearchDataTotalCounts("-1");
            bnn0022ResultList.add(tempObj);
        } catch (Exception ex) {
            ex.printStackTrace();
            bnn0022ResultList = null;
        }
        return bnn0022ResultList;
	}
	
	/**
     * Create search conditions parameters from data received from client
     * 
     * @param searchConditions : data received from client
     * @return HashMap object
     */
    private HashMap<String, Object> createSearchConditionParams(Sym0022Conditions searchConditions) {
        HashMap<String, Object> params = new HashMap<String, Object>();
        // Level
        params.put("level", searchConditions.getLevel().equals("") ? "" : "%" + searchConditions.getLevel() + "%");
        // From parameter
        params.put("fromRow", Integer.valueOf(searchConditions.getFromRow()));
        // Number of items in a page
        params.put("itemCount", Integer.valueOf(searchConditions.getItemCount()));

        return params;
    }
	
    
	/**
     * Handle user input data
     * 
     * @param inputData : search result data list
     */
    private void convertSanitize(List<Sym0022Result> inputData) {
        for (int i = 0; i < inputData.size(); i++) {
        	Sym0022Result currentData = inputData.get(i);
            // Level
            currentData.setLevel(Util.convertSanitize(currentData.getLevel()));
        }
    }
    
    /**
     * Update user's information to DB
     * 
     * @param educationData : data received from client
     * @return String : update successfully: 1/update failed: -1
     */
    public String updateData(QltnMEducational educationData) {
        // variable definition
        String returnValue = Constants.UPDATE_RESULT_SUCCESSFUL;
        // update starts
        try {
        	// check logged in user id
            if (Util.getUserInfo().getID() == null) {
            	logger.error(LoggerMessage.ERROR_MESSAGE+ "Could not get logged in user's id");
                returnValue = Constants.UPDATE_RESULT_FAILED;
                return returnValue;
            }
            // check for Report input
            if (!checkInputBlankFields(educationData)) {
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
            	QltnMEducational educationObj = new QltnMEducational();
            	// Report Id
            	educationObj.setEducationId(educationData.getEducationId());
                // Report Name
            	educationObj.setLevel(educationData.getLevel());
                // delete flag
                educationObj.setDeleteFlag(educationData.getDeleteFlag());

                int result = Sym0022Dao.getQltnMEducationalMapper().updateByPrimaryKeySelective(educationObj);
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
     * Insert user's information to DB
     * 
     * @param educationData : data received from client
     * @return String : insert successfully: 1/insert failed: -1
     */
    public String insertData(QltnMEducational educationData) {
        // variable definition
        String returnValue = Constants.INSERT_RESULT_SUCCESSFUL;
        // insert starts
        try {
        	// check logged in user id
        	if (Util.getUserInfo().getID() == null) {
            	logger.error("Error message: Could not get logged in user's id");
                returnValue = Constants.INSERT_RESULT_FAILED;
                return returnValue;
            }
        	// check for user input
            if (!checkInputBlankFields(educationData)) {
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
            	params.put("educationIdDefault", Constants.DEFAULT_PARAMS);
            	int idNumber = Integer.parseInt(Sym0022Dao.getSym0022Mapper().getLastIdEducation(params).substring(1));
            	if (idNumber < Constants.REPORT_DEFAULT) {
            		idNumber = idNumber + 1;
            		String educationId = Constants.EDUCATION_CHARATER + String.format("%0" + Constants.MAX_LENGHT_ID + "d", idNumber);
            		QltnMEducational educationObj = new QltnMEducational();
            		// Education Id 
            		educationObj.setEducationId(educationId);
                    // Level
                    educationObj.setLevel(educationData.getLevel());
                    // create user id
                    educationObj.setCreateUserId(Util.getUserInfo().getID());
                    // update user id
                    educationObj.setUpdateUserId(Util.getUserInfo().getID());
                    // delete flag
                    educationObj.setDeleteFlag(Constants.DELETE_FLAG_OFF);

                    int result = Sym0022Dao.getQltnMEducationalMapper().insert(educationObj);
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
     * Delete user from DB
     * 
     * @param usersId : user's id to delete
     * @return String : delete successfully: 1/delete failed: -1
     */
    public String deleteData(String educationId) {
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
                int result = Sym0022Dao.getQltnMEducationalMapper().deleteByPrimaryKey(educationId);
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
     * Get educational information based on education's id
     * 
     * @param usersId : user's id received from client
     * @return user data
     */
	public QltnMEducational getSingleData(String educationId) {
		return Sym0022Dao.getQltnMEducationalMapper().selectByPrimaryKey(educationId);
	}

    /**
     * Check input: blank fields
     * 
     * @param educationData : data received from client
     * @return boolean : all fields have value: true/blank fields exist: false
     */
 	private boolean checkInputBlankFields(QltnMEducational educationData) {
 		if (educationData.getLevel().equals("")) {
 			return false;
 		} else {
 			return true;
 		}
 	}
}

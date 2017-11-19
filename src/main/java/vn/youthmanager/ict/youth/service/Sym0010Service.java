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
import vn.youthmanager.ict.common.db.model.QltnMSignature;
import vn.youthmanager.ict.common.util.Util;
import vn.youthmanager.ict.youth.dao.Sym0010Dao;
import vn.youthmanager.ict.youth.db.model.Sym0010Conditions;
import vn.youthmanager.ict.youth.db.model.Sym0010Result;

@Service
public class Sym0010Service {

private static Logger logger = Logger.getLogger(Sym0003Service.class);
	
	@Autowired
	private Sym0010Dao Sym0010Dao;
	
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
	public List<Sym0010Result> searchData(Sym0010Conditions searchConditions) {
		List<Sym0010Result> bnn0022ResultList = new ArrayList<Sym0010Result>();
        HashMap<String, Object> params = createSearchConditionParams(searchConditions);
        try {
            logger.info(LoggerMessage.SEARCHING_STRATED);
            // search starts
            bnn0022ResultList = Sym0010Dao.getSym0010Mapper().searchData(params);
            logger.info(LoggerMessage.EXECUTION_FINISHED);
            if (bnn0022ResultList.size() > 0) {
                // "real" total from search result
                String searchDataTotalCounts = Sym0010Dao.getSym0010Mapper().getSearchDataTotalCounts(params);
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
            Sym0010Result tempObj = new Sym0010Result();
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
    private HashMap<String, Object> createSearchConditionParams(Sym0010Conditions searchConditions) {
        HashMap<String, Object> params = new HashMap<String, Object>();
        // singatureName
        params.put("signatureName", searchConditions.getSignatureName().equals("") ? "" : "%" + searchConditions.getSignatureName() + "%");
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
    private void convertSanitize(List<Sym0010Result> inputData) {
        for (int i = 0; i < inputData.size(); i++) {
        	Sym0010Result currentData = inputData.get(i);
            // signature Name
            currentData.setSignatureName(Util.convertSanitize(currentData.getSignatureName()));
        }
    }
    
    /**
     * Update user's information to DB
     * 
     * @param signatureData : data received from client
     * @return String : update successfully: 1/update failed: -1
     */
    public String updateData(QltnMSignature signatureData) {
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
            // check for signature input
            if (!checkInputBlankFields(signatureData)) {
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
            	QltnMSignature educationObj = new QltnMSignature();
            	// signature Id
            	educationObj.setSignatureId(signatureData.getSignatureId());
                // signature Name
            	educationObj.setSignatureName(signatureData.getSignatureName());
                // delete flag
                educationObj.setDeleteFlag(signatureData.getDeleteFlag());

                int result = Sym0010Dao.getQltnMSignatureMapper().updateByPrimaryKeySelective(educationObj);
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
     * Insert signature's information to DB
     * 
     * @param signatureData : data received from client
     * @return String : insert successfully: 1/insert failed: -1
     */
    public String insertData(QltnMSignature signatureData) {
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
            if (!checkInputBlankFields(signatureData)) {
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
            	params.put("signatureIdDefault", Constants.DEFAULT_PARAMS);
            	int idNumber = Integer.parseInt(Sym0010Dao.getSym0010Mapper().getLastIdSignature(params).substring(1));
            	if (idNumber < Constants.DEFAULT_ID) {
            		idNumber = idNumber + 1;
            		String signatureId = Constants.SIGNATURE_CHARATER + String.format("%0" + Constants.MAX_LENGHT_ID + "d", idNumber);
            		QltnMSignature educationObj = new QltnMSignature();
            		// Education Id 
            		educationObj.setSignatureId(signatureId);
                    // singatureName
                    educationObj.setSignatureName(signatureData.getSignatureName());
                    // create user id
                    educationObj.setCreateUserId(Util.getUserInfo().getID());
                    // update user id
                    educationObj.setUpdateUserId(Util.getUserInfo().getID());
                    // delete flag
                    educationObj.setDeleteFlag(Constants.DELETE_FLAG_OFF);

                    int result = Sym0010Dao.getQltnMSignatureMapper().insert(educationObj);
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
     * @param signatureId : user's id to delete
     * @return String : delete successfully: 1/delete failed: -1
     */
    public String deleteData(String signatureId) {
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
                int result = Sym0010Dao.getQltnMSignatureMapper().deleteByPrimaryKey(signatureId);
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
     * Get signature information based on siganture's id
     * 
     * @param signatureId : siganture's id received from client
     * @return Signature data
     */
	public QltnMSignature getSingleData(String signatureId) {
		return Sym0010Dao.getQltnMSignatureMapper().selectByPrimaryKey(signatureId);
	}

    /**
     * Check input: blank fields
     * 
     * @param signatureData : data received from client
     * @return boolean : all fields have value: true/blank fields exist: false
     */
 	private boolean checkInputBlankFields(QltnMSignature signatureData) {
 		if (signatureData.getSignatureName().equals("")) {
 			return false;
 		} else {
 			return true;
 		}
 	}
}

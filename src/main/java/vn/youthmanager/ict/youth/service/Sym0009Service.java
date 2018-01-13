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
import vn.youthmanager.ict.common.db.model.QltnMCategory;
import vn.youthmanager.ict.common.util.Util;
import vn.youthmanager.ict.youth.dao.Sym0009Dao;
import vn.youthmanager.ict.youth.db.model.Sym0009Conditions;
import vn.youthmanager.ict.youth.db.model.Sym0009Result;

@Service
public class Sym0009Service {

private static Logger logger = Logger.getLogger(Sym0003Service.class);
	
	@Autowired
	private Sym0009Dao sym0009Dao;
	
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
	public List<Sym0009Result> searchData(Sym0009Conditions searchConditions) {
		List<Sym0009Result> bnn0009ResultList = new ArrayList<Sym0009Result>();
        HashMap<String, Object> params = createSearchConditionParams(searchConditions);
        try {
            logger.info(LoggerMessage.SEARCHING_STRATED);
            // search starts
            bnn0009ResultList = sym0009Dao.getSym0009Mapper().searchData(params);
            logger.info(LoggerMessage.EXECUTION_FINISHED);
            if (bnn0009ResultList.size() > 0) {
                // "real" total from search result
                String searchDataTotalCounts = sym0009Dao.getSym0009Mapper().getSearchDataTotalCounts(params);
                bnn0009ResultList.get(0).setSearchDataTotalCounts(searchDataTotalCounts);
                // handle user input data
                convertSanitize(bnn0009ResultList);
                logger.info(LoggerMessage.SEARCHING_FINISHED);
                logger.info("  ==> " + searchDataTotalCounts + " item(s)");
            } else {
                logger.info(LoggerMessage.SEARCHING_FINISHED);
                logger.info(LoggerMessage.ZERO_ITEM);
            }
        } catch (OutOfMemoryError ex) {
            ex.printStackTrace();
            Sym0009Result tempObj = new Sym0009Result();
            tempObj.setSearchDataTotalCounts("-1");
            bnn0009ResultList.add(tempObj);
        } catch (Exception ex) {
            ex.printStackTrace();
            bnn0009ResultList = null;
        }
        return bnn0009ResultList;
	}
	
	/**
     * Create search conditions parameters from data received from client
     * 
     * @param searchConditions : data received from client
     * @return HashMap object
     */
    private HashMap<String, Object> createSearchConditionParams(Sym0009Conditions searchConditions) {
        HashMap<String, Object> params = new HashMap<String, Object>();
        // report Name
        params.put("cateName", searchConditions.getCateName().equals("") ? "" : "%" + searchConditions.getCateName() + "%");
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
    private void convertSanitize(List<Sym0009Result> inputData) {
        for (int i = 0; i < inputData.size(); i++) {
        	Sym0009Result currentData = inputData.get(i);
            // User name
            currentData.setCateName(Util.convertSanitize(currentData.getCateName()));
        }
    }
    
    /**
     * Update user's information to DB
     * 
     * @param userData : data received from client
     * @return String : update successfully: 1/update failed: -1
     */
    public String updateData(QltnMCategory reportData) {
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
            if (!checkInputBlankFields(reportData)) {
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
            	QltnMCategory cateObj = new QltnMCategory();
            	// category Id
            	cateObj.setCateId(reportData.getCateId());
                // category Name
            	cateObj.setCateName(reportData.getCateName());
                // delete flag
            	cateObj.setDeleteFlag(reportData.getDeleteFlag());
                // update user id
            	cateObj.setUpdateUserId(Util.getUserInfo().getID());
                int result = sym0009Dao.getQltnMCategoryMapper().updateByPrimaryKeySelective(cateObj);
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
     * @param userData : data received from client
     * @return String : insert successfully: 1/insert failed: -1
     */
    public String insertData(QltnMCategory reportData) {
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
            if (!checkInputBlankFields(reportData)) {
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
            	params.put("cateIdDefault", Constants.DEFAULT_PARAMS);
            	int idNumber = Integer.parseInt(sym0009Dao.getSym0009Mapper().getLastIdReport(params).substring(1));
            	if (idNumber < Constants.REPORT_DEFAULT) {
            		idNumber = idNumber + 1;
            		String reportId = Constants.CATE_CHARATER + String.format("%0" + Constants.MAX_LENGHT_ID + "d", idNumber);
            		QltnMCategory cateObj = new QltnMCategory();
            		// category Id 
            		cateObj.setCateId(reportId);
                    // category Name
            		cateObj.setCateName(reportData.getCateName());
                    // create user id
            		cateObj.setCreateUserId(Util.getUserInfo().getID());
                    // update user id
            		cateObj.setUpdateUserId(Util.getUserInfo().getID());
                    // delete flag
            		cateObj.setDeleteFlag(reportData.getDeleteFlag());

                    int result = sym0009Dao.getQltnMCategoryMapper().insert(cateObj);
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
    public String deleteData(String cateId) {
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
            	QltnMCategory qltnMCategory = new QltnMCategory();
            	qltnMCategory.setCateId(cateId);
            	qltnMCategory.setDeleteFlag(Constants.DELETE_FLAG_ON);
                int result = sym0009Dao.getQltnMCategoryMapper().updateByPrimaryKey(qltnMCategory);
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
     * Get user information based on user's id
     * 
     * @param usersId : user's id received from client
     * @return user data
     */
	public QltnMCategory getSingleData(String usersId) {
		return sym0009Dao.getQltnMCategoryMapper().selectByPrimaryKey(usersId);
	}

    /**
     * Check input: blank fields
     * 
     * @param userData : data received from client
     * @return boolean : all fields have value: true/blank fields exist: false
     */
 	private boolean checkInputBlankFields(QltnMCategory reportData) {
 		if (reportData.getCateName().equals("")) {
 			return false;
 		} else {
 			return true;
 		}
 	}
}

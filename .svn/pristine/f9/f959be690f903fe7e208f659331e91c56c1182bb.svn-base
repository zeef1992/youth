package vn.youthmanager.ict.youth.service;

import java.math.BigInteger;
import java.security.MessageDigest;
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
import vn.youthmanager.ict.common.db.model.QltnMUsers;
import vn.youthmanager.ict.common.util.Util;
import vn.youthmanager.ict.youth.dao.Sym0003Dao;
import vn.youthmanager.ict.youth.db.model.Sym0003Conditions;
import vn.youthmanager.ict.youth.db.model.Sym0003Result;

@Service
public class Sym0003Service {

	private static Logger logger = Logger.getLogger(Sym0003Service.class);
	
	@Autowired
	private Sym0003Dao sym0003Dao;
	
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
	public List<Sym0003Result> searchData(Sym0003Conditions searchConditions) {
		List<Sym0003Result> bnn0003ResultList = new ArrayList<Sym0003Result>();
        HashMap<String, Object> params = createSearchConditionParams(searchConditions);
        try {
            logger.info("User searching started");
            // search starts
            bnn0003ResultList = sym0003Dao.getSym0003Mapper().searchData(params);
            logger.info("SQL execution finished");
            if (bnn0003ResultList.size() > 0) {
                // "real" total from search result
                String searchDataTotalCounts = sym0003Dao.getSym0003Mapper().getSearchDataTotalCounts(params);
                bnn0003ResultList.get(0).setSearchDataTotalCounts(searchDataTotalCounts);
                // handle user input data
                convertSanitize(bnn0003ResultList);
                logger.info("User searching finished");
                logger.info("  ==> " + searchDataTotalCounts + " item(s)");
            } else {
                logger.info("User searching finished");
                logger.info("  ==> 0 item");
            }
        } catch (OutOfMemoryError ex) {
            ex.printStackTrace();
            Sym0003Result tempObj = new Sym0003Result();
            tempObj.setSearchDataTotalCounts("-1");
            bnn0003ResultList.add(tempObj);
        } catch (Exception ex) {
            ex.printStackTrace();
            bnn0003ResultList = null;
        }
        return bnn0003ResultList;
	}

	/**
     * Create search conditions parameters from data received from client
     * 
     * @param searchConditions : data received from client
     * @return HashMap object
     */
    private HashMap<String, Object> createSearchConditionParams(Sym0003Conditions searchConditions) {
        HashMap<String, Object> params = new HashMap<String, Object>();
        // User id
        params.put("usersId", searchConditions.getUserId().equals("") ? "" : "%" + searchConditions.getUserId() + "%");
        // User name
        params.put("usersName", searchConditions.getUsersName().equals("") ? "" : "%" + searchConditions.getUsersName() + "%");
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
    private void convertSanitize(List<Sym0003Result> inputData) {
        for (int i = 0; i < inputData.size(); i++) {
        	Sym0003Result currentData = inputData.get(i);
            // User name
            currentData.setUsersName(Util.convertSanitize(currentData.getUsersName()));
        }
    }

    /**
     * Update user's information to DB
     * 
     * @param userData : data received from client
     * @return String : update successfully: 1/update failed: -1
     */
    public String updateData(QltnMUsers userData) {
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
            // check for user input
            if (!checkInputBlankFields(userData)) {
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
            	QltnMUsers userObj = new QltnMUsers();
                // users id
                userObj.setUsersId(userData.getUsersId());
                // users name
                userObj.setUsersName(userData.getUsersName());
                // password
                userObj.setPassword(Constants.encryptMD5((userData.getPassword())));
                // update user id
                userObj.setUpdateUserId(Util.getUserInfo().getID());
                // delete flag
                userObj.setDeleteFlag(userData.getDeleteFlag());

                int result = sym0003Dao.getQltnMUsersMapper().updateByPrimaryKeySelective(userObj);
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
    public String insertData(QltnMUsers userData) {
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
            if (!checkInputBlankFields(userData)) {
            	// blank field(s)
            	logger.error("Error message: Blank fields");
                returnValue = Constants.VALIDATE_BLANK_FIELDS;
                return returnValue;
            }
            if (!checkUserIdFormat(userData)) {
            	// id is in wrong format
            	logger.error("Error message: User's id is in wrong format");
                returnValue = Constants.VALIDATE_WRONG_FORMAT;
                return returnValue;
            }
        	// transaction starts
            DefaultTransactionDefinition def = new DefaultTransactionDefinition();
            def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
            txManager = (PlatformTransactionManager) appContext.getBean("transactionManager");
            TransactionStatus status = txManager.getTransaction(def);
            try {
                QltnMUsers userObj = new QltnMUsers();
                // users id
                userObj.setUsersId(userData.getUsersId());
                // users name
                userObj.setUsersName(userData.getUsersName());
                // password
                MessageDigest m=MessageDigest.getInstance("MD5");
                String password = userData.getPassword();
                m.update(password.getBytes(),0,password.length());
                userObj.setPassword(new BigInteger(1,m.digest()).toString(16));
                // authorization Type Id
                userObj.setAuthorizationTypeId(userData.getAuthorizationTypeId());
                // create user id
                userObj.setCreateUserId(Util.getUserInfo().getID());
                // update user id
                userObj.setUpdateUserId(Util.getUserInfo().getID());
                // delete flag
                userObj.setDeleteFlag(userData.getDeleteFlag());

                int result = sym0003Dao.getQltnMUsersMapper().insert(userObj);
                if (result > 0) { // insert successfully
                    // register to DB
                    txManager.commit(status);
                } else {
                    returnValue = Constants.INSERT_RESULT_FAILED;
                    txManager.rollback(status);
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
    public String deleteData(String usersId) {
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
                int result = sym0003Dao.getQltnMUsersMapper().deleteByPrimaryKey(usersId);
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
	public QltnMUsers getSingleData(String usersId) {
		return sym0003Dao.getQltnMUsersMapper().selectByPrimaryKey(usersId);
	}

    /**
     * Check input: blank fields
     * 
     * @param userData : data received from client
     * @return boolean : all fields have value: true/blank fields exist: false
     */
 	private boolean checkInputBlankFields(QltnMUsers userData) {
 		if (userData.getUsersId().equals("") || userData.getUsersName().equals("")
 			|| userData.getPassword().equals("")) {
 			return false;
 		} else {
 			return true;
 		}
 	}

 	/**
 	 * Check input: user's id format (U + xxxxxxxxxx)
 	 * 
 	 * @param userData : data received from client
 	 * @return boolean : correct format: true/wrong format: false
 	 */
 	private boolean checkUserIdFormat(QltnMUsers userData) {
 		String usersId = userData.getUsersId();
 		if (!usersId.matches("U\\d{10}")) {
 			return false;
 		} else {
 			return true;
 		}
 	}
}

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
import org.springframework.ui.Model;

import com.fasterxml.jackson.databind.ObjectMapper;

import vn.youthmanager.ict.common.cnst.Constants;
import vn.youthmanager.ict.common.cnst.LoggerMessage;
import vn.youthmanager.ict.common.db.model.QltnMSpecialized;
import vn.youthmanager.ict.common.db.model.QltnMUniversity;
import vn.youthmanager.ict.common.util.Util;
import vn.youthmanager.ict.youth.dao.Sym0019Dao;
import vn.youthmanager.ict.youth.db.model.Sym0019Conditions;
import vn.youthmanager.ict.youth.db.model.Sym0019Result;

@Service
public class Sym0019Service {
	private static Logger logger = Logger.getLogger(Sym0019Service.class);

	@Autowired
	private Sym0019Dao sym0019Dao;

	ObjectMapper mapper = new ObjectMapper();
    PlatformTransactionManager txManager;
    @Autowired
    private ApplicationContext appContext;

	/**
	 * initData Create Select box Report
	 * @param model
	 */
	public void initData(Model model, String universityId) {
		List<QltnMUniversity> specializedData = new ArrayList<QltnMUniversity>();
		try {
			specializedData = sym0019Dao.getQltnMUniversityMapper().selectByExample(null);
			model.addAttribute("specializedData", mapper.writeValueAsString(specializedData));
        } catch (Exception ex) {
            ex.printStackTrace();
            specializedData = new ArrayList<QltnMUniversity>();
        }
		try {
            model.addAttribute("specializedData", mapper.writeValueAsString(specializedData));
        } catch (Exception ex) {
        	model.addAttribute("specializedData", "''");
        }
		// model default report Id
		model.addAttribute("universityIdDefault", universityId);
	}

	/**
     * Search user in DB based on search conditions received from client
     * 
     * @param searchConditions : data received from client
     * @return List of users data
     */
	public List<Sym0019Result> searchData(Sym0019Conditions searchConditions) {
		List<Sym0019Result> bnn0019ResultList = new ArrayList<Sym0019Result>();
        HashMap<String, Object> params = createSearchConditionParams(searchConditions);
        try {
            logger.info(LoggerMessage.SEARCHING_STRATED);
            // search starts
            bnn0019ResultList = sym0019Dao.getSym0019Mapper().searchData(params);
            logger.info(LoggerMessage.EXECUTION_FINISHED);
            if (bnn0019ResultList.size() > 0) {
                // "real" total from search result
                String searchDataTotalCounts = sym0019Dao.getSym0019Mapper().getSearchDataTotalCounts(params);
                bnn0019ResultList.get(0).setSearchDataTotalCounts(searchDataTotalCounts);
                // handle user input data
                convertSanitize(bnn0019ResultList);
                logger.info(LoggerMessage.SEARCHING_FINISHED);
                logger.info("  ==> " + searchDataTotalCounts + " item(s)");
            } else {
                logger.info(LoggerMessage.SEARCHING_FINISHED);
                logger.info(LoggerMessage.ZERO_ITEM);
            }
        } catch (OutOfMemoryError ex) {
            ex.printStackTrace();
            Sym0019Result tempObj = new Sym0019Result();
            tempObj.setSearchDataTotalCounts("-1");
            bnn0019ResultList.add(tempObj);
        } catch (Exception ex) {
            ex.printStackTrace();
            bnn0019ResultList = null;
        }
        return bnn0019ResultList;
	}

	/**
     * Create search conditions parameters from data received from client
     * 
     * @param searchConditions : data received from client
     * @return HashMap object
     */
    private HashMap<String, Object> createSearchConditionParams(Sym0019Conditions searchConditions) {
        HashMap<String, Object> params = new HashMap<String, Object>();
        // university Id
        params.put("universityId", searchConditions.getUniversityId());
        // Specialized Code
        params.put("specializedCode", searchConditions.getSpecializedCode().equals("") ? "" : "%" + searchConditions.getSpecializedCode() + "%");
        // Specialized Name
        params.put("specializedName", searchConditions.getSpecializedName().equals("") ? "" : "%" + searchConditions.getSpecializedName() + "%");
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
    private void convertSanitize(List<Sym0019Result> inputData) {
        for (int i = 0; i < inputData.size(); i++) {
        	Sym0019Result currentData = inputData.get(i);
            // Specialized Code
            currentData.setSpecializedCode(Util.convertSanitize(currentData.getSpecializedCode()));
            // Specialized Name
            currentData.setSpecializedCode(Util.convertSanitize(currentData.getSpecializedCode()));
        }
    }

    /**
     * Update user's information to DB
     * 
     * @param userData : data received from client
     * @return String : update successfully: 1/update failed: -1
     */
    public String updateData(QltnMSpecialized specializedData) {
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
            if (!checkInputBlankFields(specializedData)) {
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
            	QltnMSpecialized specializedObj = new QltnMSpecialized();
            	// SpecializedCode
            	specializedObj.setSpecializedCode(specializedData.getSpecializedCode());
            	// Specialized Id
            	specializedObj.setSpecializedId(specializedData.getSpecializedId());
            	// UniversityId
            	specializedObj.setUniversityId(specializedData.getUniversityId());
            	// Specialized Name
            	specializedObj.setSpecializedName(specializedData.getSpecializedName());
            	// update user id
        		specializedObj.setUpdateUserId(Util.getUserInfo().getID());
                // delete flag
            	specializedObj.setDeleteFlag(specializedData.getDeleteFlag());

                int result = sym0019Dao.getQltnMSpecializedMapper().updateByPrimaryKeySelective(specializedObj);
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
    public String insertData(QltnMSpecialized detailReportData) {
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
            if (!checkInputBlankFields(detailReportData)) {
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
            	params.put("specizalizedIdDefault", Constants.DEFAULT_PARAMS);
            	int idNumber = Integer.parseInt(sym0019Dao.getSym0019Mapper().getLastIdSpecizalized(params).substring(2));
            	if (idNumber < Constants.REPORT_DEFAULT) {
            		idNumber = idNumber + 1;
            		String specializedId = Constants.SPECIALIZED_REPORT_CHARATER + String.format("%0" + Constants.MAX_LENGHT_ID + "d", idNumber);
            		QltnMSpecialized specializedObj = new QltnMSpecialized();
            		// SpecializedId
            		specializedObj.setSpecializedId(specializedId);
            		// University Id
            		specializedObj.setUniversityId(detailReportData.getUniversityId());
            		// Specialized Code
            		specializedObj.setSpecializedCode(detailReportData.getSpecializedCode());
                    // Specialized Name
            		specializedObj.setSpecializedName(detailReportData.getSpecializedName());
                    // create user id
            		specializedObj.setCreateUserId(Util.getUserInfo().getID());
                    // update user id
            		specializedObj.setUpdateUserId(Util.getUserInfo().getID());
                    // delete flag
            		specializedObj.setDeleteFlag(Constants.DELETE_FLAG_OFF);

                    int result = sym0019Dao.getQltnMSpecializedMapper().insert(specializedObj);
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
     * Delete Specialized from DB
     * 
     * @param usersId : Specialized's id to delete
     * @return String : delete successfully: 1/delete failed: -1
     */
    public String deleteData(String specializedId) {
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
            	QltnMSpecialized qltnMSpecialized = new QltnMSpecialized();
            	qltnMSpecialized.setSpecializedId(specializedId);
            	// update user id
            	qltnMSpecialized.setUpdateUserId(Util.getUserInfo().getID());
            	qltnMSpecialized.setDeleteFlag(Constants.DELETE_FLAG_ON);
                int result = sym0019Dao.getQltnMSpecializedMapper().deleteByPrimaryKey(specializedId);
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
     * Get user information based on specialized Id
     * 
     * @param specializedId : specialized Id received from client
     * @return user data
     */
	public QltnMSpecialized getSingleData(String specializedId) {
		return sym0019Dao.getQltnMSpecializedMapper().selectByPrimaryKey(specializedId);
	}

    /**
     * Check input: blank fields
     * 
     * @param userData : data received from client
     * @return boolean : all fields have value: true/blank fields exist: false
     */
 	private boolean checkInputBlankFields(QltnMSpecialized specializedData) {
 		if (specializedData.getSpecializedName().equalsIgnoreCase("") || 
 				specializedData.getSpecializedCode().equalsIgnoreCase("")) {
 			return false;
 		} else {
 			return true;
 		}
 	}
}

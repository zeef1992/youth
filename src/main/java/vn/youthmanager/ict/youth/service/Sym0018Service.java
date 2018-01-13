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
import vn.youthmanager.ict.common.db.model.QltnMEducational;
import vn.youthmanager.ict.common.db.model.QltnMUniversity;
import vn.youthmanager.ict.common.util.Util;
import vn.youthmanager.ict.youth.dao.Sym0018Dao;
import vn.youthmanager.ict.youth.db.model.Sym0018Conditions;
import vn.youthmanager.ict.youth.db.model.Sym0018Result;

@Service
public class Sym0018Service {

	private static Logger logger = Logger.getLogger(Sym0003Service.class);
	
	@Autowired
	private Sym0018Dao sym0018Dao;
	ObjectMapper mapper = new ObjectMapper();
	
	// Variables definition
    PlatformTransactionManager txManager;
    @Autowired
    private ApplicationContext appContext;
    
    public void initData(Model model, String educationId) {
		List<QltnMEducational> educationData = new ArrayList<QltnMEducational>();
		try {
			educationData = sym0018Dao.getQltnMEducationalMapper().selectByExample(null);
			model.addAttribute("educationData", mapper.writeValueAsString(educationData));
        } catch (Exception ex) {
            ex.printStackTrace();
            educationData = new ArrayList<QltnMEducational>();
        }
		try {
            model.addAttribute("educationData", mapper.writeValueAsString(educationData));
        } catch (Exception ex) {
        	model.addAttribute("educationData", "''");
        }
		// model default report Id
		model.addAttribute("educationIdDefault", educationId);
	}
    /**
     * Search University in DB based on search conditions received from client
     * 
     * @param searchConditions : data received from client
     * @return List of Universitys data
     */
	public List<Sym0018Result> searchData(Sym0018Conditions searchConditions) {
		List<Sym0018Result> bnn0018ResultList = new ArrayList<Sym0018Result>();
        HashMap<String, Object> params = createSearchConditionParams(searchConditions);
        try {
            logger.info(LoggerMessage.SEARCHING_STRATED);
            // search starts
            bnn0018ResultList = sym0018Dao.getSym0018Mapper().searchData(params);
            logger.info(LoggerMessage.EXECUTION_FINISHED);
            if (bnn0018ResultList.size() > 0) {
                // "real" total from search result
                String searchDataTotalCounts = sym0018Dao.getSym0018Mapper().getSearchDataTotalCounts(params);
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
            Sym0018Result tempObj = new Sym0018Result();
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
    private HashMap<String, Object> createSearchConditionParams(Sym0018Conditions searchConditions) {
        HashMap<String, Object> params = new HashMap<String, Object>();
        // education Id
        params.put("educationId", searchConditions.getEducationId().equals("") ? "" : searchConditions.getEducationId());
        // university Name
        params.put("universityName", searchConditions.getUniversityName().equals("") ? "" : "%" + searchConditions.getUniversityName() + "%");
        // university Code
        params.put("universityCode", searchConditions.getUniversityCode().equals("") ? "" : "%" + searchConditions.getUniversityCode() + "%");
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
    private void convertSanitize(List<Sym0018Result> inputData) {
        for (int i = 0; i < inputData.size(); i++) {
        	Sym0018Result currentData = inputData.get(i);
            // University Name
            currentData.setUniversityName(Util.convertSanitize(currentData.getUniversityName()));
            // University Code
            currentData.setUniversityCode(Util.convertSanitize(currentData.getUniversityCode()));
        }
    }
    
    /**
     * Update University's information to DB
     * 
     * @param UniversityData : data received from client
     * @return String : update successfully: 1/update failed: -1
     */
    public String updateData(QltnMUniversity universityData) {
        // variable definition
        String returnValue = Constants.UPDATE_RESULT_SUCCESSFUL;
        // update starts
        try {
        	// check logged in University id
            if (Util.getUserInfo().getID() == null) {
            	logger.error(LoggerMessage.ERROR_MESSAGE+ "Could not get logged in University's id");
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
            	QltnMUniversity universityObj = new QltnMUniversity();
            	// University Id
            	universityObj.setUniversityId(universityData.getUniversityId());
                // University Name
            	universityObj.setUniversityName(universityData.getUniversityName());
            	// University Code
            	universityObj.setUniversityCode(universityData.getUniversityCode());
            	// update User id
        		universityObj.setUpdateUserId(Util.getUserInfo().getID());
                // delete flag
                universityObj.setDeleteFlag(universityData.getDeleteFlag());

                int result = sym0018Dao.getQltnMUniversityMapper().updateByPrimaryKeySelective(universityObj);
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
     * Insert University's information to DB
     * 
     * @param UniversityData : data received from client
     * @return String : insert successfully: 1/insert failed: -1
     */
    public String insertData(QltnMUniversity universityData) {
        // variable definition
        String returnValue = Constants.INSERT_RESULT_SUCCESSFUL;
        // insert starts
        try {
        	// check logged in University id
        	if (Util.getUserInfo().getID() == null) {
            	logger.error("Error message: Could not get logged in University's id");
                returnValue = Constants.INSERT_RESULT_FAILED;
                return returnValue;
            }
        	// check for University input
            if (!checkInputBlankFields(universityData)) {
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
            	params.put("universityIdDefault", Constants.DEFAULT_PARAMS);
            	String idNumberStr = sym0018Dao.getSym0018Mapper().getLastIdUniversity(params);
            	int idNumber = 0;
            	if (idNumberStr != null) {
            		idNumber = Integer.parseInt(idNumberStr.substring(2));
            	}
            	if (idNumber < Constants.DEFAULT_ID) {
            		idNumber = idNumber + 1;
            		String universityId = Constants.UNIVERSITY_CHARATER + String.format("%0" + Constants.MAX_LENGHT_ID + "d", idNumber);
            		QltnMUniversity universityObj = new QltnMUniversity();
            		// UniversityId 
            		universityObj.setUniversityId(universityId);
            		// education Id
            		universityObj.setEducationId(universityData.getEducationId());
            		// University Code
            		universityObj.setUniversityCode(universityData.getUniversityCode());
                    // University Name
            		universityObj.setUniversityName(universityData.getUniversityName());
                    // create University id
            		universityObj.setCreateUserId(Util.getUserInfo().getID());
                    // update User id
            		universityObj.setUpdateUserId(Util.getUserInfo().getID());
                    // delete flag
            		universityObj.setDeleteFlag(universityData.getDeleteFlag());

                    int result = sym0018Dao.getQltnMUniversityMapper().insert(universityObj);
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
     * @param criteriaID : University's id to delete
     * @return String : delete successfully: 1/delete failed: -1
     */
    public String deleteData(String universityId) {
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
            	QltnMUniversity QltnMUniversity = new QltnMUniversity();
            	QltnMUniversity.setUniversityId(universityId);
            	QltnMUniversity.setDeleteFlag(Constants.DELETE_FLAG_ON);
            	// update University id
            	QltnMUniversity.setUpdateUserId(Util.getUserInfo().getID());
                int result = sym0018Dao.getQltnMUniversityMapper().updateByPrimaryKeySelective(QltnMUniversity);
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
     * Get University information based on University's id
     * 
     * @param criteriaID : University's id received from client
     * @return University data
     */
	public QltnMUniversity getSingleData(String universityId) {
		return sym0018Dao.getQltnMUniversityMapper().selectByPrimaryKey(universityId);
	}

    /**
     * Check input: blank fields
     * 
     * @param UniversityData : data received from client
     * @return boolean : all fields have value: true/blank fields exist: false
     */
 	private boolean checkInputBlankFields(QltnMUniversity criteriaData) {
 		if (criteriaData.getUniversityName().equals("")) {
 			return false;
 		} else {
 			return true;
 		}
 	}
}

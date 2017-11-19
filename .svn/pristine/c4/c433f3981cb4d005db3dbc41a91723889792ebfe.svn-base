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
import vn.youthmanager.ict.common.db.model.QltnMDetailReport;
import vn.youthmanager.ict.common.db.model.QltnMReport;
import vn.youthmanager.ict.common.util.Util;
import vn.youthmanager.ict.youth.dao.Sym0006Dao;
import vn.youthmanager.ict.youth.db.model.Sym0006Conditions;
import vn.youthmanager.ict.youth.db.model.Sym0006DetailResult;
import vn.youthmanager.ict.youth.db.model.Sym0006Result;

@Service
public class Sym0006Service {
	private static Logger logger = Logger.getLogger(Sym0006Service.class);

	@Autowired
	private Sym0006Dao sym0006Dao;

	ObjectMapper mapper = new ObjectMapper();
    PlatformTransactionManager txManager;
    @Autowired
    private ApplicationContext appContext;

	/**
	 * initData Create Select box Report
	 * @param model
	 */
	public void initData(Model model, String reportId) {
		// TODO Auto-generated method stub
		List<QltnMReport> reportData = new ArrayList<QltnMReport>();
		try {
			reportData = sym0006Dao.getQltnMReportMapper().selectByExample(null);
			model.addAttribute("reportData", mapper.writeValueAsString(reportData));
        } catch (Exception ex) {
            ex.printStackTrace();
            reportData = new ArrayList<QltnMReport>();
        }
		try {
            model.addAttribute("reportData", mapper.writeValueAsString(reportData));
        } catch (Exception ex) {
        	model.addAttribute("reportData", "''");
        }
		// model default report Id
		model.addAttribute("reportIdDefault", reportId);
	}

	/**
     * Search user in DB based on search conditions received from client
     * 
     * @param searchConditions : data received from client
     * @return List of users data
     */
	public List<Sym0006Result> searchData(Sym0006Conditions searchConditions) {
		List<Sym0006Result> bnn0006ResultList = new ArrayList<Sym0006Result>();
		List<Sym0006DetailResult> bnn0006ReportNameList = new ArrayList<Sym0006DetailResult>();
        HashMap<String, Object> params = createSearchConditionParams(searchConditions);
        try {
            logger.info(LoggerMessage.SEARCHING_STRATED);
            // search starts
            bnn0006ResultList = sym0006Dao.getSym0006Mapper().searchData(params);
            logger.info(LoggerMessage.EXECUTION_FINISHED);
            if (bnn0006ResultList.size() > 0) {
                // "real" total from search result
                String searchDataTotalCounts = sym0006Dao.getSym0006Mapper().getSearchDataTotalCounts(params);
                bnn0006ResultList.get(0).setSearchDataTotalCounts(searchDataTotalCounts);
                // search Report Name 
                bnn0006ReportNameList = sym0006Dao.getSym0006Mapper().searchReportName(params);
                // set to List Result
                bnn0006ResultList.get(0).setTilereportName(bnn0006ReportNameList);
                // handle user input data
                convertSanitize(bnn0006ResultList);
                logger.info(LoggerMessage.SEARCHING_FINISHED);
                logger.info("  ==> " + searchDataTotalCounts + " item(s)");
            } else {
                logger.info(LoggerMessage.SEARCHING_FINISHED);
                logger.info(LoggerMessage.ZERO_ITEM);
            }
        } catch (OutOfMemoryError ex) {
            ex.printStackTrace();
            Sym0006Result tempObj = new Sym0006Result();
            tempObj.setSearchDataTotalCounts("-1");
            bnn0006ResultList.add(tempObj);
        } catch (Exception ex) {
            ex.printStackTrace();
            bnn0006ResultList = null;
        }
        return bnn0006ResultList;
	}

	/**
     * Create search conditions parameters from data received from client
     * 
     * @param searchConditions : data received from client
     * @return HashMap object
     */
    private HashMap<String, Object> createSearchConditionParams(Sym0006Conditions searchConditions) {
        HashMap<String, Object> params = new HashMap<String, Object>();
        // report Id
        params.put("reportId", searchConditions.getReportId());
        // detail Report Name
        params.put("detailReportName", searchConditions.getDetailReportName().equals("") ? "" :searchConditions.getDetailReportName());
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
    private void convertSanitize(List<Sym0006Result> inputData) {
        for (int i = 0; i < inputData.size(); i++) {
        	Sym0006Result currentData = inputData.get(i);
            // Detail Report name
            currentData.setDetailReportName(Util.convertSanitize(currentData.getDetailReportName()));
        }
    }

    /**
     * Update user's information to DB
     * 
     * @param userData : data received from client
     * @return String : update successfully: 1/update failed: -1
     */
    public String updateData(QltnMDetailReport detailReportData) {
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
            if (!checkInputBlankFields(detailReportData)) {
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
            	QltnMDetailReport detailReportObj = new QltnMDetailReport();
            	// Report Id
            	detailReportObj.setReportId(detailReportData.getReportId());
            	// Detail Report Id
            	detailReportObj.setDetailReportId(detailReportData.getDetailReportId());
                // Detail Report Name
            	detailReportObj.setDetailReportName(detailReportData.getDetailReportName());
                // delete flag
            	detailReportObj.setDeleteFlag(detailReportData.getDeleteFlag());

                int result = sym0006Dao.getQltnMDetailReportMapper().updateByPrimaryKeySelective(detailReportObj);
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
    public String insertData(QltnMDetailReport detailReportData) {
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
            	params.put("reportDefault", Constants.DEFAULT_PARAMS);
            	int idNumber = Integer.parseInt(sym0006Dao.getSym0006Mapper().getLastDetailReportId(params).substring(1));
            	if (idNumber < Constants.REPORT_DEFAULT) {
            		idNumber = idNumber + 1;
            		String detailReportId = Constants.DETAIL_REPORT_CHARATER + String.format("%0" + Constants.MAX_LENGHT_ID + "d", idNumber);
            		QltnMDetailReport detailReportObj = new QltnMDetailReport();
            		// Detail Report Id
            		detailReportObj.setDetailReportId(detailReportId);
            		// Report Id 
            		detailReportObj.setReportId(detailReportData.getReportId());
                    // Detail Report Name
            		detailReportObj.setDetailReportName(detailReportData.getDetailReportName());
                    // create user id
            		detailReportObj.setCreateUserId(Util.getUserInfo().getID());
                    // update user id
            		detailReportObj.setUpdateUserId(Util.getUserInfo().getID());
                    // delete flag
            		detailReportObj.setDeleteFlag(detailReportData.getDeleteFlag());

                    int result = sym0006Dao.getQltnMDetailReportMapper().insert(detailReportObj);
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
    public String deleteData(String detailReportId) {
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
                int result = sym0006Dao.getQltnMDetailReportMapper().deleteByPrimaryKey(detailReportId);
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
	public QltnMDetailReport getSingleData(String reportId, String detailReportId) {
		QltnMDetailReport qltnMDetailReport = new QltnMDetailReport();
		qltnMDetailReport.setReportId(reportId);
		qltnMDetailReport.setDetailReportId(detailReportId);
		return sym0006Dao.getSym0006Mapper().getSingleData(qltnMDetailReport);
	}

    /**
     * Check input: blank fields
     * 
     * @param userData : data received from client
     * @return boolean : all fields have value: true/blank fields exist: false
     */
 	private boolean checkInputBlankFields(QltnMDetailReport detailReportData) {
 		if (detailReportData.getDetailReportName().equalsIgnoreCase("")) {
 			return false;
 		} else {
 			return true;
 		}
 	}
}

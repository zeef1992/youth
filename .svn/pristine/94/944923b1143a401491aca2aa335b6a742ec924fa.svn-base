package vn.youthmanager.ict.youth.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import com.fasterxml.jackson.databind.ObjectMapper;

import vn.youthmanager.ict.common.cnst.Constants;
import vn.youthmanager.ict.common.db.model.QltnMAccessAuthorization;
import vn.youthmanager.ict.common.util.Util;
import vn.youthmanager.ict.youth.dao.Sym0033Dao;

@Service
public class Sym0033Service {

	private static Logger logger = Logger.getLogger(Sym0033Service.class);
	@Autowired
	private Sym0033Dao sym0033Dao;
	// Variables definition
	// send arraylist data to client side
	ObjectMapper mapper = new ObjectMapper();
	PlatformTransactionManager txManager;
	@Autowired
	private ApplicationContext appContext;
	public List<QltnMAccessAuthorization> initData(String screenStr) {
		// Trim() khoảng trắng hai đàu.
		screenStr = screenStr.trim();
		String[] screenId = screenStr.split("\\,");
		// Xóa Dấu phẩy cuối chuỗi
		ArrayList<QltnMAccessAuthorization> screen0033List = new ArrayList<QltnMAccessAuthorization>();
		try {
			logger.info("Screen searching started");
            // search starts
			HashMap<String, Object> params = new HashMap<String, Object>();
			params.put("screenStr", screenId);
			screen0033List = sym0033Dao.getSym0033Mapper().searchData(params);
			if (screen0033List.size() > 0) {
				logger.info("User searching finished");
			} else {
				logger.info("User searching finished");
                logger.info("  ==> 0 item");
			}
		} catch (OutOfMemoryError ex) {
			ex.printStackTrace();
			QltnMAccessAuthorization tempObj = new QltnMAccessAuthorization();
            tempObj = null;
            screen0033List.add(tempObj);
		}
		return screen0033List;
	}
	/**
     * Update task's information to DB
     * 
     * @param areaData : data received from client
     * @return String : update successfully: 1/update failed: -1
     */
    public String updateData(QltnMAccessAuthorization qltnMAccessAuthorization) {
        // variable definition
        String returnValue = Constants.UPDATE_RESULT_SUCCESSFUL;
        // update starts
        try {
        	// check logged in user id
        	if (Util.getUserInfo().getID() == null) {
            	logger.error("Error message: Could not get logged in user's id");
                returnValue = Constants.INSERT_RESULT_FAILED;
                return returnValue;
            }
        	// Check ScreenId
        	if (!checkScreenIdFormat(qltnMAccessAuthorization)) {
            	// id is in wrong format
            	logger.error("Error message: Screen's id is in wrong format");
                returnValue = Constants.VALIDATE_WRONG_FORMAT;
                return returnValue;
            }
            DefaultTransactionDefinition def = new DefaultTransactionDefinition();
            def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
            txManager = (PlatformTransactionManager) appContext.getBean("transactionManager");
            TransactionStatus status = txManager.getTransaction(def);
            try {
            	QltnMAccessAuthorization accessAuthorization = new QltnMAccessAuthorization();
                // Access Authority Id
            	accessAuthorization.setAccessAuthorityId(qltnMAccessAuthorization.getAccessAuthorityId());
            	// Screen Id
            	accessAuthorization.setScreenId(qltnMAccessAuthorization.getScreenId());
            	// Screen Display Enable Flag
            	accessAuthorization.setScreenDisplayEnableFlag(qltnMAccessAuthorization.getScreenDisplayEnableFlag());
            	// Add Able Flag
            	accessAuthorization.setAddableFlag(qltnMAccessAuthorization.getAddableFlag());
            	// Update able Flag
            	accessAuthorization.setUpdatableFlag(qltnMAccessAuthorization.getUpdatableFlag());
            	// Delete Able Flag
            	accessAuthorization.setDeletableFlag(qltnMAccessAuthorization.getDeletableFlag());
            	// Reference Able Flag
            	accessAuthorization.setReferenceFlag(qltnMAccessAuthorization.getReferenceFlag());
                // update user id
            	accessAuthorization.setUpdateUserId(Util.getUserInfo().getID());
                // delete flag
            	accessAuthorization.setDeleteFlag(qltnMAccessAuthorization.getDeleteFlag());

                int result = sym0033Dao.getQltnMAccessAuthorizationMapper().updateByPrimaryKeySelective(accessAuthorization);
                if (result > 0) { // update successfully
					// register to DB
					txManager.commit(status);
				} else {
					returnValue = Constants.UPDATE_RESULT_FAILED;
					txManager.rollback(status);
				}
            } catch (Exception ex) {
                ex.printStackTrace();
                logger.error("Error message: " + ex.getMessage());
                returnValue = Constants.UPDATE_RESULT_FAILED;
                txManager.rollback(status);
            } 
        } catch (Exception ex) {
            ex.printStackTrace();
            logger.error("Error message: " + ex.getMessage());
            returnValue = Constants.UPDATE_RESULT_FAILED;
        }
        return returnValue;
    }
    

    /**
 	 * Check input: screen id format (0 + xxx)
 	 * 
 	 * @param AccessAuthorizationData : data received from client
 	 * @return boolean : correct format: true/wrong format: false
 	 */
 	private boolean checkScreenIdFormat(QltnMAccessAuthorization AccessAuthorizationData) {
 		String screenId = AccessAuthorizationData.getScreenId();
 		if (!screenId.matches("0\\d{3}")) {
 			return false;
 		} else {
 			return true;
 		}
 	}
}

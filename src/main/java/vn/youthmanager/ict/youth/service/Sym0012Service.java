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
import vn.youthmanager.ict.common.db.model.QltnMCity;
import vn.youthmanager.ict.common.db.model.QltnMCountry;
import vn.youthmanager.ict.common.db.model.QltnMCountryExample;
import vn.youthmanager.ict.common.util.Util;
import vn.youthmanager.ict.youth.dao.Sym0012Dao;
import vn.youthmanager.ict.youth.db.model.Sym0012Conditions;
import vn.youthmanager.ict.youth.db.model.Sym0012Result;

@Service
public class Sym0012Service {

	private static Logger logger = Logger.getLogger(Sym0003Service.class);
	
	@Autowired
	private Sym0012Dao Sym0012Dao;
	ObjectMapper mapper = new ObjectMapper();
	// Variables definition
    PlatformTransactionManager txManager;
    @Autowired
    private ApplicationContext appContext;

    /**
	 * initData Create Select box Report
	 * @param model
	 */
	public void initData(Model model, String countryId) {
		List<QltnMCountry> cityData = new ArrayList<QltnMCountry>();
		try {
			QltnMCountryExample qltnMCountryExample = new QltnMCountryExample();
			QltnMCountryExample.Criteria countryCriteria = qltnMCountryExample.createCriteria();
			countryCriteria.andDeleteFlagEqualTo(Constants.DELETE_FLAG_OFF);
			cityData = Sym0012Dao.getQltnMCountryMapper().selectByExample(qltnMCountryExample);
			model.addAttribute("cityData", mapper.writeValueAsString(cityData));
        } catch (Exception ex) {
            ex.printStackTrace();
            cityData = new ArrayList<QltnMCountry>();
        }
		try {
            model.addAttribute("cityData", mapper.writeValueAsString(cityData));
        } catch (Exception ex) {
        	model.addAttribute("cityData", "''");
        }
		// model default report Id
		model.addAttribute("countryIdDefault", countryId);
	}

    /**
     * Search city in DB based on search conditions received from client
     * 
     * @param searchConditions : data received from client
     * @return List of citys data
     */
	public List<Sym0012Result> searchData(Sym0012Conditions searchConditions) {
		List<Sym0012Result> bnn0012ResultList = new ArrayList<Sym0012Result>();
        HashMap<String, Object> params = createSearchConditionParams(searchConditions);
        try {
            logger.info(LoggerMessage.SEARCHING_STRATED);
            // search starts
            bnn0012ResultList = Sym0012Dao.getSym0012Mapper().searchData(params);
            logger.info(LoggerMessage.EXECUTION_FINISHED);
            if (bnn0012ResultList.size() > 0) {
                // "real" total from search result
                String searchDataTotalCounts = Sym0012Dao.getSym0012Mapper().getSearchDataTotalCounts(params);
                bnn0012ResultList.get(0).setSearchDataTotalCounts(searchDataTotalCounts);
                // handle city input data
                convertSanitize(bnn0012ResultList);
                logger.info(LoggerMessage.SEARCHING_FINISHED);
                logger.info("  ==> " + searchDataTotalCounts + " item(s)");
            } else {
                logger.info(LoggerMessage.SEARCHING_FINISHED);
                logger.info(LoggerMessage.ZERO_ITEM);
            }
        } catch (OutOfMemoryError ex) {
            ex.printStackTrace();
            Sym0012Result tempObj = new Sym0012Result();
            tempObj.setSearchDataTotalCounts("-1");
            bnn0012ResultList.add(tempObj);
        } catch (Exception ex) {
            ex.printStackTrace();
            bnn0012ResultList = null;
        }
        return bnn0012ResultList;
	}
	
	/**
     * Create search conditions parameters from data received from client
     * 
     * @param searchConditions : data received from client
     * @return HashMap object
     */
    private HashMap<String, Object> createSearchConditionParams(Sym0012Conditions searchConditions) {
        HashMap<String, Object> params = new HashMap<String, Object>();
        // From parameter
        params.put("countryId", searchConditions.getCountryId());
        // city Name
        params.put("cityName", searchConditions.getCityName().equals("") ? "" : "%" + searchConditions.getCityName() + "%");
        // city Code
        params.put("cityCode", searchConditions.getCityCode().equals("") ? "" : "%" + searchConditions.getCityCode() + "%");
        // From parameter
        params.put("fromRow", Integer.valueOf(searchConditions.getFromRow()));
        // Number of items in a page
        params.put("itemCount", Integer.valueOf(searchConditions.getItemCount()));

        return params;
    }
	
    
	/**
     * Handle city input data
     * 
     * @param inputData : search result data list
     */
    private void convertSanitize(List<Sym0012Result> inputData) {
        for (int i = 0; i < inputData.size(); i++) {
        	Sym0012Result currentData = inputData.get(i);
            // city Name
            currentData.setCityName(Util.convertSanitize(currentData.getCityName()));
            // city Code
            currentData.setCityCode(Util.convertSanitize(currentData.getCityCode()));
        }
    }
    
    /**
     * Update city's information to DB
     * 
     * @param cityData : data received from client
     * @return String : update successfully: 1/update failed: -1
     */
    public String updateData(QltnMCity cityData) {
        // variable definition
        String returnValue = Constants.UPDATE_RESULT_SUCCESSFUL;
        // update starts
        try {
        	// check logged in city id
            if (Util.getUserInfo().getID() == null) {
            	logger.error(LoggerMessage.ERROR_MESSAGE+ "Could not get logged in city's id");
                returnValue = Constants.UPDATE_RESULT_FAILED;
                return returnValue;
            }
            // check for Report input
            if (!checkInputBlankFields(cityData)) {
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
            	QltnMCity cityObj = new QltnMCity();
            	// city Id
            	cityObj.setCityId(cityData.getCityId());
                // city Name
            	cityObj.setCityName(cityData.getCityName());
            	// city Code
            	cityObj.setCityCode(cityData.getCityCode());
            	// update User id
        		cityObj.setUpdateUserId(Util.getUserInfo().getID());
                // delete flag
                cityObj.setDeleteFlag(cityData.getDeleteFlag());

                int result = Sym0012Dao.getQltnMCityMapper().updateByPrimaryKeySelective(cityObj);
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
     * Insert city's information to DB
     * 
     * @param cityData : data received from client
     * @return String : insert successfully: 1/insert failed: -1
     */
    public String insertData(QltnMCity cityData) {
        // variable definition
        String returnValue = Constants.INSERT_RESULT_SUCCESSFUL;
        // insert starts
        try {
        	// check logged in city id
        	if (Util.getUserInfo().getID() == null) {
            	logger.error("Error message: Could not get logged in city's id");
                returnValue = Constants.INSERT_RESULT_FAILED;
                return returnValue;
            }
        	// check for city input
            if (!checkInputBlankFields(cityData)) {
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
            	String idNumberStr = Sym0012Dao.getSym0012Mapper().getLastIdCity(params);
            	int idNumber = 0;
            	if (idNumberStr != null) {
            		idNumber = Integer.parseInt(idNumberStr.substring(2));
            	}
            	if (idNumber < Constants.DEFAULT_ID) {
            		idNumber = idNumber + 1;
            		String cityId = Constants.CITY_CHARATER + String.format("%0" + Constants.MAX_LENGHT_ID + "d", idNumber);
            		QltnMCity cityObj = new QltnMCity();
            		// Country Id
            		cityObj.setCountryId(cityData.getCountryId());
            		// city Id 
            		cityObj.setCityId(cityId);
            		// city Code
            		cityObj.setCityCode(cityData.getCityCode());
                    // city Name
            		cityObj.setCityName(cityData.getCityName());
                    // create city id
            		cityObj.setCreateUserId(Util.getUserInfo().getID());
                    // update User id
            		cityObj.setUpdateUserId(Util.getUserInfo().getID());
                    // delete flag
            		cityObj.setDeleteFlag(Constants.DELETE_FLAG_OFF);

                    int result = Sym0012Dao.getQltnMCityMapper().insert(cityObj);
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
     * Delete city from DB
     * 
     * @param cityID : city's id to delete
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
            	QltnMCity QltnMCity = new QltnMCity();
            	QltnMCity.setCityId(countryId);
            	QltnMCity.setDeleteFlag(Constants.DELETE_FLAG_ON);
            	// update city id
            	QltnMCity.setUpdateUserId(Util.getUserInfo().getID());
                int result = Sym0012Dao.getQltnMCityMapper().updateByPrimaryKeySelective(QltnMCity);
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
     * Get city information based on city's id
     * 
     * @param cityID : city's id received from client
     * @return city data
     */
	public QltnMCity getSingleData(String countryId) {
		return Sym0012Dao.getQltnMCityMapper().selectByPrimaryKey(countryId);
	}

    /**
     * Check input: blank fields
     * 
     * @param cityData : data received from client
     * @return boolean : all fields have value: true/blank fields exist: false
     */
 	private boolean checkInputBlankFields(QltnMCity cityData) {
 		if (cityData.getCityName().equals("") || cityData.getCityCode().equals("")) {
 			return false;
 		} else {
 			return true;
 		}
 	}
}

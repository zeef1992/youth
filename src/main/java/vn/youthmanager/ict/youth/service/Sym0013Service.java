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
import vn.youthmanager.ict.common.db.model.QltnMCityExample;
import vn.youthmanager.ict.common.db.model.QltnMCountry;
import vn.youthmanager.ict.common.db.model.QltnMCountryExample;
import vn.youthmanager.ict.common.db.model.QltnMDistrict;
import vn.youthmanager.ict.common.util.Util;
import vn.youthmanager.ict.youth.dao.Sym0013Dao;
import vn.youthmanager.ict.youth.db.model.Sym0013Conditions;
import vn.youthmanager.ict.youth.db.model.Sym0013Result;

@Service
public class Sym0013Service {

	private static Logger logger = Logger.getLogger(Sym0003Service.class);
	
	@Autowired
	private Sym0013Dao Sym0013Dao;
	ObjectMapper mapper = new ObjectMapper();
	// Variables definition
    PlatformTransactionManager txManager;
    @Autowired
    private ApplicationContext appContext;

    /**
	 * initData Create Select box Report
	 * @param model
	 */
	public void initData(Model model, String countryId , String cityId) {
		// Combobox Country Data
		List<QltnMCountry> countryData = new ArrayList<QltnMCountry>();
		try {
			QltnMCountryExample qltnMCountryExample = new QltnMCountryExample();
			QltnMCountryExample.Criteria countryCriteria = qltnMCountryExample.createCriteria();
			countryCriteria.andDeleteFlagEqualTo(Constants.DELETE_FLAG_OFF);
			countryData = Sym0013Dao.getQltnMCountryMapper().selectByExample(qltnMCountryExample);
			model.addAttribute("countryData", mapper.writeValueAsString(countryData));
        } catch (Exception ex) {
            ex.printStackTrace();
            countryData = new ArrayList<QltnMCountry>();
        }
		try {
            model.addAttribute("countryData", mapper.writeValueAsString(countryData));
        } catch (Exception ex) {
        	model.addAttribute("countryData", "''");
        }
		// model default report Id
		model.addAttribute("districtIdDefault", countryId);

		// Combobox Country Data
		List<QltnMCity> cityData = new ArrayList<QltnMCity>();
		try {
			QltnMCityExample qltnMCityExample = new QltnMCityExample();
			QltnMCityExample.Criteria  cityCriteria = qltnMCityExample.createCriteria();
			cityCriteria.andDeleteFlagEqualTo(Constants.DELETE_FLAG_OFF);
			cityData = Sym0013Dao.getQltnMCityMapper().selectByExample(qltnMCityExample);
			model.addAttribute("cityData", mapper.writeValueAsString(cityData));
		} catch (Exception ex) {
			ex.printStackTrace();
			cityData = new ArrayList<QltnMCity>();
		}
		try {
			model.addAttribute("cityData", mapper.writeValueAsString(cityData));
		} catch (Exception ex) {
			model.addAttribute("cityData", "''");
		}
		// model default report Id
		model.addAttribute("cityIdDefault", cityId);
	}

	public List<QltnMCity> getCityNameByCountryId(String countryId) {
		// Combobox City Data
		List<QltnMCity> cityData = new ArrayList<QltnMCity>();
		QltnMCityExample qltnMCityExample = new QltnMCityExample();
		QltnMCityExample.Criteria  cityCriteria = qltnMCityExample.createCriteria();
		cityCriteria.andCountryIdEqualTo(countryId);
	
		cityCriteria.andDeleteFlagEqualTo(Constants.DELETE_FLAG_OFF);
		cityData = Sym0013Dao.getQltnMCityMapper().selectByExample(qltnMCityExample);
		return cityData;
	}

    /**
     * Search district in DB based on search conditions received from client
     * 
     * @param searchConditions : data received from client
     * @return List of district data
     */
	public List<Sym0013Result> searchData(Sym0013Conditions searchConditions) {
		List<Sym0013Result> bnn0012ResultList = new ArrayList<Sym0013Result>();
        HashMap<String, Object> params = createSearchConditionParams(searchConditions);
        try {
            logger.info(LoggerMessage.SEARCHING_STRATED);
            // search starts
            bnn0012ResultList = Sym0013Dao.getSym0013Mapper().searchData(params);
            logger.info(LoggerMessage.EXECUTION_FINISHED);
            if (bnn0012ResultList.size() > 0) {
                // "real" total from search result
                String searchDataTotalCounts = Sym0013Dao.getSym0013Mapper().getSearchDataTotalCounts(params);
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
            Sym0013Result tempObj = new Sym0013Result();
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
    private HashMap<String, Object> createSearchConditionParams(Sym0013Conditions searchConditions) {
        HashMap<String, Object> params = new HashMap<String, Object>();
        // country Id
        params.put("countryId", searchConditions.getCountryId());
        // city Id
        params.put("cityId", searchConditions.getCityId());
        // district Name
        params.put("districtName", searchConditions.getDistrictName().equals("") ? "" : "%" + searchConditions.getDistrictName() + "%");
        // district Code
        params.put("districtCode", searchConditions.getDistrictCode().equals("") ? "" : "%" + searchConditions.getDistrictCode() + "%");
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
    private void convertSanitize(List<Sym0013Result> inputData) {
        for (int i = 0; i < inputData.size(); i++) {
        	Sym0013Result currentData = inputData.get(i);
            // city Name
            currentData.setDistrictName(Util.convertSanitize(currentData.getDistrictName()));
            // city Code
            currentData.setDistrictCode(Util.convertSanitize(currentData.getDistrictCode()));
        }
    }
    
    /**
     * Update city's information to DB
     * 
     * @param districtData : data received from client
     * @return String : update successfully: 1/update failed: -1
     */
    public String updateData(QltnMDistrict districtData) {
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
            if (!checkInputBlankFields(districtData)) {
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
            	QltnMDistrict districtObj = new QltnMDistrict();
            	// city Id
            	districtObj.setDistrictId(districtData.getDistrictId());
                // city Name
            	districtObj.setDistrictName(districtData.getDistrictName());
            	// city Code
            	districtObj.setDistrictCode(districtData.getDistrictCode());
            	// update User id
        		districtObj.setUpdateUserId(Util.getUserInfo().getID());
                // delete flag
                districtObj.setDeleteFlag(districtData.getDeleteFlag());

                int result = Sym0013Dao.getQltnMDistrictMapper().updateByPrimaryKeySelective(districtObj);
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
     * @param districtData : data received from client
     * @return String : insert successfully: 1/insert failed: -1
     */
    public String insertData(QltnMDistrict districtData) {
        // variable definition
        String returnValue = Constants.INSERT_RESULT_SUCCESSFUL;
        // insert starts
        try {
        	// check logged in city id
        	if (Util.getUserInfo().getID() == null) {
            	logger.error("Error message: Could not get logged in user's id");
                returnValue = Constants.INSERT_RESULT_FAILED;
                return returnValue;
            }
        	// check for city input
            if (!checkInputBlankFields(districtData)) {
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
            	params.put("districtIdDefault", Constants.DEFAULT_PARAMS);
            	String idNumberStr = Sym0013Dao.getSym0013Mapper().getLastIdDistrict(params);
            	int idNumber = 0;
            	if (idNumberStr != null) {
            		idNumber = Integer.parseInt(idNumberStr.substring(2));
            	}
            	if (idNumber < Constants.DEFAULT_ID) {
            		idNumber = idNumber + 1;
            		String districtID = Constants.DISTRICT_CHARATER + String.format("%0" + Constants.MAX_LENGHT_ID + "d", idNumber);
            		QltnMDistrict districtObj = new QltnMDistrict();
            		// Country Id
            		districtObj.setCountryId(districtData.getCountryId());
            		// city Id
            		districtObj.setCityId(districtData.getCityId());
            		// district Id 
            		districtObj.setDistrictId(districtID);
            		// district Code
            		districtObj.setDistrictCode(districtData.getDistrictCode());
                    // district Name
            		districtObj.setDistrictName(districtData.getDistrictName());
                    // create user id
            		districtObj.setCreateUserId(Util.getUserInfo().getID());
                    // update User id
            		districtObj.setUpdateUserId(Util.getUserInfo().getID());
                    // delete flag
            		districtObj.setDeleteFlag(Constants.DELETE_FLAG_OFF);

                    int result = Sym0013Dao.getQltnMDistrictMapper().insert(districtObj);
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
     * Delete district from DB
     * 
     * @param districtID : city's id to delete
     * @return String : delete successfully: 1/delete failed: -1
     */
    public String deleteData(String districtId) {
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
            	QltnMDistrict QltnMDistrict = new QltnMDistrict();
            	QltnMDistrict.setDistrictId(districtId);
            	QltnMDistrict.setDeleteFlag(Constants.DELETE_FLAG_ON);
            	// update city id
            	QltnMDistrict.setUpdateUserId(Util.getUserInfo().getID());
                int result = Sym0013Dao.getQltnMDistrictMapper().updateByPrimaryKeySelective(QltnMDistrict);
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
     * @param districtID : city's id received from client
     * @return city data
     */
	public QltnMDistrict getSingleData(String districtId) {
		return Sym0013Dao.getQltnMDistrictMapper().selectByPrimaryKey(districtId);
	}

    /**
     * Check input: blank fields
     * 
     * @param districtData : data received from client
     * @return boolean : all fields have value: true/blank fields exist: false
     */
 	private boolean checkInputBlankFields(QltnMDistrict districtData) {
 		if (districtData.getDistrictName().equals("") || districtData.getDistrictCode().equals("")) {
 			return false;
 		} else {
 			return true;
 		}
 	}
}

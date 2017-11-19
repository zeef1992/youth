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
import vn.youthmanager.ict.common.db.model.QltnMDistrictExample;
import vn.youthmanager.ict.common.db.model.QltnMTown;
import vn.youthmanager.ict.common.db.model.QltnMWards;
import vn.youthmanager.ict.common.db.model.QltnMWardsExample;
import vn.youthmanager.ict.common.util.Util;
import vn.youthmanager.ict.youth.dao.Sym0015Dao;
import vn.youthmanager.ict.youth.db.model.Sym0015Conditions;
import vn.youthmanager.ict.youth.db.model.Sym0015Result;

@Service
public class Sym0015Service {

	private static Logger logger = Logger.getLogger(Sym0003Service.class);
	
	@Autowired
	private Sym0015Dao Sym0015Dao;
	ObjectMapper mapper = new ObjectMapper();
	// Variables definition
    PlatformTransactionManager txManager;
    @Autowired
    private ApplicationContext appContext;

    /**
	 * initData Create Select box Report
	 * @param model
	 */
	public void initData(Model model, String countryId , String cityId,String districtId, String wardsId) {
		// Combobox Country Data
		List<QltnMCountry> countryData = new ArrayList<QltnMCountry>();
		try {
			QltnMCountryExample qltnMCountryExample = new QltnMCountryExample();
			QltnMCountryExample.Criteria countryCriteria = qltnMCountryExample.createCriteria();
			countryCriteria.andDeleteFlagEqualTo(Constants.DELETE_FLAG_OFF);
			countryData = Sym0015Dao.getQltnMCountryMapper().selectByExample(qltnMCountryExample);
			model.addAttribute("countryData", mapper.writeValueAsString(countryData));
        } catch (Exception ex) {
            ex.printStackTrace();
            countryData = new ArrayList<QltnMCountry>();
        }
		try {
            model.addAttribute("countryData", mapper.writeValueAsString(countryData));
        } catch (Exception ex) {
        	model.addAttribute("countryData", "");
        }
		// model default report Id
		model.addAttribute("countryIdDefault", countryId);

		// Combobox City Data
		List<QltnMCity> cityData = new ArrayList<QltnMCity>();
		try {
			QltnMCityExample qltnMCityExample = new QltnMCityExample();
			QltnMCityExample.Criteria  cityCriteria = qltnMCityExample.createCriteria();
			cityCriteria.andDeleteFlagEqualTo(Constants.DELETE_FLAG_OFF);
			cityData = Sym0015Dao.getQltnMCityMapper().selectByExample(qltnMCityExample);
			model.addAttribute("cityData", mapper.writeValueAsString(cityData));
		} catch (Exception ex) {
			ex.printStackTrace();
			cityData = new ArrayList<QltnMCity>();
		}
		try {
			model.addAttribute("cityData", mapper.writeValueAsString(cityData));
		} catch (Exception ex) {
			model.addAttribute("cityData", "");
		}
		// model default report Id
		model.addAttribute("cityIdDefault", cityId);

		// Combobox District Data
		List<QltnMDistrict> districtData = new ArrayList<QltnMDistrict>();
		try {
			QltnMDistrictExample QltnMDistrictExample = new QltnMDistrictExample();
			QltnMDistrictExample.Criteria cityCriteria = QltnMDistrictExample.createCriteria();
			cityCriteria.andDeleteFlagEqualTo(Constants.DELETE_FLAG_OFF);
			districtData = Sym0015Dao.getQltnMDistrictMapper().selectByExample(QltnMDistrictExample);
			model.addAttribute("districtData", mapper.writeValueAsString(districtData));
		} catch (Exception ex) {
			ex.printStackTrace();
			districtData = new ArrayList<QltnMDistrict>();
		}
		try {
			model.addAttribute("districtData", mapper.writeValueAsString(districtData));
		} catch (Exception ex) {
			model.addAttribute("districtData", "");
		}
		// model default report Id
		model.addAttribute("districtIdDefault", districtId);

		// Combobox Wards Data
		List<QltnMWards> wardsData = new ArrayList<QltnMWards>();
		try {
			QltnMWardsExample qltnMWardsExample = new QltnMWardsExample();
			QltnMWardsExample.Criteria cityCriteria = qltnMWardsExample.createCriteria();
			cityCriteria.andDeleteFlagEqualTo(Constants.DELETE_FLAG_OFF);
			wardsData = Sym0015Dao.getQltnMWardsMapper().selectByExample(qltnMWardsExample);
			model.addAttribute("wardsData", mapper.writeValueAsString(wardsData));
		} catch (Exception ex) {
			ex.printStackTrace();
			wardsData = new ArrayList<QltnMWards>();
		}
		try {
			model.addAttribute("wardsData", mapper.writeValueAsString(wardsData));
		} catch (Exception ex) {
			model.addAttribute("wardsData", "");
		}
		// model default report Id
		model.addAttribute("wardsIdDefault", wardsId);
	}


	public List<QltnMCity> getCityNameByCountryId(String countryId) {
		// Combobox City Data
		List<QltnMCity> cityData = new ArrayList<QltnMCity>();
		QltnMCityExample qltnMCityExample = new QltnMCityExample();
		QltnMCityExample.Criteria  cityCriteria = qltnMCityExample.createCriteria();
		cityCriteria.andCountryIdEqualTo(countryId);
	
		cityCriteria.andDeleteFlagEqualTo(Constants.DELETE_FLAG_OFF);
		cityData = Sym0015Dao.getQltnMCityMapper().selectByExample(qltnMCityExample);
		return cityData;
	}

	public List<QltnMDistrict> getDistrictNameByCityId(String countryId, String cityId) {
		// Combobox City Data
		List<QltnMDistrict> districtData = new ArrayList<QltnMDistrict>();
		QltnMDistrictExample qltnMDistrictExample = new QltnMDistrictExample();
		QltnMDistrictExample.Criteria  districtCriteria = qltnMDistrictExample.createCriteria();
		districtCriteria.andCountryIdEqualTo(countryId);
		districtCriteria.andCityIdEqualTo(cityId);
		districtCriteria.andDeleteFlagEqualTo(Constants.DELETE_FLAG_OFF);
		districtData = Sym0015Dao.getQltnMDistrictMapper().selectByExample(qltnMDistrictExample);
		return districtData;
	}

	public List<QltnMWards> getWardsNameByDistrictId(String countryId, String cityId, String districtId) {
		// Combobox wards Data
		List<QltnMWards> wardsData = new ArrayList<QltnMWards>();
		QltnMWardsExample qltnMWardsExample = new QltnMWardsExample();
		QltnMWardsExample.Criteria  wardsCriteria = qltnMWardsExample.createCriteria();
		wardsCriteria.andCountryIdEqualTo(countryId);
		wardsCriteria.andCityIdEqualTo(cityId);
		wardsCriteria.andDistrictIdEqualTo(districtId);
		wardsCriteria.andDeleteFlagEqualTo(Constants.DELETE_FLAG_OFF);
		wardsData = Sym0015Dao.getQltnMWardsMapper().selectByExample(qltnMWardsExample);
		return wardsData;
	}

    /**
     * Search wards in DB based on search conditions received from client
     * 
     * @param searchConditions : data received from client
     * @return List of wards data
     */
	public List<Sym0015Result> searchData(Sym0015Conditions searchConditions) {
		List<Sym0015Result> bnn0014ResultList = new ArrayList<Sym0015Result>();
        HashMap<String, Object> params = createSearchConditionParams(searchConditions);
        try {
            logger.info(LoggerMessage.SEARCHING_STRATED);
            // search starts
            bnn0014ResultList = Sym0015Dao.getSym0015Mapper().searchData(params);
            logger.info(LoggerMessage.EXECUTION_FINISHED);
            if (bnn0014ResultList.size() > 0) {
                // "real" total from search result
                String searchDataTotalCounts = Sym0015Dao.getSym0015Mapper().getSearchDataTotalCounts(params);
                bnn0014ResultList.get(0).setSearchDataTotalCounts(searchDataTotalCounts);
                // handle city input data
                convertSanitize(bnn0014ResultList);
                logger.info(LoggerMessage.SEARCHING_FINISHED);
                logger.info("  ==> " + searchDataTotalCounts + " item(s)");
            } else {
                logger.info(LoggerMessage.SEARCHING_FINISHED);
                logger.info(LoggerMessage.ZERO_ITEM);
            }
        } catch (OutOfMemoryError ex) {
            ex.printStackTrace();
            Sym0015Result tempObj = new Sym0015Result();
            tempObj.setSearchDataTotalCounts("-1");
            bnn0014ResultList.add(tempObj);
        } catch (Exception ex) {
            ex.printStackTrace();
            bnn0014ResultList = null;
        }
        return bnn0014ResultList;
	}
	
	/**
     * Create search conditions parameters from data received from client
     * 
     * @param searchConditions : data received from client
     * @return HashMap object
     */
    private HashMap<String, Object> createSearchConditionParams(Sym0015Conditions searchConditions) {
        HashMap<String, Object> params = new HashMap<String, Object>();
        // country Id
        params.put("countryId", searchConditions.getCountryId());
        // city Id
        params.put("cityId", searchConditions.getCityId());
        // district Id
        params.put("districtId", searchConditions.getDistrictId());
        // district Id
        params.put("wardsId", searchConditions.getWardsId());
        // wards Name
        params.put("townName", searchConditions.getTownName().equals("") ? "" : "%" + searchConditions.getTownName() + "%");
        // wards Code
        params.put("townCode", searchConditions.getTownCode().equals("") ? "" : "%" + searchConditions.getTownCode() + "%");
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
    private void convertSanitize(List<Sym0015Result> inputData) {
        for (int i = 0; i < inputData.size(); i++) {
        	Sym0015Result currentData = inputData.get(i);
            // Town Name
            currentData.setTownName(Util.convertSanitize(currentData.getTownName()));
            // Town Code
            currentData.setTownCode(Util.convertSanitize(currentData.getTownCode()));
        }
    }
    
    /**
     * Update Town information to DB
     * 
     * @param townData : data received from client
     * @return String : update successfully: 1/update failed: -1
     */
    public String updateData(QltnMTown townData) {
        // variable definition
        String returnValue = Constants.UPDATE_RESULT_SUCCESSFUL;
        // update starts
        try {
        	// check logged in user id
            if (Util.getUserInfo().getID() == null) {
            	logger.error(LoggerMessage.ERROR_MESSAGE+ "Could not get logged in wards's id");
                returnValue = Constants.UPDATE_RESULT_FAILED;
                return returnValue;
            }
            // check for Report input
            if (!checkInputBlankFields(townData)) {
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
            	QltnMTown wardsObj = new QltnMTown();
            	// Town Id
            	wardsObj.setTownId(townData.getTownId());
                // Town Name
            	wardsObj.setTownName(townData.getTownName());
            	// Town Code
            	wardsObj.setTownCode(townData.getTownCode());
            	// update User id
        		wardsObj.setUpdateUserId(Util.getUserInfo().getID());
                // delete flag
                wardsObj.setDeleteFlag(townData.getDeleteFlag());

                int result = Sym0015Dao.getQltnMTownMapper().updateByPrimaryKeySelective(wardsObj);
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
     * @param townData : data received from client
     * @return String : insert successfully: 1/insert failed: -1
     */
    public String insertData(QltnMTown townData) {
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
            if (!checkInputBlankFields(townData)) {
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
            	params.put("townIdDefault", Constants.DEFAULT_PARAMS);
            	String idNumberStr = Sym0015Dao.getSym0015Mapper().getLastIdTown(params);
            	int idNumber = 0;
            	if (idNumberStr != null) {
            		idNumber = Integer.parseInt(idNumberStr.substring(2));
            	}
            	if (idNumber < Constants.DEFAULT_ID) {
            		idNumber = idNumber + 1;
            		String townId = Constants.TOWN_CHARATER + String.format("%0" + Constants.MAX_LENGHT_ID + "d", idNumber);
            		QltnMTown wardsObj = new QltnMTown();
            		// Country Id
            		wardsObj.setCountryId(townData.getCountryId());
            		// city Id
            		wardsObj.setCityId(townData.getCityId());
            		// district Id
            		wardsObj.setDistrictId(townData.getDistrictId());
            		// Wards Id
            		wardsObj.setWardsId(townData.getWardsId());
            		// Town Id 
            		wardsObj.setTownId(townId);
            		// Town Code
            		wardsObj.setTownCode(townData.getTownCode());
                    // Town Name
            		wardsObj.setTownName(townData.getTownName());
                    // create user id
            		wardsObj.setCreateUserId(Util.getUserInfo().getID());
                    // update User id
            		wardsObj.setUpdateUserId(Util.getUserInfo().getID());
                    // delete flag
            		wardsObj.setDeleteFlag(Constants.DELETE_FLAG_OFF);

                    int result = Sym0015Dao.getQltnMTownMapper().insert(wardsObj);
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
     * Delete Town from DB
     * 
     * @param townId : town's id to delete
     * @return String : delete successfully: 1/delete failed: -1
     */
    public String deleteData(String townId) {
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
            	QltnMTown QltnMTown = new QltnMTown();
            	QltnMTown.setTownId(townId);
            	QltnMTown.setDeleteFlag(Constants.DELETE_FLAG_ON);
            	// update city id
            	QltnMTown.setUpdateUserId(Util.getUserInfo().getID());
                int result = Sym0015Dao.getQltnMTownMapper().updateByPrimaryKeySelective(QltnMTown);
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
     * Get wards information based on Town's id
     * 
     * @param townId : Town's id received from client
     * @return city data
     */
	public QltnMTown getSingleData(String townId) {
		return Sym0015Dao.getQltnMTownMapper().selectByPrimaryKey(townId);
	}

    /**
     * Check input: blank fields
     * 
     * @param townData : data received from client
     * @return boolean : all fields have value: true/blank fields exist: false
     */
 	private boolean checkInputBlankFields(QltnMTown townData) {
 		if (townData.getTownName().equals("") || townData.getTownCode().equals("")) {
 			return false;
 		} else {
 			return true;
 		}
 	}
}

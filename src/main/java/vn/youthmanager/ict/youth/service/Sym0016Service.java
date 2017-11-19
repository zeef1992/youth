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
import vn.youthmanager.ict.common.db.model.QltnMGroups;
import vn.youthmanager.ict.common.db.model.QltnMTown;
import vn.youthmanager.ict.common.db.model.QltnMTownExample;
import vn.youthmanager.ict.common.db.model.QltnMWards;
import vn.youthmanager.ict.common.db.model.QltnMWardsExample;
import vn.youthmanager.ict.common.util.Util;
import vn.youthmanager.ict.youth.dao.Sym0016Dao;
import vn.youthmanager.ict.youth.db.model.Sym0016Conditions;
import vn.youthmanager.ict.youth.db.model.Sym0016Result;

@Service
public class Sym0016Service {

	private static Logger logger = Logger.getLogger(Sym0003Service.class);
	
	@Autowired
	private Sym0016Dao Sym0016Dao;
	ObjectMapper mapper = new ObjectMapper();
	// Variables definition
    PlatformTransactionManager txManager;
    @Autowired
    private ApplicationContext appContext;

    /**
	 * initData Create Select box Report
	 * @param model
	 */
	public void initData(Model model, String countryId , String cityId,String districtId, String wardsId, String townId) {
		// Combobox Country Data
		List<QltnMCountry> countryData = new ArrayList<QltnMCountry>();
		try {
			QltnMCountryExample qltnMCountryExample = new QltnMCountryExample();
			QltnMCountryExample.Criteria countryCriteria = qltnMCountryExample.createCriteria();
			countryCriteria.andDeleteFlagEqualTo(Constants.DELETE_FLAG_OFF);
			countryData = Sym0016Dao.getQltnMCountryMapper().selectByExample(qltnMCountryExample);
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
			cityData = Sym0016Dao.getQltnMCityMapper().selectByExample(qltnMCityExample);
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
			QltnMDistrictExample.Criteria districtCriteria = QltnMDistrictExample.createCriteria();
			districtCriteria.andDeleteFlagEqualTo(Constants.DELETE_FLAG_OFF);
			districtData = Sym0016Dao.getQltnMDistrictMapper().selectByExample(QltnMDistrictExample);
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
			QltnMWardsExample.Criteria wardsCriteria = qltnMWardsExample.createCriteria();
			wardsCriteria.andDeleteFlagEqualTo(Constants.DELETE_FLAG_OFF);
			wardsData = Sym0016Dao.getQltnMWardsMapper().selectByExample(qltnMWardsExample);
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

		// Combobox Town Data
		List<QltnMTown> townData = new ArrayList<QltnMTown>();
		try {
			QltnMTownExample qltnMTownExample = new QltnMTownExample();
			QltnMTownExample.Criteria townCriteria = qltnMTownExample.createCriteria();
			townCriteria.andDeleteFlagEqualTo(Constants.DELETE_FLAG_OFF);
			townData = Sym0016Dao.getQltnMTownMapper().selectByExample(qltnMTownExample);
			model.addAttribute("townData", mapper.writeValueAsString(townData));
		} catch (Exception ex) {
			ex.printStackTrace();
			townData = new ArrayList<QltnMTown>();
		}
		try {
			model.addAttribute("townData", mapper.writeValueAsString(townData));
		} catch (Exception ex) {
			model.addAttribute("townData", "");
		}
		// model default town Id
		model.addAttribute("townIdDefault", townId);
	}

	public List<QltnMCity> getCityNameByCountryId(String countryId) {
		// Combobox City Data
		List<QltnMCity> cityData = new ArrayList<QltnMCity>();
		QltnMCityExample qltnMCityExample = new QltnMCityExample();
		QltnMCityExample.Criteria  cityCriteria = qltnMCityExample.createCriteria();
		cityCriteria.andCountryIdEqualTo(countryId);
	
		cityCriteria.andDeleteFlagEqualTo(Constants.DELETE_FLAG_OFF);
		cityData = Sym0016Dao.getQltnMCityMapper().selectByExample(qltnMCityExample);
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
		districtData = Sym0016Dao.getQltnMDistrictMapper().selectByExample(qltnMDistrictExample);
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
		wardsData = Sym0016Dao.getQltnMWardsMapper().selectByExample(qltnMWardsExample);
		return wardsData;
	}

	public List<QltnMTown> getTownNameByWardsId(String countryId, String cityId, String districtId, String wardsId) {
		// Combobox wards Data
		List<QltnMTown> townData = new ArrayList<QltnMTown>();
		QltnMTownExample qltnMTownExample = new QltnMTownExample();
		QltnMTownExample.Criteria  townCriteria = qltnMTownExample.createCriteria();
		townCriteria.andCountryIdEqualTo(countryId);
		townCriteria.andCityIdEqualTo(cityId);
		townCriteria.andDistrictIdEqualTo(districtId);
		townCriteria.andWardsIdEqualTo(wardsId);
		townCriteria.andDeleteFlagEqualTo(Constants.DELETE_FLAG_OFF);
		townData = Sym0016Dao.getQltnMTownMapper().selectByExample(qltnMTownExample);
		return townData;
	}

    /**
     * Search Groups in DB based on search conditions received from client
     * 
     * @param searchConditions : data received from client
     * @return List of Groups data
     */
	public List<Sym0016Result> searchData(Sym0016Conditions searchConditions) {
		List<Sym0016Result> bnn0016ResultList = new ArrayList<Sym0016Result>();
        HashMap<String, Object> params = createSearchConditionParams(searchConditions);
        try {
            logger.info(LoggerMessage.SEARCHING_STRATED);
            // search starts
            bnn0016ResultList = Sym0016Dao.getSym0016Mapper().searchData(params);
            logger.info(LoggerMessage.EXECUTION_FINISHED);
            if (bnn0016ResultList.size() > 0) {
                // "real" total from search result
                String searchDataTotalCounts = Sym0016Dao.getSym0016Mapper().getSearchDataTotalCounts(params);
                bnn0016ResultList.get(0).setSearchDataTotalCounts(searchDataTotalCounts);
                // handle city input data
                convertSanitize(bnn0016ResultList);
                logger.info(LoggerMessage.SEARCHING_FINISHED);
                logger.info("  ==> " + searchDataTotalCounts + " item(s)");
            } else {
                logger.info(LoggerMessage.SEARCHING_FINISHED);
                logger.info(LoggerMessage.ZERO_ITEM);
            }
        } catch (OutOfMemoryError ex) {
            ex.printStackTrace();
            Sym0016Result tempObj = new Sym0016Result();
            tempObj.setSearchDataTotalCounts("-1");
            bnn0016ResultList.add(tempObj);
        } catch (Exception ex) {
            ex.printStackTrace();
            bnn0016ResultList = null;
        }
        return bnn0016ResultList;
	}
	
	/**
     * Create search conditions parameters from data received from client
     * 
     * @param searchConditions : data received from client
     * @return HashMap object
     */
    private HashMap<String, Object> createSearchConditionParams(Sym0016Conditions searchConditions) {
        HashMap<String, Object> params = new HashMap<String, Object>();
        // country Id
        params.put("countryId", searchConditions.getCountryId());
        // city Id
        params.put("cityId", searchConditions.getCityId());
        // district Id
        params.put("districtId", searchConditions.getDistrictId());
        // wards Id
        params.put("wardsId", searchConditions.getWardsId());
        // town Id
        params.put("townId", searchConditions.getTownId());
        // wards Name
        params.put("groupsName", searchConditions.getGroupsName().equals("") ? "" : "%" + searchConditions.getGroupsName() + "%");
        // wards Code
        params.put("groupsCode", searchConditions.getGroupsCode().equals("") ? "" : "%" + searchConditions.getGroupsCode() + "%");
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
    private void convertSanitize(List<Sym0016Result> inputData) {
        for (int i = 0; i < inputData.size(); i++) {
        	Sym0016Result currentData = inputData.get(i);
            // Groups Name
            currentData.setGroupsName(Util.convertSanitize(currentData.getGroupsName()));
            // Groups Code
            currentData.setGroupsCode(Util.convertSanitize(currentData.getGroupsCode()));
        }
    }
    
    /**
     * Update Groups information to DB
     * 
     * @param groupsData : data received from client
     * @return String : update successfully: 1/update failed: -1
     */
    public String updateData(QltnMGroups groupsData) {
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
            if (!checkInputBlankFields(groupsData)) {
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
            	QltnMGroups groupsObj = new QltnMGroups();
            	// Town Id
            	groupsObj.setGroupsId(groupsData.getGroupsId());
                // Town Name
            	groupsObj.setGroupsName(groupsData.getGroupsName());
            	// Town Code
            	groupsObj.setGroupsCode(groupsData.getGroupsCode());
            	// update User id
        		groupsObj.setUpdateUserId(Util.getUserInfo().getID());
                // delete flag
                groupsObj.setDeleteFlag(groupsData.getDeleteFlag());

                int result = Sym0016Dao.getQltnMGroupsMapper().updateByPrimaryKeySelective(groupsObj);
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
     * Insert Groups information to DB
     * 
     * @param groupsData : data received from client
     * @return String : insert successfully: 1/insert failed: -1
     */
    public String insertData(QltnMGroups groupsData) {
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
            if (!checkInputBlankFields(groupsData)) {
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
            	params.put("groupsIdDefault", Constants.DEFAULT_PARAMS);
            	String idNumberStr = Sym0016Dao.getSym0016Mapper().getLastIdGroups(params);
            	int idNumber = 0;
            	if (idNumberStr != null) {
            		idNumber = Integer.parseInt(idNumberStr.substring(2));
            	}
            	if (idNumber < Constants.DEFAULT_ID) {
            		idNumber = idNumber + 1;
            		String groupsId = Constants.GROUPS_CHARATER + String.format("%0" + Constants.MAX_LENGHT_ID + "d", idNumber);
            		QltnMGroups groupsObj = new QltnMGroups();
            		// Country Id
            		groupsObj.setCountryId(groupsData.getCountryId());
            		// city Id
            		groupsObj.setCityId(groupsData.getCityId());
            		// district Id
            		groupsObj.setDistrictId(groupsData.getDistrictId());
            		// Wards Id
            		groupsObj.setWardsId(groupsData.getWardsId());
            		// town Id
            		groupsObj.setTownId(groupsData.getTownId());
            		// Groups Id 
            		groupsObj.setGroupsId(groupsId);
            		// Groups Code
            		groupsObj.setGroupsCode(groupsData.getGroupsCode());
                    // Groups Name
            		groupsObj.setGroupsName(groupsData.getGroupsName());
                    // create user id
            		groupsObj.setCreateUserId(Util.getUserInfo().getID());
                    // update User id
            		groupsObj.setUpdateUserId(Util.getUserInfo().getID());
                    // delete flag
            		groupsObj.setDeleteFlag(Constants.DELETE_FLAG_OFF);

                    int result = Sym0016Dao.getQltnMGroupsMapper().insert(groupsObj);
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
     * @param groupsId : Groups Id to delete
     * @return String : delete successfully: 1/delete failed: -1
     */
    public String deleteData(String groupsId) {
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
            	QltnMGroups QltnMGroups = new QltnMGroups();
            	QltnMGroups.setGroupsId(groupsId);
            	QltnMGroups.setDeleteFlag(Constants.DELETE_FLAG_ON);
            	// update city id
            	QltnMGroups.setUpdateUserId(Util.getUserInfo().getID());
                int result = Sym0016Dao.getQltnMGroupsMapper().updateByPrimaryKeySelective(QltnMGroups);
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
     * Get Groups information based on Groups Id
     * 
     * @param groupsId : Groups Id received from client
     * @return Groups data
     */
	public QltnMGroups getSingleData(String groupsId) {
		return Sym0016Dao.getQltnMGroupsMapper().selectByPrimaryKey(groupsId);
	}

    /**
     * Check input: blank fields
     * 
     * @param groupsData : data received from client
     * @return boolean : all fields have value: true/blank fields exist: false
     */
 	private boolean checkInputBlankFields(QltnMGroups groupsData) {
 		if (groupsData.getGroupsName().equals("") || groupsData.getGroupsCode().equals("")) {
 			return false;
 		} else {
 			return true;
 		}
 	}
}

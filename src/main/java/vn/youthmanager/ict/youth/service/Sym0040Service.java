package vn.youthmanager.ict.youth.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.ui.Model;

import com.fasterxml.jackson.databind.ObjectMapper;

import vn.youthmanager.ict.common.cnst.Constants;
import vn.youthmanager.ict.common.cnst.LoggerMessage;
import vn.youthmanager.ict.common.db.model.QltnMCategory;
import vn.youthmanager.ict.common.db.model.QltnMCategoryExample;
import vn.youthmanager.ict.common.db.model.QltnMCity;
import vn.youthmanager.ict.common.db.model.QltnMCityExample;
import vn.youthmanager.ict.common.db.model.QltnMCountry;
import vn.youthmanager.ict.common.db.model.QltnMCountryExample;
import vn.youthmanager.ict.common.db.model.QltnMDistrict;
import vn.youthmanager.ict.common.db.model.QltnMDistrictExample;
import vn.youthmanager.ict.common.db.model.QltnMEducational;
import vn.youthmanager.ict.common.db.model.QltnMGroups;
import vn.youthmanager.ict.common.db.model.QltnMGroupsExample;
import vn.youthmanager.ict.common.db.model.QltnMPerson;
import vn.youthmanager.ict.common.db.model.QltnMReport;
import vn.youthmanager.ict.common.db.model.QltnMReportExample;
import vn.youthmanager.ict.common.db.model.QltnMSpecialized;
import vn.youthmanager.ict.common.db.model.QltnMSpecializedExample;
import vn.youthmanager.ict.common.db.model.QltnMStatus;
import vn.youthmanager.ict.common.db.model.QltnMStatusExample;
import vn.youthmanager.ict.common.db.model.QltnMTown;
import vn.youthmanager.ict.common.db.model.QltnMTownExample;
import vn.youthmanager.ict.common.db.model.QltnMUniversity;
import vn.youthmanager.ict.common.db.model.QltnMWards;
import vn.youthmanager.ict.common.db.model.QltnMWardsExample;
import vn.youthmanager.ict.common.util.Util;
import vn.youthmanager.ict.youth.dao.Sym0040Dao;
import vn.youthmanager.ict.youth.dao.Sym0041Dao;
import vn.youthmanager.ict.youth.dao.Sym0043Dao;
import vn.youthmanager.ict.youth.db.model.Sym0041Result;

@Service
public class Sym0040Service {

	private static Logger logger = Logger.getLogger(Sym0003Service.class);
	
	ObjectMapper mapper = new ObjectMapper();
	// Variables definition
    PlatformTransactionManager txManager;
    
    @Autowired
    private Sym0040Dao sym0040Dao;
    
    @Autowired
    private Sym0041Dao sym0041Dao;

    @Autowired
    private Sym0043Dao sym0043Dao;
    /**
     * initData.
     * 
     * @param model
     */
	public void initData(Model model) {
		HashMap<String, Object> params = new HashMap<String, Object>();
		ArrayList<QltnMPerson> listSttPerson = new ArrayList<QltnMPerson>();
		listSttPerson = sym0043Dao.getSym0043Mapper().getLastSTTPerson(params);
		if (listSttPerson.size() > 0) {
			model.addAttribute("lastKskquanStt", Integer.parseInt(listSttPerson.get(0).getKskquanStt()) + 1);
			model.addAttribute("lastLltnStt", Integer.parseInt(listSttPerson.get(0).getLltnStt()) + 1);
		} else {
			model.addAttribute("lastKskquanStt", 1);
			model.addAttribute("lastLltnStt", 1);
		}
		List<QltnMReport> reportData = new ArrayList<QltnMReport>();
		// get all data of report with delete flag = 0
		try {
			QltnMReportExample qltnMReportExample = new QltnMReportExample();
			QltnMReportExample.Criteria qltnMReportCriteria = qltnMReportExample.createCriteria();
			qltnMReportCriteria.andDeleteFlagEqualTo(Constants.DELETE_FLAG_OFF);
			reportData = sym0040Dao.getQltnMReportMapper().selectByExample(qltnMReportExample);
		} catch (Exception ex) {
			ex.printStackTrace();
			reportData = new ArrayList<QltnMReport>();
		}
		try {
			model.addAttribute("reportData", mapper.writeValueAsString(reportData));
		} catch (Exception ex) {
			model.addAttribute("reportData", "''");
		}
		// category
		List<QltnMCategory> cateData = new ArrayList<QltnMCategory>();
		try {
			QltnMCategoryExample QltnMCategoryExample = new QltnMCategoryExample();
			QltnMCategoryExample.Criteria countryCriteria = QltnMCategoryExample.createCriteria();
			countryCriteria.andDeleteFlagEqualTo(Constants.DELETE_FLAG_OFF);
			cateData = sym0040Dao.getQltnMCategoryMapper().selectByExample(QltnMCategoryExample);
			model.addAttribute("cateData", mapper.writeValueAsString(cateData));
        } catch (Exception ex) {
            ex.printStackTrace();
            cateData = new ArrayList<QltnMCategory>();
        }
		try {
            model.addAttribute("cateData", mapper.writeValueAsString(cateData));
        } catch (Exception ex) {
        	model.addAttribute("cateData", "");
        }
		// Status 
		List<QltnMStatus> StatusData = new ArrayList<QltnMStatus>();
		try {
			QltnMStatusExample QltnMStatusExample = new QltnMStatusExample();
			QltnMStatusExample.Criteria countryCriteria = QltnMStatusExample.createCriteria();
			countryCriteria.andDeleteFlagEqualTo(Constants.DELETE_FLAG_OFF);
			StatusData = sym0040Dao.getQltnMStatusMapper().selectByExample(QltnMStatusExample);
			model.addAttribute("StatusData", mapper.writeValueAsString(StatusData));
        } catch (Exception ex) {
            ex.printStackTrace();
            StatusData = new ArrayList<QltnMStatus>();
        }
		try {
            model.addAttribute("StatusData", mapper.writeValueAsString(StatusData));
        } catch (Exception ex) {
        	model.addAttribute("StatusData", "");
        }
		// Combobox Country Data
		List<QltnMCountry> countryData = new ArrayList<QltnMCountry>();
		try {
			QltnMCountryExample qltnMCountryExample = new QltnMCountryExample();
			QltnMCountryExample.Criteria countryCriteria = qltnMCountryExample.createCriteria();
			countryCriteria.andDeleteFlagEqualTo(Constants.DELETE_FLAG_OFF);
			countryData = sym0040Dao.getQltnMCountryMapper().selectByExample(qltnMCountryExample);
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
		// University
		List<QltnMUniversity> universityData = new ArrayList<QltnMUniversity>();
		try {
			universityData = sym0040Dao.getQltnMUniversityMapper().selectByExample(null);
			model.addAttribute("universityData", mapper.writeValueAsString(universityData));
        } catch (Exception ex) {
            ex.printStackTrace();
            universityData = new ArrayList<QltnMUniversity>();
        }
		try {
            model.addAttribute("universityData", mapper.writeValueAsString(universityData));
        } catch (Exception ex) {
        	model.addAttribute("universityData", "''");
        }
		// education
		List<QltnMEducational> educationData = new ArrayList<QltnMEducational>();
		try {
			educationData = sym0040Dao.getQltnMEducationalMapper().selectByExample(null);
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
	}

	/**
	 * getCityNameByCountryId.
	 * 
	 * @param countryId
	 * @return
	 */
	public List<QltnMCity> getCityNameByCountryId(String countryId) {
		// Combobox City Data
		List<QltnMCity> cityData = new ArrayList<QltnMCity>();
		QltnMCityExample qltnMCityExample = new QltnMCityExample();
		QltnMCityExample.Criteria  cityCriteria = qltnMCityExample.createCriteria();
		cityCriteria.andCountryIdEqualTo(countryId);
	
		cityCriteria.andDeleteFlagEqualTo(Constants.DELETE_FLAG_OFF);
		cityData = sym0040Dao.getQltnMCityMapper().selectByExample(qltnMCityExample);
		return cityData;
	}

	public List<QltnMSpecialized> getSpecializedDataByUniversityId(String universityId) {
		// Combobox City Data
		List<QltnMSpecialized> specializedData = new ArrayList<QltnMSpecialized>();
		QltnMSpecializedExample qltnMSpecializedExample = new QltnMSpecializedExample();
		QltnMSpecializedExample.Criteria  specializedCriteria = qltnMSpecializedExample.createCriteria();
		specializedCriteria.andUniversityIdEqualTo(universityId);
	
		specializedCriteria.andDeleteFlagEqualTo(Constants.DELETE_FLAG_OFF);
		specializedData = sym0040Dao.getQltnMSpecializedMapper().selectByExample(qltnMSpecializedExample);
		return specializedData;
	}

	public List<QltnMDistrict> getDistrictNameByCityId(String countryId, String cityId) {
		// Combobox City Data
		List<QltnMDistrict> districtData = new ArrayList<QltnMDistrict>();
		QltnMDistrictExample qltnMDistrictExample = new QltnMDistrictExample();
		QltnMDistrictExample.Criteria  districtCriteria = qltnMDistrictExample.createCriteria();
		districtCriteria.andCountryIdEqualTo(countryId);
		districtCriteria.andCityIdEqualTo(cityId);
		districtCriteria.andDeleteFlagEqualTo(Constants.DELETE_FLAG_OFF);
		districtData = sym0040Dao.getQltnMDistrictMapper().selectByExample(qltnMDistrictExample);
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
		wardsData = sym0040Dao.getQltnMWardsMapper().selectByExample(qltnMWardsExample);
		return wardsData;
	}

	public List<QltnMTown> getTownNameByWardsId(String countryId, String cityId, String districtId, String wardsId) {
		// Combobox Town Data
		List<QltnMTown> townData = new ArrayList<QltnMTown>();
		QltnMTownExample qltnMTownExample = new QltnMTownExample();
		QltnMTownExample.Criteria  townCriteria = qltnMTownExample.createCriteria();
		townCriteria.andCountryIdEqualTo(countryId);
		townCriteria.andCityIdEqualTo(cityId);
		townCriteria.andDistrictIdEqualTo(districtId);
		townCriteria.andWardsIdEqualTo(wardsId);
		townCriteria.andDeleteFlagEqualTo(Constants.DELETE_FLAG_OFF);
		townData = sym0040Dao.getQltnMTownMapper().selectByExample(qltnMTownExample);
		return townData;
	}

	public List<QltnMGroups> getGroupsDataByTownId(String countryId, String cityId, String districtId, String wardsId, String townId) {
		// Combobox Groups Data
		List<QltnMGroups> townData = new ArrayList<QltnMGroups>();
		QltnMGroupsExample qltnMGroupsExample = new QltnMGroupsExample();
		QltnMGroupsExample.Criteria  groupsCriteria = qltnMGroupsExample.createCriteria();
		groupsCriteria.andCountryIdEqualTo(countryId);
		groupsCriteria.andCityIdEqualTo(cityId);
		groupsCriteria.andDistrictIdEqualTo(districtId);
		groupsCriteria.andWardsIdEqualTo(wardsId);
		groupsCriteria.andTownIdEqualTo(townId);
		groupsCriteria.andDeleteFlagEqualTo(Constants.DELETE_FLAG_OFF);
		townData = sym0040Dao.getQltnMGroupsMapper().selectByExample(qltnMGroupsExample);
		return townData;
	}

	/**
	 * getPersonDetail.
	 * 
	 * get person's information
	 * @param personId
	 * @return
	 */
	public List<Sym0041Result> getPersonDetail(String personId) {
		List<Sym0041Result> symList0041 = new ArrayList<Sym0041Result>();
		HashMap<String, Object> params = createSearchConditionParams(personId);
        try {
            logger.info(LoggerMessage.SEARCHING_STRATED);
            // search starts
            symList0041 = sym0041Dao.getSym0041Mapper().getPersonDetail(params);
            logger.info(LoggerMessage.EXECUTION_FINISHED);
            if (symList0041.size() > 0) {
                // handle city input data
                convertSanitize(symList0041);
                logger.info(LoggerMessage.SEARCHING_FINISHED);
            } else {
                logger.info(LoggerMessage.SEARCHING_FINISHED);
                logger.info(LoggerMessage.ZERO_ITEM);
            }
        } catch (OutOfMemoryError ex) {
            ex.printStackTrace();
            Sym0041Result tempObj = new Sym0041Result();
            tempObj.setSearchDataTotalCounts("-1");
            symList0041.add(tempObj);
        } catch (Exception ex) {
            ex.printStackTrace();
            symList0041 = null;
        }
        return symList0041;
	}
	
	private HashMap<String, Object> createSearchConditionParams(String personId) {
        HashMap<String, Object> params = new HashMap<String, Object>();
        // cate Id 
        params.put("personId", personId);
        return params;
    }

	private void convertSanitize(List<Sym0041Result> inputData) {
        for (int i = 0; i < inputData.size(); i++) {
        	Sym0041Result currentData = inputData.get(i);
        	// country Name
        	currentData.setCountryName(Util.convertSanitize(currentData.getCountryName()));
        	// city Name
        	currentData.setCityName(Util.convertSanitize(currentData.getCityName()));
        	// District Name
        	currentData.setDistrictName(Util.convertSanitize(currentData.getDistrictName()));
        	// wards Name
        	currentData.setWardsName(Util.convertSanitize(currentData.getWardsName()));
        	// town Name
        	currentData.setTownName(Util.convertSanitize(currentData.getTownName()));
        	// groups Name
        	currentData.setGroupsName(Util.convertSanitize(currentData.getGroupsName()));
            // category Name
            currentData.setCateName(Util.convertSanitize(currentData.getCateName()));
            // status Name
            currentData.setStatusName(Util.convertSanitize(currentData.getStatusName()));
            // person Name
            currentData.setPersonName(Util.convertSanitize(currentData.getPersonName()));
			// level
			currentData.setLevel(Util.convertSanitize(currentData.getLevel()));
			// University Name
			currentData.setUniversityName(Util.convertSanitize(currentData.getUniversityName()));
			// specialized Name
			currentData.setSpecializedName(Util.convertSanitize(currentData.getSpecializedName()));
        }
    }
}

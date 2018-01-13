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
import vn.youthmanager.ict.common.db.model.QltnMCategory;
import vn.youthmanager.ict.common.db.model.QltnMCategoryExample;
import vn.youthmanager.ict.common.db.model.QltnMCity;
import vn.youthmanager.ict.common.db.model.QltnMCityExample;
import vn.youthmanager.ict.common.db.model.QltnMCountry;
import vn.youthmanager.ict.common.db.model.QltnMCountryExample;
import vn.youthmanager.ict.common.db.model.QltnMDetailReport;
import vn.youthmanager.ict.common.db.model.QltnMDetailReportExample;
import vn.youthmanager.ict.common.db.model.QltnMDistrict;
import vn.youthmanager.ict.common.db.model.QltnMDistrictExample;
import vn.youthmanager.ict.common.db.model.QltnMEducational;
import vn.youthmanager.ict.common.db.model.QltnMFamilyRelatives;
import vn.youthmanager.ict.common.db.model.QltnMGroups;
import vn.youthmanager.ict.common.db.model.QltnMGroupsExample;
import vn.youthmanager.ict.common.db.model.QltnMProcessPerson;
import vn.youthmanager.ict.common.db.model.QltnMReport;
import vn.youthmanager.ict.common.db.model.QltnMReportExample;
import vn.youthmanager.ict.common.db.model.QltnMSpecialized;
import vn.youthmanager.ict.common.db.model.QltnMSpecializedExample;
import vn.youthmanager.ict.common.db.model.QltnMStatus;
import vn.youthmanager.ict.common.db.model.QltnMStatusExample;
import vn.youthmanager.ict.common.db.model.QltnMTown;
import vn.youthmanager.ict.common.db.model.QltnMTownExample;
import vn.youthmanager.ict.common.db.model.QltnMUniversity;
import vn.youthmanager.ict.common.db.model.QltnMUniversityExample;
import vn.youthmanager.ict.common.db.model.QltnMWards;
import vn.youthmanager.ict.common.db.model.QltnMWardsExample;
import vn.youthmanager.ict.youth.dao.Sym0040Dao;
import vn.youthmanager.ict.youth.dao.Sym0043Dao;

@Service
public class Sym0043Service {

	private static Logger logger = Logger.getLogger(Sym0019Service.class);

	ObjectMapper mapper = new ObjectMapper();
	PlatformTransactionManager txManager;
/*
	@Autowired
	private ApplicationContext appContext;*/

	@Autowired
	private Sym0043Dao sym0043Dao;

	@Autowired
	private Sym0040Dao sym0040Dao;
	public static void setLogger(Logger logger) {
		Sym0043Service.logger = logger;
	}
/*
	public void setAppContext(ApplicationContext appContext) {
		this.appContext = appContext;
	}*/

	// change report Id String to array
	public void initData(Model model) {

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
	 * @return List<QltnMCity>
	 */
	public List<QltnMCity> getCityNameByCountryId(String countryId) {
		// Combobox City Data
		List<QltnMCity> cityData = new ArrayList<QltnMCity>();
		QltnMCityExample qltnMCityExample = new QltnMCityExample();
		QltnMCityExample.Criteria cityCriteria = qltnMCityExample.createCriteria();
		cityCriteria.andCountryIdEqualTo(countryId);

		cityCriteria.andDeleteFlagEqualTo(Constants.DELETE_FLAG_OFF);
		cityData = sym0040Dao.getQltnMCityMapper().selectByExample(qltnMCityExample);
		return cityData;
	}

	/**
	 * getSpecializedDataByUniversityId.
	 * 
	 * @param universityId
	 * @return List<QltnMSpecialized>
	 */
	public List<QltnMSpecialized> getSpecializedDataByUniversityId(String universityId) {
		// Combobox City Data
		List<QltnMSpecialized> specializedData = new ArrayList<QltnMSpecialized>();
		QltnMSpecializedExample qltnMSpecializedExample = new QltnMSpecializedExample();
		QltnMSpecializedExample.Criteria specializedCriteria = qltnMSpecializedExample.createCriteria();
		specializedCriteria.andUniversityIdEqualTo(universityId);

		specializedCriteria.andDeleteFlagEqualTo(Constants.DELETE_FLAG_OFF);
		specializedData = sym0040Dao.getQltnMSpecializedMapper().selectByExample(qltnMSpecializedExample);
		return specializedData;
	}

	/**
	 * getUniversityDataByEducationId.
	 * 
	 * @param educationId
	 * @return List<QltnMUniversity>
	 */
	public List<QltnMUniversity> getUniversityDataByEducationId(String educationId) {
		// Combobox City Data
		List<QltnMUniversity> universityData = new ArrayList<QltnMUniversity>();
		QltnMUniversityExample qltnMUniversityExample = new QltnMUniversityExample();
		QltnMUniversityExample.Criteria universityCriteria = qltnMUniversityExample.createCriteria();
		universityCriteria.andEducationIdEqualTo(educationId);

		universityCriteria.andDeleteFlagEqualTo(Constants.DELETE_FLAG_OFF);
		universityData = sym0040Dao.getQltnMUniversityMapper().selectByExample(qltnMUniversityExample);
		return universityData;
	}

	/**
	 * getDistrictNameByCityId.
	 * 
	 * @param countryId
	 * @param cityId
	 * @return List<QltnMDistrict>
	 */
	public List<QltnMDistrict> getDistrictNameByCityId(String countryId, String cityId) {
		// Combobox City Data
		List<QltnMDistrict> districtData = new ArrayList<QltnMDistrict>();
		QltnMDistrictExample qltnMDistrictExample = new QltnMDistrictExample();
		QltnMDistrictExample.Criteria districtCriteria = qltnMDistrictExample.createCriteria();
		districtCriteria.andCountryIdEqualTo(countryId);
		districtCriteria.andCityIdEqualTo(cityId);
		districtCriteria.andDeleteFlagEqualTo(Constants.DELETE_FLAG_OFF);
		districtData = sym0040Dao.getQltnMDistrictMapper().selectByExample(qltnMDistrictExample);
		return districtData;
	}

	/**
	 * getWardsNameByDistrictId.
	 * 
	 * @param countryId
	 * @param cityId
	 * @param districtId
	 * @return List<QltnMWards>
	 */
	public List<QltnMWards> getWardsNameByDistrictId(String countryId, String cityId, String districtId) {
		// Combobox wards Data
		List<QltnMWards> wardsData = new ArrayList<QltnMWards>();
		QltnMWardsExample qltnMWardsExample = new QltnMWardsExample();
		QltnMWardsExample.Criteria wardsCriteria = qltnMWardsExample.createCriteria();
		wardsCriteria.andCountryIdEqualTo(countryId);
		wardsCriteria.andCityIdEqualTo(cityId);
		wardsCriteria.andDistrictIdEqualTo(districtId);
		wardsCriteria.andDeleteFlagEqualTo(Constants.DELETE_FLAG_OFF);
		wardsData = sym0040Dao.getQltnMWardsMapper().selectByExample(qltnMWardsExample);
		return wardsData;
	}

	/**
	 * getTownNameByWardsId.
	 * 
	 * @param countryId
	 * @param cityId
	 * @param districtId
	 * @param wardsId
	 * @return List<QltnMTown>
	 */
	public List<QltnMTown> getTownNameByWardsId(String countryId, String cityId, String districtId, String wardsId) {
		// Combobox Town Data
		List<QltnMTown> townData = new ArrayList<QltnMTown>();
		QltnMTownExample qltnMTownExample = new QltnMTownExample();
		QltnMTownExample.Criteria townCriteria = qltnMTownExample.createCriteria();
		townCriteria.andCountryIdEqualTo(countryId);
		townCriteria.andCityIdEqualTo(cityId);
		townCriteria.andDistrictIdEqualTo(districtId);
		townCriteria.andWardsIdEqualTo(wardsId);
		townCriteria.andDeleteFlagEqualTo(Constants.DELETE_FLAG_OFF);
		townData = sym0040Dao.getQltnMTownMapper().selectByExample(qltnMTownExample);
		return townData;
	}

	/**
	 * getGroupsDataByTownId.
	 * 
	 * @param countryId
	 * @param cityId
	 * @param districtId
	 * @param wardsId
	 * @param townId
	 * @return List<QltnMGroups>
	 */
	public List<QltnMGroups> getGroupsDataByTownId(String countryId, String cityId, String districtId, String wardsId,
			String townId) {
		// Combobox Groups Data
		List<QltnMGroups> townData = new ArrayList<QltnMGroups>();
		QltnMGroupsExample qltnMGroupsExample = new QltnMGroupsExample();
		QltnMGroupsExample.Criteria groupsCriteria = qltnMGroupsExample.createCriteria();
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
	 * getDetailReport.
	 * 
	 * @param reportId
	 * @return List<QltnMDetailReport>
	 */
	public List<QltnMDetailReport> getDetailReport(String reportId) {
		List<QltnMDetailReport> detailReportData = new ArrayList<QltnMDetailReport>();
		try {
			QltnMDetailReportExample qltnMDetailReportExample = new QltnMDetailReportExample();
			QltnMDetailReportExample.Criteria qltnMDetailReportCriteria = qltnMDetailReportExample.createCriteria();
			qltnMDetailReportCriteria.andDeleteFlagEqualTo(Constants.DELETE_FLAG_OFF);
			qltnMDetailReportCriteria.andReportIdEqualTo(reportId);
			detailReportData = sym0040Dao.getQltnMDetailReportMapper().selectByExample(qltnMDetailReportExample);
		} catch (Exception ex) {
			ex.printStackTrace();
			detailReportData = new ArrayList<QltnMDetailReport>();
		}
		return detailReportData;
	}
	/**
	 * getProcessEdit.
	 * 
	 * get list process person by personId
	 * @param personId
	 * @return ArrayList<QltnMProcessPerson>
	 */
	public ArrayList<QltnMProcessPerson> getProcessEdit(String personId) {
		ArrayList<QltnMProcessPerson> qltnMProcessPersonsList = new ArrayList<QltnMProcessPerson>();
		HashMap<String, Object> params = new HashMap<String, Object>();
		params.put("personId", "'" +personId + "'");
		try {
			qltnMProcessPersonsList = sym0043Dao.getSym0043Mapper().getProcessEdit(params);
		} catch (Exception ex) {
			ex.printStackTrace();
			qltnMProcessPersonsList = null;
			logger.error("Error message: " + ex.getMessage());
		}
		return qltnMProcessPersonsList;
	}

	public ArrayList<QltnMFamilyRelatives> getRelationShipOfPersonEdit(String personId) {
		ArrayList<QltnMFamilyRelatives> qltnMProcessPersonsList = new ArrayList<QltnMFamilyRelatives>();
		HashMap<String, Object> params = new HashMap<String, Object>();
		params.put("personId", "'" +personId + "'");
		try {
			qltnMProcessPersonsList = sym0043Dao.getSym0043Mapper().getRelationShipOfPersonEdit(params);
		} catch (Exception ex) {
			ex.printStackTrace();
			qltnMProcessPersonsList = null;
			logger.error("Error message: " + ex.getMessage());
		}
		return qltnMProcessPersonsList;
	}
}

package vn.youthmanager.ict.youth.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
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
import vn.youthmanager.ict.common.db.model.QltnMCategory;
import vn.youthmanager.ict.common.db.model.QltnMCategoryExample;
import vn.youthmanager.ict.common.db.model.QltnMCity;
import vn.youthmanager.ict.common.db.model.QltnMCityExample;
import vn.youthmanager.ict.common.db.model.QltnMCountry;
import vn.youthmanager.ict.common.db.model.QltnMCountryExample;
import vn.youthmanager.ict.common.db.model.QltnMDistrict;
import vn.youthmanager.ict.common.db.model.QltnMDistrictExample;
import vn.youthmanager.ict.common.db.model.QltnMEducational;
import vn.youthmanager.ict.common.db.model.QltnMFamilyRelatives;
import vn.youthmanager.ict.common.db.model.QltnMGroups;
import vn.youthmanager.ict.common.db.model.QltnMGroupsExample;
import vn.youthmanager.ict.common.db.model.QltnMNoteReport;
import vn.youthmanager.ict.common.db.model.QltnMNoteReportKey;
import vn.youthmanager.ict.common.db.model.QltnMPerson;
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
	private ApplicationContext appContext;

	@Autowired
	private Sym0040Dao sym0040Dao;

	@Autowired
	private Sym0041Dao sym0041Dao;

	@Autowired
	private Sym0043Dao sym0043Dao;

	// count so lan insert relationship
	private int countRelation = 0;

	// count so lan insert process person
	private int countProcessPerson;

	// count so lan insert note report
	private int countNoteReport;

	public int getCountNoteReport() {
		return countNoteReport;
	}

	public void setCountNoteReport(int countNoteReport) {
		this.countNoteReport = countNoteReport;
	}

	public int getCountProcessPerson() {
		return countProcessPerson;
	}

	public void setCountProcessPerson(int countProcessPerson) {
		this.countProcessPerson = countProcessPerson;
	}

	public int getCountRelation() {
		return countRelation;
	}

	public void setCountRelation(int countRelation) {
		this.countRelation = countRelation;
	}

	/**
	 * getLastSTTPerson.
	 * 
	 * @return String
	 */
	public String getLastSTTPerson() {
		HashMap<String, Object> params = new HashMap<String, Object>();
		ArrayList<QltnMPerson> listSttPerson = new ArrayList<QltnMPerson>();
		listSttPerson = sym0043Dao.getSym0043Mapper().getLastSTTPerson(params);
		return String.valueOf(Integer.parseInt(listSttPerson.get(0).getKskquanStt()) + 1) + "-"
				+ String.valueOf(Integer.parseInt(listSttPerson.get(0).getLltnStt()) + 1);
	}

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
		QltnMCityExample.Criteria cityCriteria = qltnMCityExample.createCriteria();
		cityCriteria.andCountryIdEqualTo(countryId);

		cityCriteria.andDeleteFlagEqualTo(Constants.DELETE_FLAG_OFF);
		cityData = sym0040Dao.getQltnMCityMapper().selectByExample(qltnMCityExample);
		return cityData;
	}

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
	 * getPersonDetail.
	 * 
	 * get person's information
	 * 
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

	private Boolean checkInputBlankFiled(QltnMPerson personData) {
		// check cateId != -2
		if (personData.getCateId().equalsIgnoreCase(Constants.SEARCH_CONDITION_NO_SELECT)) {
			return false;
		} else if (personData.getStatusId().equalsIgnoreCase(Constants.SEARCH_CONDITION_NO_SELECT)) { // check statusId
																										// != -2
			return false;
		} else if (personData.getPersonName().trim().equalsIgnoreCase("")) { // check personName != ""
			return false;
		} else if (personData.getDateOfBirth().trim().equalsIgnoreCase("")) { // check DateOfBirth != ""
			return false;
		} else if (personData.getMonthOfBirth().trim().equalsIgnoreCase("")) { // check MonthOfBirth != ""
			return false;
		} else if (personData.getYearOfBirth().trim().equalsIgnoreCase("")) { // check YearOfBirth != ""
			return false;
		} else if (personData.getPhone().trim().equalsIgnoreCase("")) { // check phone != ""
			return false;
		} else if (personData.getKskquanStt().trim().equalsIgnoreCase("")) { // check KskquanStt != ""
			return false;
		} else if (personData.getLltnStt().trim().equalsIgnoreCase("")) { // check LltnStt != ""
			return false;
		} else if (personData.getIdentityCard().trim().equalsIgnoreCase("")) { // check identityCard != ""
			return false;
		} else if (personData.getPlaceOfBirth().trim().equalsIgnoreCase("")) { // check PlaceOfBirth != ""
			return false;
		} else if (personData.getNativeCountry().trim().equalsIgnoreCase("")) { // check nativeCountry != ""
			return false;
		} else if (personData.getNation().trim().equalsIgnoreCase("")) { // check nation != ""
			return false;
		} else if (personData.getReligion().trim().equalsIgnoreCase("")) { // check religion != ""
			return false;
		} else if (personData.getPermanentAddress().trim().equalsIgnoreCase("")) { // check permanentAddress != ""
			return false;
		} else if (personData.getTemporaryResidenceAddress().trim().equalsIgnoreCase("")) { // check
																							// temporaryResidenceAddress
																							// != ""
			return false;
		} else if (personData.getNational().trim().equalsIgnoreCase("")) { // check national != ""
			return false;
		} else if (personData.getCityId().trim().equalsIgnoreCase("")) { // check cityId != ""
			return false;
		} else if (personData.getDistrictId().trim().equalsIgnoreCase("")) { // check districtId != ""
			return false;
		} else if (personData.getWardsId().trim().equalsIgnoreCase("")) { // check wardsId != ""
			return false;
		} else if (personData.getTownId().trim().equalsIgnoreCase("")) { // check townId != ""
			return false;
		} else if (personData.getGroupsId().trim().equalsIgnoreCase("")) { // check groupsId != ""
			return false;
		} else if (personData.getElement().trim().equalsIgnoreCase("")) { // check element != ""
			return false;
		} else if (personData.getUniversityId().trim().equalsIgnoreCase("")) { // check universityId != ""
			return false;
		} else if (personData.getEducationalId().trim().equalsIgnoreCase("")) { // check educationalId != ""
			return false;
		} else if (personData.getGraduationYear().trim().equalsIgnoreCase("")) { // check graduationYear != ""
			return false;
		} else if (personData.getSpecializedId().trim().equalsIgnoreCase("")) { // check specializedId != ""
			return false;
		} else if (personData.getJobId().trim().equalsIgnoreCase("")) { // check jobId != ""
			return false;
		} else if (personData.getWorkPlace().trim().equalsIgnoreCase("")) { // check workPlace != ""
			return false;
		} else {
			return true;
		}
	}

	/**
	 * insertData Person
	 * 
	 * @param personData
	 * @return
	 */
	public String insertData(QltnMPerson personData) {
		// variable definition
		String returnValue = Constants.INSERT_RESULT_SUCCESSFUL;
		try {
			// check for user input
			if (!checkInputBlankFiled(personData)) {
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
				params.put("personIdDefault", Constants.PERSON_DEFAULT_ID);
				String idNumberStr = sym0043Dao.getSym0043Mapper().getLastIdPerson(params);
				int idNumber = 0;
				if (idNumberStr != null) {
					idNumber = Integer.parseInt(idNumberStr.substring(2));
				}

				if (idNumber <= Constants.PERSON_DEFAULT_ID) {
					idNumber = idNumber + 1;
					String personId = Constants.PERSON_CHARATER + String.format("%05d", idNumber);
					QltnMPerson personObj = new QltnMPerson();
					// person Id
					personObj.setPersonId(personId);
					// cate Id
					personObj.setCateId(personData.getCateId());
					// status Id
					personObj.setStatusId(personData.getStatusId());
					// person Name
					personObj.setPersonName(personData.getPersonName().trim());
					// date Of Birth
					personObj.setDateOfBirth(personData.getDateOfBirth().trim());
					// month Of Birth
					personObj.setMonthOfBirth(personData.getMonthOfBirth().trim());
					// year Of Birth
					personObj.setYearOfBirth(personData.getYearOfBirth().trim());
					// phone
					personObj.setPhone(personData.getPhone().trim());
					// kskquanStt
					personObj.setKskquanStt(personData.getKskquanStt().trim());
					// lltnStt
					personObj.setLltnStt(personData.getLltnStt().trim());
					// IdentityCard
					personObj.setIdentityCard(personData.getIdentityCard().trim());
					// placeOfBirth
					personObj.setPlaceOfBirth(personData.getPlaceOfBirth().trim());
					// nativeCountry
					personObj.setNativeCountry(personData.getNativeCountry().trim());
					// nation
					personObj.setNation(personData.getNation().trim());
					// religion
					personObj.setReligion(personData.getReligion().trim());
					// permanentAddress
					personObj.setPermanentAddress(personData.getPermanentAddress().trim());
					// temporaryResidenceAddress
					personObj.setTemporaryResidenceAddress(personData.getTemporaryResidenceAddress().trim());
					// national
					personObj.setNational(personData.getNational().trim());
					// cityId
					personObj.setCityId(personData.getCityId().trim());
					// District Id
					personObj.setDistrictId(personData.getDistrictId().trim());
					// Wards Id
					personObj.setWardsId(personData.getWardsId().trim());
					// Town Id
					personObj.setTownId(personData.getTownId().trim());
					// groups Id
					personObj.setGroupsId(personData.getGroupsId().trim());
					// element
					personObj.setElement(personData.getElement().trim());
					// universityId
					personObj.setUniversityId(personData.getUniversityId().trim());
					// educationalId
					personObj.setEducationalId(personData.getEducationalId().trim());
					// specializedId
					personObj.setSpecializedId(personData.getSpecializedId().trim());
					// jobId
					personObj.setJobId(personData.getJobId().trim());
					// Work Place
					personObj.setWorkPlace(personData.getWorkPlace().trim());
					// create user id
					personObj.setCreateUserId(Util.getUserInfo().getID());
					// update user id
					personObj.setUpdateUserId(Util.getUserInfo().getID());
					// delete flag
					personObj.setDeleteFlag(Constants.DELETE_FLAG_OFF);

					int result = sym0043Dao.getQltnMPersonMapper().insert(personObj);
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
			} catch (Exception ex) {
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

	public String updateData(QltnMPerson personData) {
		// variable definition
		String returnValue = Constants.INSERT_RESULT_SUCCESSFUL;
		try {
			// check for user input
			if (!checkInputBlankFiled(personData)) {
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
				QltnMPerson personObj = new QltnMPerson();
				// person Id
				personObj.setPersonId(personData.getPersonId());
				// cate Id
				personObj.setCateId(personData.getCateId());
				// status Id
				personObj.setStatusId(personData.getStatusId());
				// person Name
				personObj.setPersonName(personData.getPersonName().trim());
				// date Of Birth
				personObj.setDateOfBirth(personData.getDateOfBirth().trim());
				// month Of Birth
				personObj.setMonthOfBirth(personData.getMonthOfBirth().trim());
				// year Of Birth
				personObj.setYearOfBirth(personData.getYearOfBirth().trim());
				// phone
				personObj.setPhone(personData.getPhone().trim());
				// kskquanStt
				personObj.setKskquanStt(personData.getKskquanStt().trim());
				// lltnStt
				personObj.setLltnStt(personData.getLltnStt().trim());
				// IdentityCard
				personObj.setIdentityCard(personData.getIdentityCard().trim());
				// placeOfBirth
				personObj.setPlaceOfBirth(personData.getPlaceOfBirth().trim());
				// nativeCountry
				personObj.setNativeCountry(personData.getNativeCountry().trim());
				// nation
				personObj.setNation(personData.getNation().trim());
				// religion
				personObj.setReligion(personData.getReligion().trim());
				// permanentAddress
				personObj.setPermanentAddress(personData.getPermanentAddress().trim());
				// temporaryResidenceAddress
				personObj.setTemporaryResidenceAddress(personData.getTemporaryResidenceAddress().trim());
				// national
				personObj.setNational(personData.getNational().trim());
				// cityId
				personObj.setCityId(personData.getCityId().trim());
				// District Id
				personObj.setDistrictId(personData.getDistrictId().trim());
				// Wards Id
				personObj.setWardsId(personData.getWardsId().trim());
				// Town Id
				personObj.setTownId(personData.getTownId().trim());
				// groups Id
				personObj.setGroupsId(personData.getGroupsId().trim());
				// element
				personObj.setElement(personData.getElement().trim());
				// universityId
				personObj.setUniversityId(personData.getUniversityId().trim());
				// educationalId
				personObj.setEducationalId(personData.getEducationalId().trim());
				// specializedId
				personObj.setSpecializedId(personData.getSpecializedId().trim());
				// jobId
				personObj.setJobId(personData.getJobId().trim());
				// Work Place
				personObj.setWorkPlace(personData.getWorkPlace().trim());
				// update user id
				personObj.setUpdateUserId(Util.getUserInfo().getID());
				// delete flag
				personObj.setDeleteFlag(Constants.DELETE_FLAG_OFF);

				int result = sym0043Dao.getQltnMPersonMapper().updateByPrimaryKeySelective(personObj);
				if (result > 0) { // insert successfully
					// register to DB
					txManager.commit(status);
				} else {
					returnValue = Constants.UPDATE_RESULT_SUCCESSFUL;
					txManager.rollback(status);
				}
			} catch (DuplicateKeyException ex) {
				ex.printStackTrace();
				logger.error("Error message: " + ex.getMessage());
				returnValue = Constants.INSERT_RESULT_DUPLICATED;
				txManager.rollback(status);
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
	 * insertProcessPerson.
	 * 
	 * @param processYoursellStr
	 * @return
	 */
	public String insertProcessPerson(String processYoursellStr, String personId) {
		String returnValue = "";
		int resultInsertData = 0;
		try {
			// transaction starts
			DefaultTransactionDefinition def = new DefaultTransactionDefinition();
			def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
			txManager = (PlatformTransactionManager) appContext.getBean("transactionManager");
			TransactionStatus status = txManager.getTransaction(def);
			// convert noteReportStr to String Array
			String processYoursellStrArr[] = processYoursellStr.split(",");
			List<String> processYourseltArr = Arrays.asList(processYoursellStrArr);
			setCountProcessPerson(0);

			for (int i = 0; i < processYourseltArr.size(); i++) {
				String item = processYourseltArr.get(i);
				int result = 0;
				// call function insertProcessYourselt
				try {
					result = insertProcessYourselt(item, personId);
					if (result > 0) { // insert successfully
						resultInsertData = 1;
					} else {
						resultInsertData = 0;
					}
				} catch (DuplicateKeyException ex) {
					ex.printStackTrace();
					logger.error("Error message: " + ex.getMessage());
					returnValue = Constants.INSERT_RESULT_DUPLICATED;
					txManager.rollback(status);
				} catch (Exception ex) {
					ex.printStackTrace();
					logger.error("Error message: " + ex.getMessage());
					returnValue = Constants.INSERT_RESULT_FAILED;
					txManager.rollback(status);
				}
			}
			// check resultInsertData == 1 ?
			if (resultInsertData == 1) {
				// insert successfully register to DB
				txManager.commit(status);
				returnValue = Constants.INSERT_RESULT_SUCCESSFUL;
			} else {
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
	 * insert Data into table process person
	 * 
	 * @param processYoursellData
	 * @param idNumberStr
	 * @return
	 */
	public int insertProcessYourselt(String processYoursellData, String idNumberStr) {

		int result = 0;
		QltnMProcessPerson processPersonObj = new QltnMProcessPerson();
		// convert String to String Array
		String detailProcessPersonArr[] = processYoursellData.split(":");
		int idNumber = 0;
		if (getCountProcessPerson() < 1) {
			idNumber = 0;
		} else {
			idNumber = getCountProcessPerson();
		}
		// tang so lan insert Process của thanh niên
		setCountProcessPerson(getCountProcessPerson() + 1);

		if (idNumber <= Constants.PERSON_DEFAULT_ID) {
			idNumber = idNumber + 1;
			String processPersonId = Constants.PROCESS_PERSON_CHARATER + String.format("%03d", idNumber);
			// process Person Id
			processPersonObj.setProcessPersonId(processPersonId);
			// FROM_YEAR
			processPersonObj.setFromYear(detailProcessPersonArr[1]);
			// TO_YEAR
			processPersonObj.setToYear(detailProcessPersonArr[2]);
			// CONTENT
			processPersonObj.setContent(detailProcessPersonArr[3]);
			// person Id
			processPersonObj.setPersonId(idNumberStr);
			// create user id
			processPersonObj.setCreateUserId(Util.getUserInfo().getID());
			// update user id
			processPersonObj.setUpdateUserId(Util.getUserInfo().getID());
			// delete flag
			processPersonObj.setDeleteFlag(Constants.DELETE_FLAG_OFF);
			result = sym0043Dao.getQltnMProcessPersonMapper().insert(processPersonObj);
		}
		return result;
	}

	public String updateProcessPerson(String processYoursellStr, String personId) {
		String returnValue = "";
		int resultInsertData = 0;
		try {
			// transaction starts
			DefaultTransactionDefinition def = new DefaultTransactionDefinition();
			def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
			txManager = (PlatformTransactionManager) appContext.getBean("transactionManager");
			TransactionStatus status = txManager.getTransaction(def);
			// convert noteReportStr to String Array
			String processYoursellStrArr[] = processYoursellStr.split(",");
			List<String> processYourseltArr = Arrays.asList(processYoursellStrArr);
			setCountProcessPerson(0);
			for (int i = 0; i < processYourseltArr.size(); i++) {
				String item = processYourseltArr.get(i);
				int result = 0;
				// call function insertProcessYourselt
				try {
					result = updateProcessYourselt(item, personId);
					if (result > 0) { // insert successfully
						resultInsertData = 1;
					} else {
						resultInsertData = 0;
					}
				} catch (DuplicateKeyException ex) {
					ex.printStackTrace();
					logger.error("Error message: " + ex.getMessage());
					returnValue = Constants.INSERT_RESULT_DUPLICATED;
					txManager.rollback(status);
				} catch (Exception ex) {
					ex.printStackTrace();
					logger.error("Error message: " + ex.getMessage());
					returnValue = Constants.INSERT_RESULT_FAILED;
					txManager.rollback(status);
				}
			}
			// check resultInsertData == 1 ?
			if (resultInsertData == 1) {
				// insert successfully register to DB
				txManager.commit(status);
				returnValue = Constants.INSERT_RESULT_SUCCESSFUL;
			} else {
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

	public int updateProcessYourselt(String processYoursellData, String idNumberStr) {

		int result = 0;
		QltnMProcessPerson processPersonObj = new QltnMProcessPerson();
		// convert String to String Array
		String detailProcessPersonArr[] = processYoursellData.split(":");
		// tang so lan insert Process của thanh niên
		setCountProcessPerson(getCountProcessPerson() + 1);
		// process Person Id
		processPersonObj.setProcessPersonId(detailProcessPersonArr[0]);
		// FROM_YEAR
		processPersonObj.setFromYear(detailProcessPersonArr[1]);
		// TO_YEAR
		processPersonObj.setToYear(detailProcessPersonArr[2]);
		// CONTENT
		processPersonObj.setContent(detailProcessPersonArr[3]);
		// person Id
		processPersonObj.setPersonId(idNumberStr);
		// create user id
		processPersonObj.setCreateUserId(Util.getUserInfo().getID());
		// update user id
		processPersonObj.setUpdateUserId(Util.getUserInfo().getID());
		// delete flag
		processPersonObj.setDeleteFlag(Constants.DELETE_FLAG_OFF);
		try {
			result = sym0043Dao.getQltnMProcessPersonMapper().deleteByPrimaryKey(processPersonObj);
			result = sym0043Dao.getQltnMProcessPersonMapper().insert(processPersonObj);
		} catch (Exception e) {
			// TODO: handle exception
		}
		return result;
	}

	public String insertRelation(String relationStr, String personId) {
		String returnValue = "";
		int resultInsertData = 0;
		try {
			// transaction starts
			DefaultTransactionDefinition def = new DefaultTransactionDefinition();
			def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
			txManager = (PlatformTransactionManager) appContext.getBean("transactionManager");
			TransactionStatus status = txManager.getTransaction(def);

			String relationStrArr[] = relationStr.split(",");
			List<String> familyRelativesArr = Arrays.asList(relationStrArr);
			setCountRelation(0);
			for (int i = 0; i < familyRelativesArr.size(); i++) {
				String item = familyRelativesArr.get(i);
				int result = 0;
				// call function insertRelativePerson
				try {
					result = insertRelativePerson(item, personId);
					if (result > 0) { // insert successfully
						resultInsertData = 1;
					} else {
						resultInsertData = 0;
					}
				} catch (DuplicateKeyException ex) {
					ex.printStackTrace();
					logger.error("Error message: " + ex.getMessage());
					returnValue = Constants.INSERT_RESULT_DUPLICATED;
					txManager.rollback(status);
				} catch (Exception ex) {
					ex.printStackTrace();
					logger.error("Error message: " + ex.getMessage());
					returnValue = Constants.INSERT_RESULT_FAILED;
					txManager.rollback(status);
				}
			}
			// check resultInsertData == 1 ?
			if (resultInsertData == 1) {
				// insert successfully register to DB
				txManager.commit(status);
				returnValue = Constants.INSERT_RESULT_SUCCESSFUL;
			} else {
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
	 * insert Data into table Family Relatives
	 * 
	 * @param processYoursellData
	 * @param idNumberStr
	 * @return
	 */
	public int insertRelativePerson(String relationStr, String idNumberStr) {
		int result = 0;
		QltnMFamilyRelatives familyRelativesPersonObj = new QltnMFamilyRelatives();
		// convert String to String Array
		String detailFamilyRelativesArr[] = relationStr.split(":");
		// select max id in QLTN_M_NOTE_REPORT
		int idNumber = 0;
		if (getCountRelation() < 1) {
			idNumber = 0;
		} else {
			idNumber = getCountRelation();
		}
		// tang so lan insert relationship của thanh niên
		setCountRelation(getCountRelation() + 1);
		if (idNumber <= Constants.PERSON_DEFAULT_ID) {
			idNumber = idNumber + 1;
			String familyPersonId = Constants.FAMILY_RELATION_PERSON_CHARATER + String.format("%03d", idNumber);
			// family Person Id
			familyRelativesPersonObj.setFamilyPersonId(familyPersonId);
			// relation
			familyRelativesPersonObj.setRelation(detailFamilyRelativesArr[1]);
			// status
			familyRelativesPersonObj.setStatus(detailFamilyRelativesArr[2]);
			// birthDay
			familyRelativesPersonObj.setBirthDay(detailFamilyRelativesArr[3]);
			// job
			familyRelativesPersonObj.setJob(detailFamilyRelativesArr[4]);
			// workPlace
			familyRelativesPersonObj.setWorkPlace(detailFamilyRelativesArr[5]);
			// person Id
			familyRelativesPersonObj.setPersonId(idNumberStr);
			// create user id
			familyRelativesPersonObj.setCreateUserId(Util.getUserInfo().getID());
			// update user id
			familyRelativesPersonObj.setUpdateUserId(Util.getUserInfo().getID());
			// delete flag
			familyRelativesPersonObj.setDeleteFlag(Constants.DELETE_FLAG_OFF);
			result = sym0043Dao.getQltnMFamilyRelativesMapper().insert(familyRelativesPersonObj);
		}
		return result;
	}

	public String insertNoteReport(String noteReportStr, String personId) {
		String returnValue = "";
		int resultInsertData = 0;
		try {
			// transaction starts
			DefaultTransactionDefinition def = new DefaultTransactionDefinition();
			def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
			txManager = (PlatformTransactionManager) appContext.getBean("transactionManager");
			TransactionStatus status = txManager.getTransaction(def);

			String noteReportArr[] = noteReportStr.split(",");
			List<String> noteReportStrArr = Arrays.asList(noteReportArr);
			setCountNoteReport(0);
			for (int i = 0; i < noteReportStrArr.size(); i++) {
				String item = noteReportStrArr.get(i);
				int result = 0;
				// call function insertRelativePerson
				try {
					result = insertDataNoteReport(item, personId);
					if (result > 0) { // insert successfully
						resultInsertData = 1;
					} else {
						resultInsertData = 0;
					}
				} catch (DuplicateKeyException ex) {
					ex.printStackTrace();
					logger.error("Error message: " + ex.getMessage());
					returnValue = Constants.INSERT_RESULT_DUPLICATED;
					txManager.rollback(status);
				} catch (Exception ex) {
					ex.printStackTrace();
					logger.error("Error message: " + ex.getMessage());
					returnValue = Constants.INSERT_RESULT_FAILED;
					txManager.rollback(status);
				}
			}
			// check resultInsertData == 1 ?
			if (resultInsertData == 1) {
				// insert successfully register to DB
				txManager.commit(status);
				returnValue = Constants.INSERT_RESULT_SUCCESSFUL;
			} else {
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
	 * insertDataNoteReport function insert Data
	 * 
	 * @param noteReportData
	 * @param idNumberStr
	 * @return
	 */
	private int insertDataNoteReport(String noteReportData, String personId) {
		int result = 0;
		QltnMNoteReport noteReportObj = new QltnMNoteReport();
		// convert String to String Array
		String detailnoteReportArr[] = noteReportData.split(":");
		int idNumber = 0;
		if (getCountNoteReport() < 1) {
			idNumber = 0;
		} else {
			idNumber = getCountNoteReport();
		}
		// tang so lan insert note report của thanh niên
		setCountNoteReport(getCountNoteReport() + 1);

		if (idNumber <= Constants.PERSON_DEFAULT_ID) {
			idNumber = idNumber + 1;
			String noteReportId = Constants.NOTE_REPORT_CHARATER + String.format("%05d", idNumber);
			// note reportId
			noteReportObj.setNoteReportId(noteReportId);
			// report Id
			noteReportObj.setReportId(detailnoteReportArr[0]);
			// detail Report Id
			noteReportObj.setDetailReportId(detailnoteReportArr[1]);
			// person Id
			noteReportObj.setPersonId(personId);
			// criteria Id
			noteReportObj.setCriteraId(detailnoteReportArr[2]);
			// create user id
			noteReportObj.setCreateUserId(Util.getUserInfo().getID());
			// update user id
			noteReportObj.setUpdateUserId(Util.getUserInfo().getID());
			// delete flag
			noteReportObj.setDeleteFlag(Constants.DELETE_FLAG_OFF);
			result = sym0043Dao.getQltnMNoteReportMapper().insert(noteReportObj);
		}
		return result;
	}

	/**
	 * 
	 * @param relationStr
	 * @param personId
	 * @return
	 */
	public String updateRelation(String relationStr, String personId) {
		String returnValue = "";
		int resultInsertData = 0;
		try {
			// transaction starts
			DefaultTransactionDefinition def = new DefaultTransactionDefinition();
			def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
			txManager = (PlatformTransactionManager) appContext.getBean("transactionManager");
			TransactionStatus status = txManager.getTransaction(def);
			// convert noteReportStr to String Array
			String relationStrArr[] = relationStr.split(",");
			List<String> familyRelativesArr = Arrays.asList(relationStrArr);
			setCountRelation(0);
			for (int i = 0; i < familyRelativesArr.size(); i++) {
				String item = familyRelativesArr.get(i);
				int result = 0;
				// call function insertProcessYourselt
				try {
					result = updateRelativePerson(item, personId);
					if (result > 0) { // insert successfully
						resultInsertData = 1;
					} else {
						resultInsertData = 0;
					}
				} catch (DuplicateKeyException ex) {
					ex.printStackTrace();
					logger.error("Error message: " + ex.getMessage());
					returnValue = Constants.INSERT_RESULT_DUPLICATED;
					txManager.rollback(status);
				} catch (Exception ex) {
					ex.printStackTrace();
					logger.error("Error message: " + ex.getMessage());
					returnValue = Constants.INSERT_RESULT_FAILED;
					txManager.rollback(status);
				}
			}
			// check resultInsertData == 1 ?
			if (resultInsertData == 1) {
				// insert successfully register to DB
				txManager.commit(status);
				returnValue = Constants.INSERT_RESULT_SUCCESSFUL;
			} else {
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

	public int updateRelativePerson(String relationStr, String idNumberStr) {
		int result = 0;
		QltnMFamilyRelatives familyRelativesPersonObj = new QltnMFamilyRelatives();
		// convert String to String Array
		String detailFamilyRelativesArr[] = relationStr.split(":");
		HashMap<String, Object> params = new HashMap<String, Object>();
		params.put("personId", "'" + idNumberStr + "'");
		// select max id in QLTN_M_NOTE_REPORT
		int idNumber = 0;
		if (getCountRelation() < 1) {
			idNumber = 0;
		} else {
			idNumber = getCountRelation();
		}
		// tang so lan insert relationship của thanh niên
		setCountRelation(getCountRelation() + 1);
		if (idNumber <= Constants.PERSON_DEFAULT_ID) {
			// family Person Id
			familyRelativesPersonObj.setFamilyPersonId(detailFamilyRelativesArr[0]);
			// relation
			familyRelativesPersonObj.setRelation(detailFamilyRelativesArr[1]);
			// status
			familyRelativesPersonObj.setStatus(detailFamilyRelativesArr[2]);
			// birthDay
			familyRelativesPersonObj.setBirthDay(detailFamilyRelativesArr[3]);
			// job
			familyRelativesPersonObj.setJob(detailFamilyRelativesArr[4]);
			// workPlace
			familyRelativesPersonObj.setWorkPlace(detailFamilyRelativesArr[5]);
			// person Id
			familyRelativesPersonObj.setPersonId(idNumberStr);
			// create user id
			familyRelativesPersonObj.setCreateUserId(Util.getUserInfo().getID());
			// update user id
			familyRelativesPersonObj.setUpdateUserId(Util.getUserInfo().getID());
			// delete flag
			familyRelativesPersonObj.setDeleteFlag(Constants.DELETE_FLAG_OFF);
			sym0043Dao.getQltnMFamilyRelativesMapper().deleteByPrimaryKey(familyRelativesPersonObj);
			result = sym0043Dao.getQltnMFamilyRelativesMapper().insert(familyRelativesPersonObj);
		}
		return result;
	}

	public String updateNoteReport(String noteReportStr, String personId) {
		String returnValue = "";
		int resultInsertData = 0;
		int result = 0;
		try {
			// transaction starts
			DefaultTransactionDefinition def = new DefaultTransactionDefinition();
			def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
			txManager = (PlatformTransactionManager) appContext.getBean("transactionManager");
			TransactionStatus status = txManager.getTransaction(def);

			String noteReportArr[] = noteReportStr.split(",");
			List<String> noteReportStrArr = Arrays.asList(noteReportArr);
			setCountRelation(0);
			for (int i = 0; i < noteReportStrArr.size(); i++) {
				String item = noteReportStrArr.get(i);
				result = deleteDataNoteReport(item, personId);
				if (result > 0) {
					break;
				}
			}

			if (result > 0) {
				for (int i = 0; i < noteReportStrArr.size(); i++) {
					String item = noteReportStrArr.get(i);
					// call function insertRelativePerson
					try {
							result = insertDataNoteReport(item, personId);
							if (result > 0) { // insert successfully
								resultInsertData = 1;
							} else {
								resultInsertData = 0;
							}
						
					} catch (DuplicateKeyException ex) {
						ex.printStackTrace();
						logger.error("Error message: " + ex.getMessage());
						returnValue = Constants.INSERT_RESULT_DUPLICATED;
						txManager.rollback(status);
					} catch (Exception ex) {
						ex.printStackTrace();
						logger.error("Error message: " + ex.getMessage());
						returnValue = Constants.INSERT_RESULT_FAILED;
						txManager.rollback(status);
					}
				}
			}
			
			// check resultInsertData == 1 ?
			if (resultInsertData == 1) {
				// insert successfully register to DB
				txManager.commit(status);
				returnValue = Constants.INSERT_RESULT_SUCCESSFUL;
			} else {
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

	public int deleteDataNoteReport(String noteReportData, String personId) {
		int result = 0;
		QltnMNoteReportKey noteReportKeyObj = new QltnMNoteReportKey();

		// convert String to String Array
		String detailnoteReportArr[] = noteReportData.split(":");
		// reportId
		noteReportKeyObj.setReportId(detailnoteReportArr[0]);
		// detail Report Id
		noteReportKeyObj.setDetailReportId(detailnoteReportArr[1]);
		// personId
		noteReportKeyObj.setPersonId(personId);
		result = sym0043Dao.getQltnMNoteReportMapper().deleteByPrimaryKey(noteReportKeyObj);
		return result;
	}

	/**
	 * getProcessEdit.
	 * 
	 * get list process person by personId
	 * 
	 * @param personId
	 * @return
	 */
	public ArrayList<QltnMProcessPerson> getProcessEdit(String personId) {
		ArrayList<QltnMProcessPerson> qltnMProcessPersonsList = new ArrayList<QltnMProcessPerson>();
		HashMap<String, Object> params = new HashMap<String, Object>();
		params.put("personId", "'" + personId + "'");
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
		params.put("personId", "'" + personId + "'");
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

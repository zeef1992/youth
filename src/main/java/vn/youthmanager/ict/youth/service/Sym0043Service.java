package vn.youthmanager.ict.youth.service;

import java.util.ArrayList;
import java.util.Arrays;
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

import com.fasterxml.jackson.databind.ObjectMapper;

import vn.youthmanager.ict.common.cnst.Constants;
import vn.youthmanager.ict.common.db.model.QltnMFamilyRelatives;
import vn.youthmanager.ict.common.db.model.QltnMNoteReport;
import vn.youthmanager.ict.common.db.model.QltnMPerson;
import vn.youthmanager.ict.common.db.model.QltnMProcessPerson;
import vn.youthmanager.ict.common.util.Util;
import vn.youthmanager.ict.youth.dao.Sym0043Dao;

@Service
public class Sym0043Service {

	private static Logger logger = Logger.getLogger(Sym0019Service.class);

	ObjectMapper mapper = new ObjectMapper();
	PlatformTransactionManager txManager;

	@Autowired
	private ApplicationContext appContext;

	@Autowired
	private Sym0043Dao sym0043Dao;

	public static void setLogger(Logger logger) {
		Sym0043Service.logger = logger;
	}

	public void setAppContext(ApplicationContext appContext) {
		this.appContext = appContext;
	}

	// count so lan insert relationship của thanh niên
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

	private Boolean checkInputBlankFiled(QltnMPerson personData) {
		// check cateId != -2
		if (personData.getCateId().equalsIgnoreCase(Constants.SEARCH_CONDITION_NO_SELECT)) {
			return false;
		} else if (personData.getStatusId().equalsIgnoreCase(Constants.SEARCH_CONDITION_NO_SELECT)) { // check  statusId  !=  -2
			return false;
		} else if (personData.getPersonName().trim().equalsIgnoreCase("")) { // check  personName !=  ""
			return false;
		} else if (personData.getDateOfBirth().trim().equalsIgnoreCase("")) { // check  DateOfBirth != ""
			return false;
		} else if (personData.getMonthOfBirth().trim().equalsIgnoreCase("")) { // check MonthOfBirth !=  ""
			return false;
		} else if (personData.getYearOfBirth().trim().equalsIgnoreCase("")) { // check YearOfBirth  != ""
			return false;
		} else if (personData.getPhone().trim().equalsIgnoreCase("")) { // check  phone != ""
			return false;
		} else if (personData.getKskquanStt().trim().equalsIgnoreCase("")) { // check  KskquanStt != ""
			return false;
		} else if (personData.getLltnStt().trim().equalsIgnoreCase("")) { // check LltnStt != ""
			return false;
		} else if (personData.getIdentityCard().trim().equalsIgnoreCase("")) { // check identityCard != ""
			return false;
		} else if (personData.getPlaceOfBirth().trim().equalsIgnoreCase("")) { // check PlaceOfBirth  != ""
			return false;
		} else if (personData.getNativeCountry().trim().equalsIgnoreCase("")) { // check nativeCountry !=  ""
			return false;
		} else if (personData.getNation().trim().equalsIgnoreCase("")) { // check nation  != ""
			return false;
		} else if (personData.getReligion().trim().equalsIgnoreCase("")) { // check religion != ""
			return false;
		} else if (personData.getPermanentAddress().trim().equalsIgnoreCase("")) { // check permanentAddress != ""
			return false;
		} else if (personData.getTemporaryResidenceAddress().trim().equalsIgnoreCase("")) { // check temporaryResidenceAddress != ""
			return false;
		} else if (personData.getNational().trim().equalsIgnoreCase("")) { // check national != ""
			return false;
		} else if (personData.getCityId().trim().equalsIgnoreCase("")) { // check cityId !=  ""
			return false;
		} else if (personData.getDistrictId().trim().equalsIgnoreCase("")) { // check districtId  != ""
			return false;
		} else if (personData.getWardsId().trim().equalsIgnoreCase("")) { // check wardsId != ""
			return false;
		} else if (personData.getTownId().trim().equalsIgnoreCase("")) { // check  townId  != ""
			return false;
		} else if (personData.getGroupsId().trim().equalsIgnoreCase("")) { // check  groupsId  !=  ""
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
		} else if (personData.getWorkPlace().trim().equalsIgnoreCase("")) { // check  workPlace !=  ""
			return false;
		} else {
			return true;
		}
	}

	public String insertNoteReport(String noteReportStr, String processYoursellStr, String relationStr) {
		// variable definition
		String returnValue = Constants.INSERT_RESULT_SUCCESSFUL;
		int resultInsertData = 0;
		try {
			// transaction starts
			DefaultTransactionDefinition def = new DefaultTransactionDefinition();
			def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
			txManager = (PlatformTransactionManager) appContext.getBean("transactionManager");
			TransactionStatus status = txManager.getTransaction(def);
			try {
				HashMap<String, Object> params = new HashMap<String, Object>();
				params.put("personIdDefault", Constants.PERSON_DEFAULT_ID);
				// select Max Id in QLTN_M_PERSON
				String idNumberStr = sym0043Dao.getSym0043Mapper().getLastIdPerson(params);
				// convert noteReportStr to String Array
				String noteReportArr[] = noteReportStr.split(",");
				List<String> criteriaList = Arrays.asList(noteReportArr);
				// loop noteReportArr then insert Data into QLTN_NOTE_REPORT
				for (int i = 0; i < criteriaList.size() - 1; i++) {
					String item = criteriaList.get(i);
					int result = 0;
					try {
						if (i == 0) {
							// set về = 0
							setCountNoteReport(0);
							// insert DB first item.
							result = insertDataNoteReport(criteriaList.get(i), idNumberStr);
							if (result > 0) {
								for (int j = i + 1; j <= criteriaList.size() - 1; j++) {
									String nextItem = criteriaList.get(j);
									// if item != nextItem then insert DB nextItem
									if (!item.equalsIgnoreCase(nextItem)) {
										result = insertDataNoteReport(criteriaList.get(j), idNumberStr);
									}
								}
								if (result > 0) { // insert successfully
									resultInsertData = 1;
								} else {
									resultInsertData = 0;
								}
							} else {
								resultInsertData = 0;
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
				}
				// insert data Process Person
				// convert processYoursellStr to String array
				if (resultInsertData > 0) {
					// convert noteReportStr to String Array
					String processYoursellStrArr[] = processYoursellStr.split(",");
					List<String> processYourseltArr = Arrays.asList(processYoursellStrArr);
					setCountProcessPerson(0);
					for (int i = 0; i < processYourseltArr.size(); i++) {
						String item = processYourseltArr.get(i);
						int result = 0;
						// call function insertProcessYourselt
						try {
							result = insertProcessYourselt(item, idNumberStr);
							if (result > 0) { // insert successfully
								resultInsertData = 1;
							} else {
								resultInsertData = 0;
							}
							/*if (result > 0) { // insert successfully
								// register to DB
								txManager.commit(status);
							} else {
								returnValue = Constants.INSERT_RESULT_FAILED;
								txManager.rollback(status);
							}*/
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
				} else {
					returnValue = Constants.INSERT_RESULT_FAILED;
					txManager.rollback(status);
				}
				// insert data in relative person
				if (resultInsertData > 0) {
					// convert noteReportStr to String Array
					String relationStrArr[] = relationStr.split(",");
					List<String> familyRelativesArr = Arrays.asList(relationStrArr);
					setCountRelation(0);
					for (int i = 0; i < familyRelativesArr.size(); i++) {
						String item = familyRelativesArr.get(i);
						int result = 0;
						// call function insertRelativePerson
						try {
							result = insertRelativePerson(item, idNumberStr);
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
				} else {
					returnValue = Constants.INSERT_RESULT_FAILED;
					txManager.rollback(status);
				}
				if (resultInsertData > 0) { // insert successfully
					// register to DB
					txManager.commit(status);
				} else {
					returnValue = Constants.INSERT_RESULT_FAILED;
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
	 * @param noteReportData
	 * @param idNumberStr
	 * @return
	 */
	private int insertDataNoteReport(String noteReportData, String idNumberStr) {
		int result = 0;
		QltnMNoteReport noteReportObj = new QltnMNoteReport();
		// convert String to String Array
		String detailnoteReportArr[] = noteReportData.split(":");
		HashMap<String, Object> params = new HashMap<String, Object>();
		params.put("personId", "'" + idNumberStr + "'" );
		params.put("reportId", "'" + detailnoteReportArr[0] + "'");
		params.put("detailReportId", "'" +  detailnoteReportArr[1] + "'");
		int idNumber = 0;
		if (getCountNoteReport() < 1) {
			idNumber = 0;
		} else {
			idNumber = getCountNoteReport();
		}
		// tang so lan insert note report của thanh niên
		setCountNoteReport(getCountNoteReport() + 1) ;

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
			noteReportObj.setPersonId(idNumberStr);
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
	 * insert Data into table process person
	 * @param processYoursellData
	 * @param idNumberStr
	 * @return
	 */
	public int insertProcessYourselt(String processYoursellData, String idNumberStr) {

		int result = 0;
		QltnMProcessPerson processPersonObj = new QltnMProcessPerson();
		// convert String to String Array
		String detailProcessPersonArr[] = processYoursellData
				.split(":");
		HashMap<String, Object> params = new HashMap<String, Object>();
		params.put("personId", "'" + idNumberStr + "'" );
		int idNumber = 0;
		if (getCountProcessPerson() < 1) {
			idNumber = 0;
		} else {
			idNumber = getCountProcessPerson();
		}
		// tang so lan insert Process của thanh niên
		setCountProcessPerson(getCountProcessPerson() + 1) ;

		if (idNumber <= Constants.PERSON_DEFAULT_ID) {
			idNumber = idNumber + 1;
			String processPersonId = Constants.PROCESS_PERSON_CHARATER + String.format("%03d", idNumber);
			// process Person Id
			processPersonObj.setProcessPersonId(processPersonId);
			// FROM_YEAR
			processPersonObj.setFromYear(detailProcessPersonArr[0]);
			// TO_YEAR
			processPersonObj.setToYear(detailProcessPersonArr[1]);
			// CONTENT
			processPersonObj.setContent(detailProcessPersonArr[2]);
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

	/**
	 * insert Data into table Family Relatives
	 * @param processYoursellData
	 * @param idNumberStr
	 * @return
	 */
	public int insertRelativePerson(String relationStr, String idNumberStr) {
		int result = 0;
		QltnMFamilyRelatives familyRelativesPersonObj = new QltnMFamilyRelatives();
		// convert String to String Array
		String detailFamilyRelativesArr[] = relationStr
				.split(":");
		HashMap<String, Object> params = new HashMap<String, Object>();
		params.put("personId", "'" + idNumberStr + "'" );
		// select max id in QLTN_M_NOTE_REPORT
		int idNumber = 0;
		if (getCountRelation() < 1) {
			idNumber = 0;
		} else {
			idNumber = getCountRelation();
		}
		// tang so lan insert relationship của thanh niên
		setCountRelation(getCountRelation() + 1) ;
		if (idNumber <= Constants.PERSON_DEFAULT_ID) {
			idNumber = idNumber + 1;
			String familyPersonId = Constants.FAMILY_RELATION_PERSON_CHARATER + String.format("%03d", idNumber);
			// family Person Id
			familyRelativesPersonObj.setFamilyPersonId(familyPersonId);
			// relation
			familyRelativesPersonObj.setRelation(detailFamilyRelativesArr[0]);
			// status
			familyRelativesPersonObj.setStatus(detailFamilyRelativesArr[1]);
			// birthDay
			familyRelativesPersonObj.setBirthDay(detailFamilyRelativesArr[2]);
			// job
			familyRelativesPersonObj.setJob(detailFamilyRelativesArr[3]);
			// workPlace
			familyRelativesPersonObj.setWorkPlace(detailFamilyRelativesArr[4]);
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

	/**
	 * getProcessEdit.
	 * 
	 * get list process person by personId
	 * @param personId
	 * @return
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

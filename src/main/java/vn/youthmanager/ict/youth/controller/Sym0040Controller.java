package vn.youthmanager.ict.youth.controller;

import java.io.IOException;
import java.util.List;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import vn.youthmanager.ict.common.db.model.QltnMCity;
import vn.youthmanager.ict.common.db.model.QltnMDistrict;
import vn.youthmanager.ict.common.db.model.QltnMFamilyRelatives;
import vn.youthmanager.ict.common.db.model.QltnMGroups;
import vn.youthmanager.ict.common.db.model.QltnMPerson;
import vn.youthmanager.ict.common.db.model.QltnMProcessPerson;
import vn.youthmanager.ict.common.db.model.QltnMSpecialized;
import vn.youthmanager.ict.common.db.model.QltnMTown;
import vn.youthmanager.ict.common.db.model.QltnMUniversity;
import vn.youthmanager.ict.common.db.model.QltnMWards;
import vn.youthmanager.ict.youth.db.model.Sym0040Contions;
import vn.youthmanager.ict.youth.db.model.Sym0041Result;
import vn.youthmanager.ict.youth.service.Sym0040Service;
import vn.youthmanager.ict.youth.service.Sym0041Service;
import vn.youthmanager.ict.youth.service.Sym0043Service;

@Controller
@RequestMapping(value = "/0040")
public class Sym0040Controller {

	@Autowired
	private Sym0041Service sym0041Service;
	
	@Autowired
	private Sym0040Service sym0040Service;

	@Autowired
	private Sym0043Service sym0043Service;
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String topGet(Locale locale, Model model) {
		sym0040Service.initData(model);
		return "youth/0040";
	}

	@RequestMapping(value = "/", method = RequestMethod.POST)
	public String topPost(Locale locale, Model model) {
		sym0040Service.initData(model);
		return "youth/0040";
	}
	/**
	 * Get data for City combobox by Country id
	 * 
	 * @param country : data received from client
	 * @return City data
	 */
	@RequestMapping(value = "/getCityDataByCountryId", method = RequestMethod.POST)
	public @ResponseBody List<QltnMCity> getCityDataByCountryId(@RequestParam(value = "countryId") String countryId) {
		return sym0040Service.getCityNameByCountryId(countryId);
	}

	/**
	 * Get data for District combobox by Country id and cityId
	 * 
	 * @param countryId : data received from client
	 * @param cityId : data received from client
	 * @return District data
	 */
	@RequestMapping(value = "/getDistrictDataByCityId", method = RequestMethod.POST)
	public @ResponseBody List<QltnMDistrict> getDistrictDataByCityId(@RequestParam(value = "countryId") String countryId,
			@RequestParam(value = "cityId") String cityId) {
		return sym0040Service.getDistrictNameByCityId(countryId, cityId);
	}

	/**
	 * Get data for Wards combobox by Country id and cityId and DistrictId
	 * 
	 * @param countryId : data received from client
	 * @param cityId : data received from client
	 * @param districtId : data received from client
	 * @return Wards data
	 */
	@RequestMapping(value = "/getWardsDataByDistrictId", method = RequestMethod.POST)
	public @ResponseBody List<QltnMWards> getWardsDataByDistrictId(@RequestParam(value = "countryId") String countryId,
			@RequestParam(value = "cityId") String cityId,@RequestParam(value = "districtId") String districtId) {
		return sym0040Service.getWardsNameByDistrictId(countryId, cityId, districtId);
	}

	/**
	 * Get data for Town combobox by Country id and cityId and DistrictId and wadrsId
	 * 
	 * @param countryId : data received from client
	 * @param cityId : data received from client
	 * @param districtId : data received from client
	 * @param wadrsId : data received from client
	 * @return Town data
	 */
	@RequestMapping(value = "/getTownDataByWardsId", method = RequestMethod.POST)
	public @ResponseBody List<QltnMTown> getTownDataByWardsId(@RequestParam(value = "countryId") String countryId,
			@RequestParam(value = "cityId") String cityId, @RequestParam(value = "districtId") String districtId,
			@RequestParam(value = "wardsId") String wardsId) {
		return sym0040Service.getTownNameByWardsId(countryId, cityId, districtId, wardsId);
	}

	/**
	 * Get data for Town combobox by Country id and cityId and DistrictId and wadrsId
	 * 
	 * @param countryId : data received from client
	 * @param cityId : data received from client
	 * @param districtId : data received from client
	 * @param wadrsId : data received from client
	 * @param townId : data received from client
	 * @return Town data
	 */
	@RequestMapping(value = "/getGroupsDataByTownId", method = RequestMethod.POST)
	public @ResponseBody List<QltnMGroups> getGroupsDataByTownId(@RequestParam(value = "countryId") String countryId,
			@RequestParam(value = "cityId") String cityId, @RequestParam(value = "districtId") String districtId,
			@RequestParam(value = "wardsId") String wardsId, @RequestParam(value = "townId") String townId) {
		return sym0040Service.getGroupsDataByTownId(countryId, cityId, districtId, wardsId, townId);
	}

	/**
	 * Get data for Specialized combobox by University id
	 * 
	 * @param countryId : data received from client
	 * @return Town data 
	 */
	@RequestMapping(value = "/getSpecializedDataByUniversityId", method = RequestMethod.POST)
	public @ResponseBody List<QltnMSpecialized> getSpecializedDataByUniversityId(@RequestParam(value = "universityId") String universityId) {
		return sym0040Service.getSpecializedDataByUniversityId(universityId);
	}

	/**
	 * getUniversityDataByEducationId.
	 * 
	 * @param educationId
	 * @return List<QltnMUniversity>
	 */
	@RequestMapping(value = "/getUniversityDataByEducationId", method = RequestMethod.POST)
	public @ResponseBody List<QltnMUniversity> getUniversityDataByEducationId(@RequestParam(value = "educationId") String educationId) {
		return sym0040Service.getUniversityDataByEducationId(educationId);
	}

	/**
	 * searchData.
	 * 
	 * @param searchConditions
	 * @return List<Sym0041Result>
	 */
	@RequestMapping(value = "/searchData", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody List<Sym0041Result> searchData(@RequestBody Sym0040Contions searchConditions) {
        return sym0041Service.searchData(searchConditions);
    }

	/**
	 * exportData.
	 * 
	 * @param searchConditions
	 * @throws IOException
	 */
	@RequestMapping(value = "/exportData", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody String exportData(@RequestBody Sym0040Contions searchConditions) throws IOException {
        return sym0041Service.exportData(searchConditions);
    }

	/**
	 * 
	 * @param PersonId
	 * @return status when created file doc
	 */
	@RequestMapping(value = "/downloadDocxFile", method = RequestMethod.POST)
	public @ResponseBody String downloadDocxFile(@RequestParam (value = "PersonId") String PersonId) {
		return sym0041Service.downloadDocxFile(PersonId);
	}
	/**
	 * getSingleData.
	 * 
	 * @param PersonId
	 * @return List<Sym0041Result>
	 */
	@RequestMapping(value = "/getSingleData", method = RequestMethod.POST)
    public @ResponseBody List<Sym0041Result> searchData(@RequestParam (value = "PersonId") String PersonId) {
        return sym0040Service.getPersonDetail(PersonId);
    }

	/**
	 * insertData.
	 * 
	 * @param personData
	 * @return String value
	 */
	@RequestMapping(value = "/insertData", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody String insertData(@RequestBody QltnMPerson personData) {
		return sym0040Service.insertData(personData);
	}

	/**
	 * insertProcessPerson.
	 * 
	 * @param processYoursellStr
	 * @param personId
	 * @return Status when insert data
	 */
	@RequestMapping(value = "/insertProcessPerson", method = RequestMethod.POST)
	public @ResponseBody String insertProcessPerson(@RequestParam(value = "processYoursellStr") String processYoursellStr,
			@RequestParam(value = "personId") String personId) {
		return sym0040Service.insertProcessPerson(processYoursellStr, personId);
	}

	/**
	 * insertRelation
	 * @param relationStr
	 * @param personId
	 * @return Status when insert data
	 */
	@RequestMapping(value = "/insertRelation", method = RequestMethod.POST)
	public @ResponseBody String insertRelation(@RequestParam(value = "relationStr") String relationStr,
			@RequestParam(value = "personId") String personId) {
		return sym0040Service.insertRelation(relationStr, personId);
	}

	/**
	 * insertNoteReport.
	 * 
	 * @param noteReportStr
	 * @param personId
	 * @return Status when insert data
	 */
	@RequestMapping(value = "/insertNoteReport", method = RequestMethod.POST)
	public @ResponseBody String insertNoteReport(@RequestParam(value = "noteReportStr") String noteReportStr,
			@RequestParam(value = "personId") String personId) {
		return sym0040Service.insertNoteReport(noteReportStr, personId);
	}
	/**
	 * updateData Person
	 * @param personData
	 * @return Status when update data
	 */
	@RequestMapping(value = "/updateData", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody String updateData(@RequestBody QltnMPerson personData) {
		return sym0040Service.updateData(personData);
	}

	/**
	 * updateProcessPerson.
	 * 
	 * @param processYoursellStr
	 * @param personId
	 * @return Status when update data
	 */
	@RequestMapping(value = "/updateProcessPerson", method = RequestMethod.POST)
	public @ResponseBody String updateProcessPerson(@RequestParam(value = "processYoursellStr") String processYoursellStr,
													@RequestParam(value = "personId") String personId) {
		return sym0040Service.updateProcessPerson(processYoursellStr, personId);
	}

	/**
	 * updateRelation.
	 * 
	 * @param relationStr
	 * @param personId
	 * @return Status when update data
	 */
	@RequestMapping(value = "/updateRelation", method = RequestMethod.POST)
	public @ResponseBody String updateRelation(@RequestParam(value = "relationStr") String relationStr,
													@RequestParam(value = "personId") String personId) {
		return sym0040Service.updateRelation(relationStr, personId);
	}

	/**
	 * updateNoteReport.
	 * 
	 * @param noteReportStr
	 * @param personId
	 * @return Status when update data
	 */
	@RequestMapping(value = "/updateNoteReport", method = RequestMethod.POST)
	public @ResponseBody String updateNoteReport(@RequestParam(value = "noteReportStr") String noteReportStr,
													@RequestParam(value = "personId") String personId) {
		return sym0040Service.updateNoteReport(noteReportStr, personId);
	}

	/**
	 * deleteData.
	 * 
	 * @param personId
	 * @return Status when delete data
	 */
	@RequestMapping(value = "/deleteData", method = RequestMethod.POST)
    public @ResponseBody String deleteData(@RequestParam(value = "personId") String personId) {
        return sym0041Service.deleteData(personId);
    }

	/**
	 * getLastSTTPerson.
	 * 
	 * @return Last STT of Person
	 */
	@RequestMapping(value = "/getLastSTTPerson", method = RequestMethod.POST)
	public @ResponseBody String getLastSTTPerson() {
		return sym0040Service.getLastSTTPerson();
	}

	/**
	 * getProcessEdit.
	 * 
	 * @param PersonId
	 * @return List<QltnMProcessPerson>
	 */
	@RequestMapping(value = "/getProcessEdit", method = RequestMethod.POST)
	public @ResponseBody List<QltnMProcessPerson> getProcessEdit(@RequestParam(value = "PersonId") String PersonId) {
		return sym0043Service.getProcessEdit(PersonId);
	}

	/**
	 * getRelationShipOfPersonEdit.
	 * 
	 * @param PersonId
	 * @return List<QltnMFamilyRelatives>
	 */
	@RequestMapping(value = "/getRelationShipOfPersonEdit", method = RequestMethod.POST)
	public @ResponseBody List<QltnMFamilyRelatives> getRelationShipOfPersonEdit(@RequestParam(value = "PersonId") String PersonId) {
		return sym0043Service.getRelationShipOfPersonEdit(PersonId);
	}

	
}

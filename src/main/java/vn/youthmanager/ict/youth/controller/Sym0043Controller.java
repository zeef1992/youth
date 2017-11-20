package vn.youthmanager.ict.youth.controller;

import java.util.List;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
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
import vn.youthmanager.ict.common.db.model.QltnMWards;
import vn.youthmanager.ict.youth.db.model.Sym0040Contions;
import vn.youthmanager.ict.youth.db.model.Sym0041Result;
import vn.youthmanager.ict.youth.service.Sym0040Service;
import vn.youthmanager.ict.youth.service.Sym0043Service;

@Controller
@RequestMapping(value= "/0043")
public class Sym0043Controller {

	@Autowired
	private Sym0040Service sym0040Service;

	@Autowired
	private Sym0043Service sym0043Service;
	
	@RequestMapping(value= "/", method = RequestMethod.POST)
	public String topPost (Locale locale, Model model, @ModelAttribute("sym0041Data") Sym0040Contions sym0040Contions) {
		model.addAttribute("modeScreen", "modeNew");
		model.addAttribute("personId", "");
		sym0040Service.initData(model);
		return "youth/0043";
	}

	@RequestMapping(value= "/", method = RequestMethod.GET)
	public String topGet (Locale locale, Model model, @ModelAttribute("Sym041PersonData") String personId) {
		model.addAttribute("modeScreen", "modeEdit");
		model.addAttribute("personId", personId);
		sym0040Service.initData(model);
		return "youth/0043";
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
	 * insertData.
	 * 
	 * @param personData
	 * @return String value
	 */
	@RequestMapping(value = "/insertData", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody String insertData(@RequestBody QltnMPerson personData) {
		return sym0043Service.insertData(personData);
	}

	@RequestMapping(value = "/insertNoteReport", method = RequestMethod.POST)
	public @ResponseBody String insertNoteReport(@RequestParam(value = "noteReportStr") String noteReportStr,
												 @RequestParam(value = "processYoursellStr") String processYoursellStr,
												 @RequestParam(value = "relationStr") String relationStr) {
		return sym0043Service.insertNoteReport(noteReportStr, processYoursellStr, relationStr);
	}

	@RequestMapping(value = "/searchData", method = RequestMethod.POST)
    public @ResponseBody List<Sym0041Result> searchData(@RequestParam (value = "PersonId") String PersonId) {
        return sym0040Service.getPersonDetail(PersonId);
    }

	@RequestMapping(value = "/getProcessEdit", method = RequestMethod.POST)
	public @ResponseBody List<QltnMProcessPerson> getProcessEdit(@RequestParam(value = "PersonId") String PersonId) {
		return sym0043Service.getProcessEdit(PersonId);
	}

	@RequestMapping(value = "/getRelationShipOfPersonEdit", method = RequestMethod.POST)
	public @ResponseBody List<QltnMFamilyRelatives> getRelationShipOfPersonEdit(@RequestParam(value = "PersonId") String PersonId) {
		return sym0043Service.getRelationShipOfPersonEdit(PersonId);
	}
}

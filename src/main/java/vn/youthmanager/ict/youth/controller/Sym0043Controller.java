package vn.youthmanager.ict.youth.controller;

import java.util.List;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import vn.youthmanager.ict.common.db.model.QltnMCity;
import vn.youthmanager.ict.common.db.model.QltnMDetailReport;
import vn.youthmanager.ict.common.db.model.QltnMDistrict;
import vn.youthmanager.ict.common.db.model.QltnMGroups;
import vn.youthmanager.ict.common.db.model.QltnMSpecialized;
import vn.youthmanager.ict.common.db.model.QltnMTown;
import vn.youthmanager.ict.common.db.model.QltnMUniversity;
import vn.youthmanager.ict.common.db.model.QltnMWards;
import vn.youthmanager.ict.youth.service.Sym0040Service;
import vn.youthmanager.ict.youth.service.Sym0043Service;

@Controller
@RequestMapping(value= "/0043")
public class Sym0043Controller {

	@Autowired
	private Sym0043Service sym0043Service;

	@Autowired
	private Sym0040Service sym0040Service;

	@RequestMapping(value= "/", method = RequestMethod.GET)
	public String topGet (Locale locale, Model model) {
		sym0043Service.initData(model);
		return "youth/0043";
	}

	@RequestMapping(value= "/getDetailReport", method = RequestMethod.POST)
	public @ResponseBody List<QltnMDetailReport> getDetailReport(@RequestParam(value = "reportId") String reportId) {
		return sym0043Service.getDetailReport(reportId);
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
		return sym0043Service.getGroupsDataByTownId(countryId, cityId, districtId, wardsId, townId);
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
	@RequestMapping(value = "/getUniversityDataByEducationId", method = RequestMethod.POST)
	public @ResponseBody List<QltnMUniversity> getUniversityDataByEducationId(@RequestParam(value = "educationId") String educationId) {
		return sym0040Service.getUniversityDataByEducationId(educationId);
	}
}

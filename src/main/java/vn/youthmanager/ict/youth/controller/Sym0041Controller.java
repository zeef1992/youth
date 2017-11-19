package vn.youthmanager.ict.youth.controller;

import java.util.List;

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
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import vn.youthmanager.ict.common.db.model.QltnMCity;
import vn.youthmanager.ict.common.db.model.QltnMDistrict;
import vn.youthmanager.ict.common.db.model.QltnMGroups;
import vn.youthmanager.ict.common.db.model.QltnMSpecialized;
import vn.youthmanager.ict.common.db.model.QltnMTown;
import vn.youthmanager.ict.common.db.model.QltnMWards;
import vn.youthmanager.ict.youth.db.model.Sym0040Contions;
import vn.youthmanager.ict.youth.db.model.Sym0041Result;
import vn.youthmanager.ict.youth.service.Sym0041Service;

@Controller
@RequestMapping(value = "/0041")
public class Sym0041Controller {

	@Autowired
	private Sym0041Service sym0041Service;

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String top(Model model, @ModelAttribute("Sym040PersonData") Sym0040Contions sym0040Contions) {
		sym0041Service.initData(sym0040Contions, model);
		return "youth/0041";
	}

	@RequestMapping(value = "/searchData", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody List<Sym0041Result> searchData(@RequestBody Sym0040Contions searchConditions) {
        return sym0041Service.searchData(searchConditions);
    }

	/**
	 * Get data for City combobox by Country id
	 * 
	 * @param country : data received from client
	 * @return City data
	 */
	@RequestMapping(value = "/getCityDataByCountryId", method = RequestMethod.POST)
	public @ResponseBody List<QltnMCity> getCityDataByCountryId(@RequestParam(value = "countryId") String countryId) {
		return sym0041Service.getCityNameByCountryId(countryId);
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
		return sym0041Service.getDistrictNameByCityId(countryId, cityId);
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
		return sym0041Service.getWardsNameByDistrictId(countryId, cityId, districtId);
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
		return sym0041Service.getTownNameByWardsId(countryId, cityId, districtId, wardsId);
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
		return sym0041Service.getGroupsDataByTownId(countryId, cityId, districtId, wardsId, townId);
	}

	/**
	 * Get data for Specialized combobox by University id
	 * 
	 * @param countryId : data received from client
	 * @return Town data
	 */
	@RequestMapping(value = "/getSpecializedDataByUniversityId", method = RequestMethod.POST)
	public @ResponseBody List<QltnMSpecialized> getSpecializedDataByUniversityId(@RequestParam(value = "universityId") String universityId) {
		return sym0041Service.getSpecializedDataByUniversityId(universityId);
	}

	@RequestMapping(value = "/deleteData", method = RequestMethod.POST)
    public @ResponseBody String deleteData(@RequestParam(value = "personId") String personId) {
        return sym0041Service.deleteData(personId);
    }
	
	@RequestMapping(value = "/changePage", method = RequestMethod.POST)
	public String changePage(RedirectAttributes rattrs, @RequestParam(value = "personId") String personId) {
		rattrs.addFlashAttribute("Sym041PersonData", personId);
		return "redirect:../0043/";
	}
}

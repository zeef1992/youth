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
import vn.youthmanager.ict.common.db.model.QltnMGroups;
import vn.youthmanager.ict.common.db.model.QltnMTown;
import vn.youthmanager.ict.common.db.model.QltnMWards;
import vn.youthmanager.ict.youth.db.model.Sym0015Result;
import vn.youthmanager.ict.youth.db.model.Sym0016Conditions;
import vn.youthmanager.ict.youth.db.model.Sym0016Result;
import vn.youthmanager.ict.youth.service.Sym0016Service;

@Controller
@RequestMapping(value = "/0016")
public class Sym0016Controller {

	@Autowired
	private Sym0016Service Sym0016Service;

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String top(Locale locale, Model model, @ModelAttribute("Sym015TownData") Sym0015Result Sym0015Result) {
		Sym0016Service.initData(model, Sym0015Result.getCountryId(), Sym0015Result.getCityId(),
				Sym0015Result.getDistrictId(), Sym0015Result.getWardsId(), Sym0015Result.getTownId());
		return "youth/0016";
	}

	@RequestMapping(value = "/searchData", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody List<Sym0016Result> searchData(@RequestBody Sym0016Conditions searchConditions) {
		return Sym0016Service.searchData(searchConditions);
	}

	@RequestMapping(value = "/updateData", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody String updateData(@RequestBody QltnMGroups townData) {
		return Sym0016Service.updateData(townData);
	}

	@RequestMapping(value = "/insertData", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody String insertData(@RequestBody QltnMGroups townData) {
		return Sym0016Service.insertData(townData);
	}

	@RequestMapping(value = "/deleteData", method = RequestMethod.POST)
	public @ResponseBody String deleteData(@RequestParam(value = "groupsId") String groupsId) {
		return Sym0016Service.deleteData(groupsId);
	}

	/**
	 * Get Data In Table QLTN_M_TOWN by town Id.
	 * 
	 * @param groupsId
	 *            : data from client.
	 * @return List QltnMGroups.
	 */
	@RequestMapping(value = "/getSingleData", method = RequestMethod.POST)
	public @ResponseBody QltnMGroups getSingleData(@RequestParam(value = "groupsId") String groupsId) {
		return Sym0016Service.getSingleData(groupsId);
	}

	/**
	 * Get data for City combobox by Country id
	 * 
	 * @param country : data received from client
	 * @return City data
	 */
	@RequestMapping(value = "/getCityDataByCountryId", method = RequestMethod.POST)
	public @ResponseBody List<QltnMCity> getCityDataByCountryId(@RequestParam(value = "countryId") String countryId) {
		return Sym0016Service.getCityNameByCountryId(countryId);
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
		return Sym0016Service.getDistrictNameByCityId(countryId, cityId);
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
		return Sym0016Service.getWardsNameByDistrictId(countryId, cityId, districtId);
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
		return Sym0016Service.getTownNameByWardsId(countryId, cityId, districtId, wardsId);
	}
}

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
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import vn.youthmanager.ict.common.db.model.QltnMCity;
import vn.youthmanager.ict.common.db.model.QltnMDistrict;
import vn.youthmanager.ict.common.db.model.QltnMTown;
import vn.youthmanager.ict.common.db.model.QltnMWards;
import vn.youthmanager.ict.youth.db.model.Sym0014Result;
import vn.youthmanager.ict.youth.db.model.Sym0015Conditions;
import vn.youthmanager.ict.youth.db.model.Sym0015Result;
import vn.youthmanager.ict.youth.service.Sym0015Service;

@Controller
@RequestMapping(value = "/0015")
public class Sym0015Controller {

	@Autowired
	private Sym0015Service Sym0015Service;
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String top(Locale locale, Model model, @ModelAttribute("Sym014WardsData") Sym0014Result  Sym0014Result) {
		Sym0015Service.initData(model, Sym0014Result.getCountryId(), Sym0014Result.getCityId(), Sym0014Result.getDistrictId(), Sym0014Result.getWardsId());
		return "youth/0015";
	}

	@RequestMapping(value = "/searchData", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody List<Sym0015Result> searchData(@RequestBody Sym0015Conditions searchConditions) {
        return Sym0015Service.searchData(searchConditions);
    }

	@RequestMapping(value = "/updateData", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody String updateData(@RequestBody QltnMTown townData) {
        return Sym0015Service.updateData(townData);
    }

	@RequestMapping(value = "/insertData", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody String insertData(@RequestBody QltnMTown townData) {
        return Sym0015Service.insertData(townData);
    }

	@RequestMapping(value = "/deleteData", method = RequestMethod.POST)
    public @ResponseBody String deleteData(@RequestParam(value = "townId") String townId) {
        return Sym0015Service.deleteData(townId);
    }

	/**
	 * Get Data In Table QLTN_M_TOWN by town Id.
	 * 
	 * @param townId : data from client.
	 * @return List QltnMTown.
	 */
	@RequestMapping(value = "/getSingleData", method = RequestMethod.POST)
    public @ResponseBody QltnMTown getSingleData(@RequestParam(value = "townId") String townId) {
        return Sym0015Service.getSingleData(townId);
    }

	/**
	 * Change page to 0015 and transfer data
	 * @param countryId : countryId received from client
	 * @param cityId : city's id received from client
	 * @param districtId : districtId id received from client
	 * @param townId : townId id received from client
	 * @return redirect to 0013 and data get from client
	 */
	@RequestMapping(value = "/changePage", method = RequestMethod.POST)
	public String changePage(RedirectAttributes rattrs, @RequestParam(value = "cityId") String cityId,
			@RequestParam(value = "countryId") String countryId, 
			@RequestParam(value = "districtId") String districtId,
			@RequestParam(value = "wardsId") String wardsId,
			@RequestParam(value = "townId") String townId) {
		Sym0015Result Sym0015Result = new Sym0015Result();
		Sym0015Result.setCityId(cityId);
		Sym0015Result.setCountryId(countryId);
		Sym0015Result.setDistrictId(districtId);
		Sym0015Result.setWardsId(wardsId);
		Sym0015Result.setTownId(townId);
		rattrs.addFlashAttribute("Sym015TownData", Sym0015Result);
		return "redirect:../0016/";
	}

	/**
	 * Get data for City combobox by Country id
	 * 
	 * @param country : data received from client
	 * @return City data
	 */
	@RequestMapping(value = "/getCityDataByCountryId", method = RequestMethod.POST)
	public @ResponseBody List<QltnMCity> getCityDataByCountryId(@RequestParam(value = "countryId") String countryId) {
		return Sym0015Service.getCityNameByCountryId(countryId);
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
		return Sym0015Service.getDistrictNameByCityId(countryId, cityId);
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
		return Sym0015Service.getWardsNameByDistrictId(countryId, cityId, districtId);
	}
}

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
import vn.youthmanager.ict.common.db.model.QltnMWards;
import vn.youthmanager.ict.youth.db.model.Sym0013Result;
import vn.youthmanager.ict.youth.db.model.Sym0014Conditions;
import vn.youthmanager.ict.youth.db.model.Sym0014Result;
import vn.youthmanager.ict.youth.service.Sym0014Service;

@Controller
@RequestMapping(value = "/0014")
public class Sym0014Controller {

	@Autowired
	private Sym0014Service Sym0014Service;
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String top(Locale locale, Model model, @ModelAttribute("Sym013DistrictData") Sym0013Result  sym0013Result) {
		Sym0014Service.initData(model, sym0013Result.getCountryId(), sym0013Result.getCityId(), sym0013Result.getDistrictId());
		return "youth/0014";
	}

	@RequestMapping(value = "/searchData", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody List<Sym0014Result> searchData(@RequestBody Sym0014Conditions searchConditions) {
        return Sym0014Service.searchData(searchConditions);
    }

	@RequestMapping(value = "/updateData", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody String updateData(@RequestBody QltnMWards cateData) {
        return Sym0014Service.updateData(cateData);
    }

	@RequestMapping(value = "/insertData", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody String insertData(@RequestBody QltnMWards cateData) {
        return Sym0014Service.insertData(cateData);
    }

	@RequestMapping(value = "/deleteData", method = RequestMethod.POST)
    public @ResponseBody String deleteData(@RequestParam(value = "wardsId") String wardsId) {
        return Sym0014Service.deleteData(wardsId);
    }

	/**
	 * Get Data In Table QLTN_M_WARDS by wards Id.
	 * 
	 * @param wardsId : data from client.
	 * @return List QltnMWards.
	 */
	@RequestMapping(value = "/getSingleData", method = RequestMethod.POST)
    public @ResponseBody QltnMWards getSingleData(@RequestParam(value = "wardsId") String wardsId) {
        return Sym0014Service.getSingleData(wardsId);
    }

	/**
	 * Change page to 0015 and transfer data
	 * @param countryId : countryId received from client
	 * @param cityId : city's id received from client
	 * @param districtId : districtId id received from client
	 * @param wardsId : wardsId id received from client
	 * @return redirect to 0013 and data get from client
	 */
	@RequestMapping(value = "/changePage", method = RequestMethod.POST)
	public String changePage(RedirectAttributes rattrs, @RequestParam(value = "cityId") String cityId,
			@RequestParam(value = "countryId") String countryId, 
			@RequestParam(value = "districtId") String districtId,
			@RequestParam(value = "wardsId") String wardsId) {
		Sym0014Result Sym0014Result = new Sym0014Result();
		Sym0014Result.setCityId(cityId);
		Sym0014Result.setCountryId(countryId);
		Sym0014Result.setDistrictId(districtId);
		Sym0014Result.setWardsId(wardsId);
		rattrs.addFlashAttribute("Sym014WardsData", Sym0014Result);
		return "redirect:../0015/";
	}

	/**
	 * Get data for City combobox by Country id
	 * 
	 * @param country : data received from client
	 * @return City data
	 */
	@RequestMapping(value = "/getCityDataByCountryId", method = RequestMethod.POST)
	public @ResponseBody List<QltnMCity> getCityDataByCountryId(@RequestParam(value = "countryId") String countryId) {
		return Sym0014Service.getCityNameByCountryId(countryId);
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
		return Sym0014Service.getDistrictNameByCityId(countryId, cityId);
	}

}

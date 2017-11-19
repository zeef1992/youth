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
import vn.youthmanager.ict.youth.db.model.Sym0012Result;
import vn.youthmanager.ict.youth.db.model.Sym0013Conditions;
import vn.youthmanager.ict.youth.db.model.Sym0013Result;
import vn.youthmanager.ict.youth.service.Sym0013Service;

@Controller
@RequestMapping(value = "/0013")
public class Sym0013Controller {

	@Autowired
	private Sym0013Service Sym0013Service;
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String top(Locale locale, Model model, @ModelAttribute("Sym013CityData") Sym0012Result  sym0012Result) {
		Sym0013Service.initData(model, sym0012Result.getCountryId(), sym0012Result.getCityId());
		return "youth/0013";
	}

	@RequestMapping(value = "/searchData", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody List<Sym0013Result> searchData(@RequestBody Sym0013Conditions searchConditions) {
        return Sym0013Service.searchData(searchConditions);
    }

	@RequestMapping(value = "/updateData", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody String updateData(@RequestBody QltnMDistrict cateData) {
        return Sym0013Service.updateData(cateData);
    }

	@RequestMapping(value = "/insertData", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody String insertData(@RequestBody QltnMDistrict cateData) {
        return Sym0013Service.insertData(cateData);
    }

	@RequestMapping(value = "/deleteData", method = RequestMethod.POST)
    public @ResponseBody String deleteData(@RequestParam(value = "districtId") String districtId) {
        return Sym0013Service.deleteData(districtId);
    }

	/**
	 * Get Data In Table QLTN_M_DISTRICT by district Id.
	 * 
	 * @param districtId : data from client.
	 * @return List QltnMDistrict.
	 */
	@RequestMapping(value = "/getSingleData", method = RequestMethod.POST)
    public @ResponseBody QltnMDistrict getSingleData(@RequestParam(value = "districtId") String districtId) {
        return Sym0013Service.getSingleData(districtId);
    }

	/**
	 * Change page to 0013 and transfer data
	 * @param countryId : countryId received from client
	 * @param cityId : city's id received from client
	 * @param districtId : districtId id received from client
	 * @return redirect to 0013 and data get from client
	 */
	@RequestMapping(value = "/changePage", method = RequestMethod.POST)
	public String changePage(RedirectAttributes rattrs, @RequestParam(value = "cityId") String cityId,
			@RequestParam(value = "countryId") String countryId,@RequestParam(value = "districtId") String districtId) {
		Sym0013Result Sym0013Result = new Sym0013Result();
		Sym0013Result.setCityId(cityId);
		Sym0013Result.setCountryId(countryId);
		Sym0013Result.setDistrictId(districtId);
		rattrs.addFlashAttribute("Sym013DistrictData", Sym0013Result);
		return "redirect:../0014/";
	}

	/**
	 * Get data for City combobox by Country id
	 * 
	 * @param country : data received from client
	 * @return City data
	 */
	@RequestMapping(value = "/getCityDataByCountryId", method = RequestMethod.POST)
	public @ResponseBody List<QltnMCity> getCityDataByCountryId(@RequestParam(value = "countryId") String countryId) {
		return Sym0013Service.getCityNameByCountryId(countryId);
	}

}

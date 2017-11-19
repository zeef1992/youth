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
import vn.youthmanager.ict.youth.db.model.Sym0012Conditions;
import vn.youthmanager.ict.youth.db.model.Sym0012Result;
import vn.youthmanager.ict.youth.service.Sym0012Service;

@Controller
@RequestMapping(value = "/0012")
public class Sym0012Controller {

	@Autowired
	private Sym0012Service sym0012Service;
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String top(Locale locale, Model model, @ModelAttribute("Sym012CountryData") String  countryId) {
		sym0012Service.initData(model, countryId);
		return "youth/0012";
	}

	@RequestMapping(value = "/searchData", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody List<Sym0012Result> searchData(@RequestBody Sym0012Conditions searchConditions) {
        return sym0012Service.searchData(searchConditions);
    }

	@RequestMapping(value = "/updateData", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody String updateData(@RequestBody QltnMCity cateData) {
        return sym0012Service.updateData(cateData);
    }

	@RequestMapping(value = "/insertData", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody String insertData(@RequestBody QltnMCity cateData) {
        return sym0012Service.insertData(cateData);
    }

	@RequestMapping(value = "/deleteData", method = RequestMethod.POST)
    public @ResponseBody String deleteData(@RequestParam(value = "cityId") String cityId) {
        return sym0012Service.deleteData(cityId);
    }

	/**
	 * Get Data In Table QLTN_M_COUNTRY by University Id.
	 * 
	 * @param countryId : data from client.
	 * @return List QltnMCity.
	 */
	@RequestMapping(value = "/getSingleData", method = RequestMethod.POST)
    public @ResponseBody QltnMCity getSingleData(@RequestParam(value = "cityId") String cityId) {
        return sym0012Service.getSingleData(cityId);
    }

	/**
	 * Change page to 0012 and transfer data
	 * @param farmId : city's id received from client
	 * @return redirect to 0013 and data get from client
	 */
	@RequestMapping(value = "/changePage", method = RequestMethod.POST)
	public String changePage(RedirectAttributes rattrs, @RequestParam(value = "cityId") String cityId,
			@RequestParam(value = "countryId") String countryId) {
		Sym0012Result sym0012Result = new Sym0012Result();
		sym0012Result.setCityId(cityId);
		sym0012Result.setCountryId(countryId);
		rattrs.addFlashAttribute("Sym013CityData", sym0012Result);
		return "redirect:../0013/";
	}
}

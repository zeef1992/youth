package vn.youthmanager.ict.youth.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import vn.youthmanager.ict.common.db.model.QltnMCountry;
import vn.youthmanager.ict.youth.db.model.Sym0011Conditions;
import vn.youthmanager.ict.youth.db.model.Sym0011Result;
import vn.youthmanager.ict.youth.service.Sym0011Service;

@Controller
@RequestMapping(value = "/0011")
public class Sym0011Controller {

	@Autowired
	private Sym0011Service sym0011Service;
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String top(Model model) {
		return "youth/0011";
	}

	@RequestMapping(value = "/searchData", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody List<Sym0011Result> searchData(@RequestBody Sym0011Conditions searchConditions) {
        return sym0011Service.searchData(searchConditions);
    }

	@RequestMapping(value = "/updateData", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody String updateData(@RequestBody QltnMCountry cateData) {
        return sym0011Service.updateData(cateData);
    }

	@RequestMapping(value = "/insertData", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody String insertData(@RequestBody QltnMCountry cateData) {
        return sym0011Service.insertData(cateData);
    }

	@RequestMapping(value = "/deleteData", method = RequestMethod.POST)
    public @ResponseBody String deleteData(@RequestParam(value = "countryId") String countryId) {
        return sym0011Service.deleteData(countryId);
    }

	/**
	 * Get Data In Table QLTN_M_COUNTRY by University Id.
	 * 
	 * @param countryId : data from client.
	 * @return List QltnMCountry.
	 */
	@RequestMapping(value = "/getSingleData", method = RequestMethod.POST)
    public @ResponseBody QltnMCountry getSingleData(@RequestParam(value = "countryId") String countryId) {
        return sym0011Service.getSingleData(countryId);
    }

	/**
	 * Change page to 0011 and transfer data
	 * @param farmId : country's id received from client
	 * @return redirect to 0012 and data get from client
	 */
	@RequestMapping(value = "/changePage", method = RequestMethod.POST)
	public String changePage(RedirectAttributes rattrs, @RequestParam(value = "countryId") String countryId) {
		rattrs.addFlashAttribute("Sym012CountryData", countryId);
		return "redirect:../0012/";
	}
}

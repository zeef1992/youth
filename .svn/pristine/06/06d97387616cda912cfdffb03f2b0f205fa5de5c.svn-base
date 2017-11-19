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

import vn.youthmanager.ict.common.db.model.QltnMSpecialized;
import vn.youthmanager.ict.youth.db.model.Sym0019Conditions;
import vn.youthmanager.ict.youth.db.model.Sym0019Result;
import vn.youthmanager.ict.youth.service.Sym0019Service;

@Controller
@RequestMapping(value = "/0019")
public class Sym0019Controller {

	@Autowired
	private Sym0019Service sym0019Service;

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String top(Locale locale, Model model, @ModelAttribute("Sym019UniversityData") String  universityId) {
		sym0019Service.initData(model, universityId);
		return "youth/0019";
	}

	/**
	 * Get data in QLTN_M_REPORT by conditions from Client.
	 * 
	 * @param searchConditions
	 * @return List<Sym0019Result>
	 */
	@RequestMapping(value = "/searchData", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody List<Sym0019Result> searchData(@RequestBody Sym0019Conditions searchConditions) {
		return sym0019Service.searchData(searchConditions);
	}

	@RequestMapping(value = "/updateData", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody String updateData(@RequestBody QltnMSpecialized reportData) {
		return sym0019Service.updateData(reportData);
	}

	@RequestMapping(value = "/insertData", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody String insertData(@RequestBody QltnMSpecialized reportData) {
		return sym0019Service.insertData(reportData);
	}

	@RequestMapping(value = "/deleteData", method = RequestMethod.POST)
	public @ResponseBody String deleteData(@RequestParam(value = "specializedId") String specializedId) {
		return sym0019Service.deleteData(specializedId);
	}

	/**
	 * Get Data In Table QLTN_M_SPECIALIZED by user Id.
	 * 
	 * @param usersId
	 *            : data from client.
	 * @return List QltnMUsers.
	 */
	@RequestMapping(value = "/getSingleData", method = RequestMethod.POST)
	public @ResponseBody QltnMSpecialized getSingleData(@RequestParam(value = "specializedId") String specializedId ) {
		return sym0019Service.getSingleData(specializedId);
	}
}

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

import vn.youthmanager.ict.common.db.model.QltnMUniversity;
import vn.youthmanager.ict.youth.db.model.Sym0018Conditions;
import vn.youthmanager.ict.youth.db.model.Sym0018Result;
import vn.youthmanager.ict.youth.service.Sym0018Service;

@Controller
@RequestMapping(value = "/0018")
public class Sym0018Controller {

	@Autowired
	private Sym0018Service sym0018Service;

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String top (Model model) {
		return "youth/0018";
	}

	@RequestMapping(value = "/searchData", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody List<Sym0018Result> searchData(@RequestBody Sym0018Conditions searchConditions) {
        return sym0018Service.searchData(searchConditions);
    }

	@RequestMapping(value = "/updateData", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody String updateData(@RequestBody QltnMUniversity cateData) {
        return sym0018Service.updateData(cateData);
    }

	@RequestMapping(value = "/insertData", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody String insertData(@RequestBody QltnMUniversity cateData) {
        return sym0018Service.insertData(cateData);
    }

	@RequestMapping(value = "/deleteData", method = RequestMethod.POST)
    public @ResponseBody String deleteData(@RequestParam(value = "universityId") String universityId) {
        return sym0018Service.deleteData(universityId);
    }

	/**
	 * Get Data In Table QLTN_M_UNIVERSITY by University Id.
	 * 
	 * @param UniversityId : data from client.
	 * @return List QltnMUniversity.
	 */
	@RequestMapping(value = "/getSingleData", method = RequestMethod.POST)
    public @ResponseBody QltnMUniversity getSingleData(@RequestParam(value = "universityId") String universityId) {
        return sym0018Service.getSingleData(universityId);
    }

	/**
	 * Change page to 0018 and transfer data
	 * @param farmId : farm's id received from client
	 * @return redirect to 0019 and data get from client
	 */
	@RequestMapping(value = "/changePage", method = RequestMethod.POST)
	public String changePage(RedirectAttributes rattrs, @RequestParam(value = "universityId") String universityId) {
		rattrs.addFlashAttribute("Sym019UniversityData", universityId);
		return "redirect:../0019/";
	}
}

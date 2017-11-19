package vn.youthmanager.ict.youth.controller;

import java.util.List;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import vn.youthmanager.ict.common.db.model.QltnMEducational;
import vn.youthmanager.ict.youth.db.model.Sym0022Conditions;
import vn.youthmanager.ict.youth.db.model.Sym0022Result;
import vn.youthmanager.ict.youth.service.Sym0022Service;

@Controller
@RequestMapping(value = "/0022")
public class Sym0022Controller {

	@Autowired
	private Sym0022Service sym0022Service;
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String top(Locale locale, Model model) {
		return "youth/0022";
	}

	@RequestMapping(value = "/searchData", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody List<Sym0022Result> searchData(@RequestBody Sym0022Conditions searchConditions) {
        return sym0022Service.searchData(searchConditions);
    }
	
	@RequestMapping(value = "/updateData", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody String updateData(@RequestBody QltnMEducational reportData) {
        return sym0022Service.updateData(reportData);
    }


	@RequestMapping(value = "/insertData", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody String insertData(@RequestBody QltnMEducational reportData) {
        return sym0022Service.insertData(reportData);
    }

	@RequestMapping(value = "/deleteData", method = RequestMethod.POST)
    public @ResponseBody String deleteData(@RequestParam(value = "educationId") String educationId) {
        return sym0022Service.deleteData(educationId);
    }

	/**
	 * Get Data In Table QLTN_M_EDUCATIONAL by education Id.
	 * 
	 * @param educationId : data from client.
	 * @return List QLTN_M_EDUCATIONAL.
	 */
	@RequestMapping(value = "/getSingleData", method = RequestMethod.POST)
    public @ResponseBody QltnMEducational getSingleData(@RequestParam(value = "educationId") String educationId) {
        return sym0022Service.getSingleData(educationId);
    }

}

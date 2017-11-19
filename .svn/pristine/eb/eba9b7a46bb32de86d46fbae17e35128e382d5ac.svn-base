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

import vn.youthmanager.ict.common.db.model.QltnMCategory;
import vn.youthmanager.ict.youth.db.model.Sym0009Conditions;
import vn.youthmanager.ict.youth.db.model.Sym0009Result;
import vn.youthmanager.ict.youth.service.Sym0009Service;

@Controller
@RequestMapping(value = "/0009")
public class Sym0009Controller {

	@Autowired
	private Sym0009Service sym0009Service;
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String top(Model model) {
		return "youth/0009";
	}

	@RequestMapping(value = "/searchData", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody List<Sym0009Result> searchData(@RequestBody Sym0009Conditions searchConditions) {
        return sym0009Service.searchData(searchConditions);
    }

	@RequestMapping(value = "/updateData", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody String updateData(@RequestBody QltnMCategory cateData) {
        return sym0009Service.updateData(cateData);
    }

	@RequestMapping(value = "/insertData", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody String insertData(@RequestBody QltnMCategory cateData) {
        return sym0009Service.insertData(cateData);
    }

	@RequestMapping(value = "/deleteData", method = RequestMethod.POST)
    public @ResponseBody String deleteData(@RequestParam(value = "cateId") String cateId) {
        return sym0009Service.deleteData(cateId);
    }

	/**
	 * Get Data In Table QLTN_M_REPORT by user Id.
	 * 
	 * @param usersId : data from client.
	 * @return List QltnMUsers.
	 */
	@RequestMapping(value = "/getSingleData", method = RequestMethod.POST)
    public @ResponseBody QltnMCategory getSingleData(@RequestParam(value = "cateId") String cateId) {
        return sym0009Service.getSingleData(cateId);
    }
}

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

import vn.youthmanager.ict.common.db.model.QltnMSignature;
import vn.youthmanager.ict.youth.db.model.Sym0010Conditions;
import vn.youthmanager.ict.youth.db.model.Sym0010Result;
import vn.youthmanager.ict.youth.service.Sym0010Service;

@Controller
@RequestMapping(value = "/0010")
public class Sym0010Controller {

	@Autowired
	private Sym0010Service Sym0010Service;
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String top(Locale locale, Model model) {
		return "youth/0010";
	}

	@RequestMapping(value = "/searchData", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody List<Sym0010Result> searchData(@RequestBody Sym0010Conditions searchConditions) {
        return Sym0010Service.searchData(searchConditions);
    }
	
	@RequestMapping(value = "/updateData", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody String updateData(@RequestBody QltnMSignature signatureData) {
        return Sym0010Service.updateData(signatureData);
    }


	@RequestMapping(value = "/insertData", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody String insertData(@RequestBody QltnMSignature signatureData) {
        return Sym0010Service.insertData(signatureData);
    }

	@RequestMapping(value = "/deleteData", method = RequestMethod.POST)
    public @ResponseBody String deleteData(@RequestParam(value = "signatureId") String signatureId) {
        return Sym0010Service.deleteData(signatureId);
    }

	@RequestMapping(value = "/getSingleData", method = RequestMethod.POST)
    public @ResponseBody QltnMSignature getSingleData(@RequestParam(value = "signatureId") String signatureId) {
        return Sym0010Service.getSingleData(signatureId);
    }

}

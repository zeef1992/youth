package vn.youthmanager.ict.youth.controller;

import java.util.ArrayList;
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

import vn.youthmanager.ict.common.db.model.QltnMAccessAuthorization;
import vn.youthmanager.ict.youth.service.Sym0033Service;

@Controller
@RequestMapping(value="/0033")
public class Sym0033Controller {
	
	@Autowired
	private Sym0033Service sym0033Service;
	
	@RequestMapping(value="/", method = RequestMethod.GET)
	public String top (Model model, @RequestParam ("screenStr") String screenStr,
									@RequestParam ("usersId") String usersId) {
		List<QltnMAccessAuthorization> screen0033List = new ArrayList<QltnMAccessAuthorization>();
		screen0033List = sym0033Service.initData(screenStr);
		model.addAttribute("listId", screen0033List);
		return "youth/0033";
	}
	

	
	@RequestMapping(value = "/updateData", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody String updateData(@RequestBody QltnMAccessAuthorization accessAuthorizationData) {
        return sym0033Service.updateData(accessAuthorizationData);
    }
}

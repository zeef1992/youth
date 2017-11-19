package vn.youthmanager.ict.youth.controller;

import java.util.ArrayList;
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

import vn.youthmanager.ict.common.db.model.QltnMUsers;
import vn.youthmanager.ict.youth.db.model.LoginConditions;
import vn.youthmanager.ict.youth.service.LoginService;

@Controller
@RequestMapping(value = "/main")
public class MainController {
	@Autowired
	private LoginService loginService;
	
	@RequestMapping(value = "/", method = RequestMethod.GET) 
	public String top(Locale locale, Model model) {
		return "youth/main";
	}
	
	@RequestMapping(value = "/search", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody List<QltnMUsers> login(@RequestBody LoginConditions loginConditions) {
		// Khởi Tạo 1 Mảng LIST kiểu QltnMUsers.
		List<QltnMUsers> list = new ArrayList<QltnMUsers>();
		list = loginService.searchdata(loginConditions.getUserName(), loginConditions.getPassword());
		
		return list;
	}
	
	@RequestMapping(value = "/search", method = RequestMethod.GET, consumes = MediaType.APPLICATION_JSON_VALUE)
	public List<QltnMUsers> login1(@RequestParam("userName") String userName, @RequestParam("password") String password) {
		// Khởi Tạo 1 Mảng LIST kiểu QltnMUsers.
		List<QltnMUsers> list = new ArrayList<QltnMUsers>();
		list = loginService.searchdata(userName, password);
		
		return list;
	}
}

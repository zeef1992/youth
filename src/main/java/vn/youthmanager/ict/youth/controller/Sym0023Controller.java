package vn.youthmanager.ict.youth.controller;

import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import vn.youthmanager.ict.youth.service.Sym0023Service;
/**
 * 
 * @author nylf1992
 *
 */
@Controller
@RequestMapping(value = "/0023")
public class Sym0023Controller {

	@Autowired
	private Sym0023Service sym0023Service;
	
	@RequestMapping(value="/", method = RequestMethod.GET)
	public String top(Locale locale, Model model, @RequestParam ("users_id") String users_id) {
		System.out.println(users_id);
		model.addAttribute("usersId", users_id);
		sym0023Service.init(model);
		return "youth/0023";
	}
	
}

package vn.youthmanager.ict.youth.controller;

import java.util.Locale;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping(value = "/0047")
public class Sym0047Controller {

	@RequestMapping(value = "/", method = RequestMethod.POST)
	public String topPost(Locale locale, Model model, @RequestParam("personId") String personId) {
		model.addAttribute("personId", personId);
		return "youth/0047";
	}


	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String topGet(Locale locale, Model model, @RequestParam("personId") String personId) {
		model.addAttribute("personId", "");
		return "youth/0047";
	}
}

package vn.youthmanager.ict.youth.controller;

import java.util.Locale;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping(value = "/0045")
public class Sym0045Controller {

	@RequestMapping(value = "/", method = RequestMethod.POST)
	public String topPost(Locale locale, Model model, @RequestParam("numberOfRelation") String numberOfRelation,
													  @RequestParam("personId") String personId) {
		model.addAttribute("numberOfRelation", numberOfRelation);
		model.addAttribute("personId", personId);
		return "youth/0045";
	}

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String topGet(Locale locale, Model model, @RequestParam("numberOfRelation") String numberOfRelation) {
		model.addAttribute("numberOfRelation", numberOfRelation);
		model.addAttribute("personId", "");
		return "youth/0045";
	}
}

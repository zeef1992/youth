package vn.youthmanager.ict.youth.controller;

import java.util.Locale;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping(value = "/0049")
public class Sym0049Controller {

	@RequestMapping(value = "/", method = RequestMethod.POST)
	public String topPost(Locale locale, Model model) {
		return "youth/0049";
	}

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String topGet(Locale locale, Model model) {
		return "youth/0049";
	}
}

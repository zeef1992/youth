package vn.youthmanager.ict.youth.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping(value = "/0053")
public class Sym0053CController {
	
	public String top(Model model, @RequestParam(value = "personId") String personId) {
		return "youth/0053";
	}
}

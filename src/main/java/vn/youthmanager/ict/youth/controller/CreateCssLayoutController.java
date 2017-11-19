package vn.youthmanager.ict.youth.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping(value = "/9999")
public class CreateCssLayoutController {

	@RequestMapping(value = "/", method = RequestMethod.GET) 
	public String top() {
		return "youth/CssLayout";
	}
}

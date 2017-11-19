package vn.youthmanager.ict.youth.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping(value="/Angular")
public class AngularController {

	@RequestMapping(value="/" , method = RequestMethod.GET)
	public String top() {
		return "viduAjax";
	}
}

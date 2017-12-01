package vn.youthmanager.ict.youth.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import vn.youthmanager.ict.common.db.model.QltnMDetailReport;
import vn.youthmanager.ict.youth.db.model.Sym0053Result;
import vn.youthmanager.ict.youth.service.Sym0053Service;

@Controller
@RequestMapping(value = "/0053")
public class Sym0053Controller {
	
	@Autowired
	private Sym0053Service sym0053Service;

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String top(Model model, @RequestParam(value = "personId") String personId) {
		sym0053Service.initDataNoteReport(model, personId);
		return "youth/0053";
	}
}

package vn.youthmanager.ict.youth.controller;

import java.util.List;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import vn.youthmanager.ict.common.db.model.QltnMCritera;
import vn.youthmanager.ict.common.db.model.QltnMDetailReport;
import vn.youthmanager.ict.common.db.model.QltnMNoteReport;
import vn.youthmanager.ict.youth.service.Sym0051Service;

@Controller
@RequestMapping(value = "/0051")
public class Sym0051Controller {

	@Autowired
	private Sym0051Service sym0051Service;
	@RequestMapping(value = "/", method = RequestMethod.POST)
	public String topPost(Locale locale, Model model, @ModelAttribute("reportIdStr") String reportIdStr) {
		model.addAttribute("reportIdStr", reportIdStr);
		sym0051Service.initData(model, reportIdStr);
		return "youth/0051";
	}

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String topGet(Locale locale, Model model, @ModelAttribute("reportIdStr") String reportIdStr) {
		model.addAttribute("reportIdStr", reportIdStr);
		sym0051Service.initData(model, reportIdStr);
		return "youth/0051";
	}

	/**
	 * Get data for Detail combobox by detail report id
	 * 
	 * @param reportId : data received from client
	 * @return detail report data
	 */
	@RequestMapping(value = "/getDetailReport", method = RequestMethod.POST)
	public @ResponseBody List<QltnMDetailReport> getDetailReport(@RequestParam(value = "reportId") String reportId) {
		return sym0051Service.getDetailReport(reportId);
	}

	/**
	 * Get data for Criteria combobox by detail report id
	 * 
	 * @param reportId : data received from client
	 * @param detailReportId : data received from client
	 * @return detail report data
	 */
	@RequestMapping(value = "/getCriteria", method = RequestMethod.POST)
	public @ResponseBody List<QltnMCritera> getCriteria(@RequestParam(value = "reportId") String reportId,
			@RequestParam(value = "detailReportId") String detailReportId) {
		return sym0051Service.getCriteria(reportId, detailReportId);
	}

	@RequestMapping(value = "/checkCriteriaOfPerson", method = RequestMethod.POST)
	public @ResponseBody List<QltnMNoteReport> checkCriteriaOfPerson(@RequestParam(value = "personId") String personId,
			@RequestParam(value = "reportId") String reportId,
			@RequestParam(value = "detailReportId") String detailReportId) {
		return sym0051Service.checkCriteriaOfPerson(personId, reportId, detailReportId);
	}
}

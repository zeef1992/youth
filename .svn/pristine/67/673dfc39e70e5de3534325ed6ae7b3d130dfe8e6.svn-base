package vn.youthmanager.ict.youth.controller;

import java.util.List;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import vn.youthmanager.ict.common.db.model.QltnMDetailReport;
import vn.youthmanager.ict.youth.db.model.Sym0006Conditions;
import vn.youthmanager.ict.youth.db.model.Sym0006Result;
import vn.youthmanager.ict.youth.service.Sym0006Service;

@Controller
@RequestMapping(value = "/0006")
public class Sym0006Controller {

	@Autowired
	private Sym0006Service sym0006Service;

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String top(Locale locale, Model model, @ModelAttribute("Sym0006ReportData") String  reportId) {
		sym0006Service.initData(model, reportId);
		return "youth/0006";
	}

	/**
	 * Get data in QLTN_M_REPORT by conditions from Client.
	 * 
	 * @param searchConditions
	 * @return List<Sym0006Result>
	 */
	@RequestMapping(value = "/searchData", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody List<Sym0006Result> searchData(@RequestBody Sym0006Conditions searchConditions) {
		return sym0006Service.searchData(searchConditions);
	}

	@RequestMapping(value = "/updateData", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody String updateData(@RequestBody QltnMDetailReport reportData) {
		return sym0006Service.updateData(reportData);
	}

	@RequestMapping(value = "/insertData", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody String insertData(@RequestBody QltnMDetailReport reportData) {
		return sym0006Service.insertData(reportData);
	}

	@RequestMapping(value = "/deleteData", method = RequestMethod.POST)
	public @ResponseBody String deleteData(@RequestParam(value = "detailReportId") String detailReportId) {
		return sym0006Service.deleteData(detailReportId);
	}

	/**
	 * Get Data In Table QLTN_M_REPORT by user Id.
	 * 
	 * @param usersId
	 *            : data from client.
	 * @return List QltnMUsers.
	 */
	@RequestMapping(value = "/getSingleData", method = RequestMethod.POST)
	public @ResponseBody QltnMDetailReport getSingleData(@RequestParam(value = "detailReportId") String detailReportId,
			@RequestParam(value = "reportId") String reportId) {
		return sym0006Service.getSingleData(reportId, detailReportId);
	}
}

package vn.youthmanager.ict.youth.controller;

import java.util.List;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import vn.youthmanager.ict.common.db.model.QltnMReport;
import vn.youthmanager.ict.youth.db.model.Sym0005Conditions;
import vn.youthmanager.ict.youth.db.model.Sym0005Result;
import vn.youthmanager.ict.youth.service.Sym0005Service;

@Controller
@RequestMapping(value = "/0005")
public class Sym0005Controller {

	@Autowired
	private Sym0005Service sym0005Service;
	
	/**
	 * 
	 * @param model
	 * @param locale
	 * @return JSP
	 */
	@RequestMapping(value = "/", method = RequestMethod.GET) 
	public String top(Model model, Locale locale) {
		return "youth/0005";
	}
	
	/**
	 * Get data in QLTN_M_REPORT by conditions from Client.
	 * 
	 * @param searchConditions
	 * @return List<Sym0003Result>
	 */
	@RequestMapping(value = "/searchData", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody List<Sym0005Result> searchData(@RequestBody Sym0005Conditions searchConditions) {
        return sym0005Service.searchData(searchConditions);
    }
	
	@RequestMapping(value = "/updateData", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody String updateData(@RequestBody QltnMReport reportData) {
        return sym0005Service.updateData(reportData);
    }


	@RequestMapping(value = "/insertData", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody String insertData(@RequestBody QltnMReport reportData) {
        return sym0005Service.insertData(reportData);
    }

	@RequestMapping(value = "/deleteData", method = RequestMethod.POST)
    public @ResponseBody String deleteData(@RequestParam(value = "reportId") String reportId) {
        return sym0005Service.deleteData(reportId);
    }

	/**
	 * Get Data In Table QLTN_M_REPORT by user Id.
	 * 
	 * @param usersId : data from client.
	 * @return List QltnMUsers.
	 */
	@RequestMapping(value = "/getSingleData", method = RequestMethod.POST)
    public @ResponseBody QltnMReport getSingleData(@RequestParam(value = "reportId") String reportId) {
        return sym0005Service.getSingleData(reportId);
    }

	/**
	 * Change page to 0006 and transfer data
	 * @param farmId : farm's id received from client
	 * @return redirect to 0007 and data get from client
	 */
	@RequestMapping(value = "/changePage", method = RequestMethod.POST)
	public String changePage(RedirectAttributes rattrs, @RequestParam(value = "reportId") String reportId) {
		rattrs.addFlashAttribute("Sym0006ReportData", reportId);
		return "redirect:../0006/";
	}
}

package vn.youthmanager.ict.youth.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import vn.youthmanager.ict.common.db.model.QltnMCritera;
import vn.youthmanager.ict.common.db.model.QltnMDetailReport;
import vn.youthmanager.ict.youth.db.model.Sym0025Conditions;
import vn.youthmanager.ict.youth.db.model.Sym0025Result;
import vn.youthmanager.ict.youth.service.Sym0025Service;

/**
 * 
 * @author nylf1992
 *
 */

@Controller
@RequestMapping(value = "/0025")
public class Sym0025Controller {

	@Autowired
	private Sym0025Service sym0025Service;
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String top (Model model) {
		sym0025Service.initData(model, "");
		return "youth/0025";
	}

	@RequestMapping(value = "/searchData", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody List<Sym0025Result> searchData(@RequestBody Sym0025Conditions searchConditions) {
        return sym0025Service.searchData(searchConditions);
    }

	@RequestMapping(value = "/updateData", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody String updateData(@RequestBody QltnMCritera cateData) {
        return sym0025Service.updateData(cateData);
    }

	@RequestMapping(value = "/insertData", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody String insertData(@RequestBody QltnMCritera cateData) {
        return sym0025Service.insertData(cateData);
    }

	@RequestMapping(value = "/deleteData", method = RequestMethod.POST)
    public @ResponseBody String deleteData(@RequestParam(value = "criteriaId") String criteriaId) {
        return sym0025Service.deleteData(criteriaId);
    }

	/**
	 * Get Data In Table QLTN_M_REPORT by user Id.
	 * 
	 * @param usersId : data from client.
	 * @return List QltnMUsers.
	 */
	@RequestMapping(value = "/getSingleData", method = RequestMethod.POST)
    public @ResponseBody QltnMCritera getSingleData(@RequestParam(value = "criteriaId") String criteriaId) {
        return sym0025Service.getSingleData(criteriaId);
    }

	/**
	 * Get data for detailReport combobox by University id
	 * 
	 * @param reportId : data received from client
	 * @return detailReport data
	 */
	@RequestMapping(value = "/getDetailReportNameByReportId", method = RequestMethod.POST)
	public @ResponseBody List<QltnMDetailReport> getDetailReportNameByReportId(@RequestParam(value = "reportId") String reportId) {
		return sym0025Service.getDetailReportNameByReportId(reportId);
	}
}

package vn.youthmanager.ict.youth.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import vn.youthmanager.ict.common.cnst.Constants;
import vn.youthmanager.ict.common.db.model.QltnMCritera;
import vn.youthmanager.ict.common.db.model.QltnMCriteraExample;
import vn.youthmanager.ict.common.db.model.QltnMDetailReport;
import vn.youthmanager.ict.common.db.model.QltnMDetailReportExample;
import vn.youthmanager.ict.common.db.model.QltnMNoteReport;
import vn.youthmanager.ict.youth.dao.Sym0051Dao;
import vn.youthmanager.ict.youth.db.model.Sym0051Result;

/**
 * 
 * @author nylf1992
 *
 */
@Service
public class Sym0051Service {

	@Autowired
	private Sym0051Dao sym0051Dao;

	// change report Id String to array
	public void initData(Model model, String reportIdStr) {
		String[] reportIdArr = reportIdStr.split("\\,");
		// create Map
		HashMap<String, Object> params = new HashMap<String, Object>();
		params.put("reportIdStr", reportIdArr);
		List<Sym0051Result> list0051 = sym0051Dao.getSym0051Mapper().getReportName(params);
		model.addAttribute("list0051", list0051);
		model.addAttribute("reportIdArr", reportIdArr);
	}

	public List<QltnMDetailReport> getDetailReport(String reportId) {
		List<QltnMDetailReport> detailReportData = new ArrayList<QltnMDetailReport>();
		// get all data of report with delete flag = 0
		try {
			QltnMDetailReportExample QltnMDetailReportExample = new QltnMDetailReportExample();
			QltnMDetailReportExample.Criteria QltnMDetailReportCriteria = QltnMDetailReportExample.createCriteria();
			QltnMDetailReportCriteria.andReportIdEqualTo(reportId);
			QltnMDetailReportCriteria.andDeleteFlagEqualTo(Constants.DELETE_FLAG_OFF);
			detailReportData = sym0051Dao.getQltnMDetailReportMapper().selectByExample(QltnMDetailReportExample);
		} catch (Exception ex) {
			ex.printStackTrace();
			detailReportData = new ArrayList<QltnMDetailReport>();
		}
		return detailReportData;
	}

	public List<QltnMCritera> getCriteria(String reportId, String detailReportId) {
		// khai bao 1 list.
		List<QltnMCritera> criteriaData = new ArrayList<QltnMCritera>();
		// get all data of criteria with delete flag = 0
		try {
			QltnMCriteraExample QltnMCriteraExample = new QltnMCriteraExample();
			QltnMCriteraExample.Criteria QltnMCriteraCriteria = QltnMCriteraExample.createCriteria();
			QltnMCriteraCriteria.andReportIdEqualTo(reportId);
			QltnMCriteraCriteria.andDetailReportIdEqualTo(detailReportId);
			QltnMCriteraCriteria.andDeleteFlagEqualTo(Constants.DELETE_FLAG_OFF);
			criteriaData = sym0051Dao.getQltnMCriteraMapper().selectByExample(QltnMCriteraExample);
		} catch (Exception ex) {
			ex.printStackTrace();
			criteriaData = new ArrayList<QltnMCritera>();
		}
		return criteriaData;
	}

	/**
	 * checkCriteriaOfPerson.
	 * 
	 * check Note Report of Person have or not?
	 * 
	 * @param personId
	 * @param reportId
	 * @param detailReportId
	 * @return
	 */
	public List<QltnMNoteReport> checkCriteriaOfPerson(String personId, String reportId, String detailReportId) {
		// khai bao 1 list.
		List<QltnMNoteReport> noteReportData = new ArrayList<QltnMNoteReport>();
		HashMap<String, Object> params = new HashMap<String, Object>();
		params.put("personId", personId);
		params.put("reportId",reportId);
		params.put("detailReportId", detailReportId);
		try {
			noteReportData = sym0051Dao.getSym0051Mapper().checkCriteriaOfPerson(params);
		} catch(Exception ex) {
			ex.printStackTrace();
			noteReportData = new ArrayList<QltnMNoteReport>();
		}
		return noteReportData;
	}
}

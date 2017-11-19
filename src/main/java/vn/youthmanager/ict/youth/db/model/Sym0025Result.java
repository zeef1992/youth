package vn.youthmanager.ict.youth.db.model;

import vn.youthmanager.ict.common.db.model.QltnMCritera;

public class Sym0025Result extends QltnMCritera {

	private String reportName;

	private String detailReportName;

	private String searchDataTotalCounts;

	public String getSearchDataTotalCounts() {
		return searchDataTotalCounts;
	}

	public void setSearchDataTotalCounts(String searchDataTotalCounts) {
		this.searchDataTotalCounts = searchDataTotalCounts;
	}

	public String getReportName() {
		return reportName;
	}

	public void setReportName(String reportName) {
		this.reportName = reportName;
	}

	public String getDetailReportName() {
		return detailReportName;
	}

	public void setDetailReportName(String detailReportName) {
		this.detailReportName = detailReportName;
	}
}

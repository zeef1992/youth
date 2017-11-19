package vn.youthmanager.ict.youth.db.model;

/**
 * 
 * @author nylf1992
 *
 */
public class Sym0006Conditions {
	private String reportId ;

	private String detailReportName;
	// From parameter
	private String fromRow;

	// Number of items in a page
	private String itemCount;


	public String getFromRow() {
		return fromRow;
	}

	public void setFromRow(String fromRow) {
		this.fromRow = fromRow;
	}

	public String getItemCount() {
		return itemCount;
	}

	public void setItemCount(String itemCount) {
		this.itemCount = itemCount;
	}

	public String getReportId() {
		return reportId;
	}

	public void setReportId(String reportId) {
		this.reportId = reportId;
	}

	public String getDetailReportName() {
		return detailReportName;
	}

	public void setDetailReportName(String detailReportName) {
		this.detailReportName = detailReportName;
	}
}

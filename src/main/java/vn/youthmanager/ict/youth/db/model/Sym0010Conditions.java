package vn.youthmanager.ict.youth.db.model;

import vn.youthmanager.ict.common.db.model.QltnMSignature;

public class Sym0010Conditions extends QltnMSignature {

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
	
}

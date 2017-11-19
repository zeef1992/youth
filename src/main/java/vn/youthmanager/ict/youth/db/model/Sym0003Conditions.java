package vn.youthmanager.ict.youth.db.model;

import vn.youthmanager.ict.common.db.model.QltnMUsers;

public class Sym0003Conditions extends QltnMUsers {

	// Users Id
	private String userId;
	// Role type string
	private String usersRoleTypeString;

	// From parameter
	private String fromRow;

	// Number of items in a page
	private String itemCount;

	public String getUsersRoleTypeString() {
		return usersRoleTypeString;
	}

	public void setUsersRoleTypeString(String usersRoleTypeString) {
		this.usersRoleTypeString = usersRoleTypeString;
	}

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

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}
	
}

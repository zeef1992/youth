package vn.youthmanager.ict.youth.db.model;

import vn.youthmanager.ict.common.db.model.QltnMUsers;

public class Sym0003DataObject extends QltnMUsers {

	// Password changed indicator
	private boolean passwordChanged;

	public boolean isPasswordChanged() {
		return passwordChanged;
	}

	public void setPasswordChanged(boolean passwordChanged) {
		this.passwordChanged = passwordChanged;
	}
}

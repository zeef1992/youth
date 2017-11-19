package vn.bananavietnam.ict.common.auth;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

/**
 * Store User's information
 */
public class MyUser extends User {

	private static final long serialVersionUID = 1L;
	private final String ID;
	private final String USERNAME;
	private final String USERFULLNAME;
	private final ArrayList<String> SCREENID;

	public MyUser(String username, String password, boolean enabled, boolean accountNonExpired, boolean credentialsNonExpired, boolean accountNonLocked, Collection<? extends GrantedAuthority> authorities, ResultSet rs) throws SQLException {
		super(username, password, enabled, accountNonExpired, credentialsNonExpired, accountNonLocked, authorities);
		ID = rs.getString("id");
		USERNAME = rs.getString("username");
		USERFULLNAME = rs.getString("userfullname");
		SCREENID = new ArrayList<String>();
		SCREENID.add(rs.getString("screenid"));
		while (rs.next()) {
			String screenId = rs.getString("screenid");
			if (!SCREENID.contains(screenId)) {
				SCREENID.add(screenId);
			}
		}
	}

	public MyUser(String username, String password, boolean enabled, boolean accountNonExpired, boolean credentialsNonExpired, boolean accountNonLocked, Collection<? extends GrantedAuthority> authorities, MyUser myUser) throws SQLException {
		super(username, password, enabled, accountNonExpired, credentialsNonExpired, accountNonLocked, authorities);
		ID = myUser.getID();
		USERNAME = myUser.getUsername();
		USERFULLNAME = myUser.getUSERFULLNAME();
		SCREENID = myUser.getSCREENID();
	}

	public String getID() {
		return ID;
	}

	public String getUSERNAME() {
		return USERNAME;
	}

	public String getUSERFULLNAME() {
		return USERFULLNAME;
	}
	
	public ArrayList<String> getSCREENID() {
		return SCREENID;
	}
}

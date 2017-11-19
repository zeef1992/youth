package vn.youthmanager.ict.common.util;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.security.core.context.SecurityContextHolder;

import vn.bananavietnam.ict.common.auth.MyUser;

public class Util {

	/**
	 * Get information of logged in user
	 * 
	 * @return
	 */
	public static MyUser getUserInfo() {
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		MyUser myUser = (MyUser) principal;
		return myUser;
	}

	/**
	 * Replace special characters
	 * 
	 * @param str
	 * @return
	 */
	public static String convertSanitize(String str) {
		if (str == null) {
			return str;
		}
		str = str.replaceAll("&", "&amp;");
		str = str.replaceAll("<", "&lt;");
		str = str.replaceAll(">", "&gt;");
		str = str.replaceAll("\"", "&quot;");
		str = str.replaceAll("'", "&#39;");
		str = str.replaceAll("%", "&#37;");
		return str;
	}

	/**
	 * Replace special characters
	 * 
	 * @param str
	 * @return
	 */
	public static String convertUnsanitize(String str) {
		if (str == null) {
			return str;
		}
		str = str.replaceAll("&#39;", "'");
		str = str.replaceAll("&quot;", "\"");
		str = str.replaceAll("&gt;", ">");
		str = str.replaceAll("&lt;", "<");
		str = str.replaceAll("&amp;", "&");
		str = str.replaceAll("&#37;", "%");
		return str;
	}

	/**
	 * Get current date time based on format that user passes in
	 * 
	 * @param format
	 * @return
	 */
	public static String getCurrentDateTime(String format) {
		DateFormat sdf = new SimpleDateFormat(format);
		Date date = new Date();
		return sdf.format(date);
	}
}

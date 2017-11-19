package vn.youthmanager.ict.youth.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import vn.youthmanager.ict.youth.db.mapper.LoginMapper;

@Component
public class LoginDao {

	@Autowired
	private LoginMapper loginMapper;

	public LoginMapper getLoginMapper() {
		return loginMapper;
	}
}

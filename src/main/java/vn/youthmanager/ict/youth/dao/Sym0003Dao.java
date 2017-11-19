package vn.youthmanager.ict.youth.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import vn.youthmanager.ict.common.db.mapper.QltnMUsersMapper;
import vn.youthmanager.ict.youth.db.mapper.Sym0003Mapper;

@Component
public class Sym0003Dao {

	@Autowired
	private Sym0003Mapper sym0003Mapper;

	@Autowired
	private QltnMUsersMapper qltnMUsersMapper;
	
	public QltnMUsersMapper getQltnMUsersMapper() {
		return qltnMUsersMapper;
	}

	public Sym0003Mapper getSym0003Mapper() {
		return sym0003Mapper;
	}
}

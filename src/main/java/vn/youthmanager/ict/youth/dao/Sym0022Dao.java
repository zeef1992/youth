package vn.youthmanager.ict.youth.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import vn.youthmanager.ict.common.db.mapper.QltnMEducationalMapper;
import vn.youthmanager.ict.youth.db.mapper.Sym0022Mapper;

@Component
public class Sym0022Dao {
	
	@Autowired
	private Sym0022Mapper sym0022Mapper;

	@Autowired
	private QltnMEducationalMapper qltnMEducationalMapper;
	
	public Sym0022Mapper getSym0022Mapper() {
		return sym0022Mapper;
	}

	public QltnMEducationalMapper getQltnMEducationalMapper() {
		return qltnMEducationalMapper;
	}
}

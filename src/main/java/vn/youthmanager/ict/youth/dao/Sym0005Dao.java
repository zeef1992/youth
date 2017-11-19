package vn.youthmanager.ict.youth.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import vn.youthmanager.ict.common.db.mapper.QltnMReportMapper;
import vn.youthmanager.ict.youth.db.mapper.Sym0005Mapper;

@Component
public class Sym0005Dao {
	
	@Autowired
	private Sym0005Mapper sym0005Mapper;

	@Autowired
	private QltnMReportMapper qltnMReportMapper;
	
	public Sym0005Mapper getSym0005Mapper() {
		return sym0005Mapper;
	}

	public QltnMReportMapper getQltnMReportMapper() {
		return qltnMReportMapper;
	}
	
}

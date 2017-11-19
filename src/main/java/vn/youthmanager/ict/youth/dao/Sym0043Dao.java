package vn.youthmanager.ict.youth.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import vn.youthmanager.ict.common.db.mapper.QltnMFamilyRelativesMapper;
import vn.youthmanager.ict.common.db.mapper.QltnMNoteReportMapper;
import vn.youthmanager.ict.common.db.mapper.QltnMPersonMapper;
import vn.youthmanager.ict.common.db.mapper.QltnMProcessPersonMapper;
import vn.youthmanager.ict.youth.db.mapper.Sym0043Mapper;

@Component
public class Sym0043Dao {

	@Autowired
	private QltnMPersonMapper qltnMPersonMapper;

	@Autowired
	private QltnMNoteReportMapper qltnMNoteReportMapper;

	@Autowired
	private QltnMProcessPersonMapper qltnMProcessPersonMapper;

	@Autowired
	private QltnMFamilyRelativesMapper qltnMFamilyRelativesMapper;
	
	@Autowired
	private Sym0043Mapper sym0043Mapper;

	public QltnMPersonMapper getQltnMPersonMapper() {
		return qltnMPersonMapper;
	}

	public Sym0043Mapper getSym0043Mapper() {
		return sym0043Mapper;
	}

	public QltnMNoteReportMapper getQltnMNoteReportMapper() {
		return qltnMNoteReportMapper;
	}

	public QltnMProcessPersonMapper getQltnMProcessPersonMapper() {
		return qltnMProcessPersonMapper;
	}

	public QltnMFamilyRelativesMapper getQltnMFamilyRelativesMapper() {
		return qltnMFamilyRelativesMapper;
	}
}

package vn.youthmanager.ict.youth.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import vn.youthmanager.ict.common.db.mapper.QltnMCriteraMapper;
import vn.youthmanager.ict.common.db.mapper.QltnMDetailReportMapper;
import vn.youthmanager.ict.common.db.mapper.QltnMReportMapper;
import vn.youthmanager.ict.youth.db.mapper.Sym0053Mapper;

@Component
public class Sym0053Dao {

	@Autowired
	private QltnMDetailReportMapper qltnMDetailReportMapper;

	@Autowired
	private QltnMCriteraMapper qltnMCriteraMapper;

	@Autowired
	private QltnMReportMapper qltnMReportMapper;
	
	@Autowired
	private Sym0053Mapper sym0053Mapper;

	public QltnMDetailReportMapper getQltnMDetailReportMapper() {
		return qltnMDetailReportMapper;
	}

	public void setQltnMDetailReportMapper(QltnMDetailReportMapper qltnMDetailReportMapper) {
		this.qltnMDetailReportMapper = qltnMDetailReportMapper;
	}

	public QltnMCriteraMapper getQltnMCriteraMapper() {
		return qltnMCriteraMapper;
	}

	public void setQltnMCriteraMapper(QltnMCriteraMapper qltnMCriteraMapper) {
		this.qltnMCriteraMapper = qltnMCriteraMapper;
	}

	public QltnMReportMapper getQltnMReportMapper() {
		return qltnMReportMapper;
	}

	public void setQltnMReportMapper(QltnMReportMapper qltnMReportMapper) {
		this.qltnMReportMapper = qltnMReportMapper;
	}

	public Sym0053Mapper getSym0053Mapper() {
		return sym0053Mapper;
	}

	public void setSym0053Mapper(Sym0053Mapper sym0053Mapper) {
		this.sym0053Mapper = sym0053Mapper;
	}

}

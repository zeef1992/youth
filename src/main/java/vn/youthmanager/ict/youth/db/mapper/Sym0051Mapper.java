package vn.youthmanager.ict.youth.db.mapper;

import java.util.List;
import java.util.Map;

import vn.youthmanager.ict.common.db.model.QltnMNoteReport;
import vn.youthmanager.ict.youth.db.model.Sym0051Result;

public interface Sym0051Mapper {

	List<Sym0051Result> getReportName(Map<String, Object> params);
	
	List<QltnMNoteReport> checkCriteriaOfPerson(Map<String, Object> params);
}

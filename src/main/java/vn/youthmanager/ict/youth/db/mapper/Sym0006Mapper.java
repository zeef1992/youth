package vn.youthmanager.ict.youth.db.mapper;

import java.util.List;
import java.util.Map;

import vn.youthmanager.ict.common.db.model.QltnMDetailReport;
import vn.youthmanager.ict.youth.db.model.Sym0006DetailResult;
import vn.youthmanager.ict.youth.db.model.Sym0006Result;

public interface Sym0006Mapper {

	List<Sym0006Result> searchData(Map<String, Object> params);
	
	List<Sym0006DetailResult> searchReportName(Map<String, Object> params);

	String getSearchDataTotalCounts(Map<String, Object> params);
	
	String getLastDetailReportId (Map<String, Object> params);
	
	QltnMDetailReport getSingleData(QltnMDetailReport qltnMDetailReport);
}

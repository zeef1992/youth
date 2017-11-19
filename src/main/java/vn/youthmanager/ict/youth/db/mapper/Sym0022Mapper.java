package vn.youthmanager.ict.youth.db.mapper;

import java.util.List;
import java.util.Map;

import vn.youthmanager.ict.youth.db.model.Sym0022Result;

public interface Sym0022Mapper {


	List<Sym0022Result> searchData(Map<String, Object> params);


	String getSearchDataTotalCounts(Map<String, Object> params);
	
	String getLastIdEducation (Map<String, Object> params);
}

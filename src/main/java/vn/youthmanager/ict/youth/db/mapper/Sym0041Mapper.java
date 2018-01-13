package vn.youthmanager.ict.youth.db.mapper;

import java.util.List;
import java.util.Map;

import vn.youthmanager.ict.youth.db.model.Sym0041Result;

public interface Sym0041Mapper {

	List<Sym0041Result> searchData(Map<String, Object> params);
	List<Sym0041Result> getPersonDetail(Map<String, Object> params);

	String getSearchDataTotalCounts(Map<String, Object> params);
	
	String getLastIdGroups (Map<String, Object> params);
}

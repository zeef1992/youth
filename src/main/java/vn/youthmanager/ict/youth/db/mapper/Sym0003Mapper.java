package vn.youthmanager.ict.youth.db.mapper;

import java.util.List;
import java.util.Map;

import vn.youthmanager.ict.youth.db.model.Sym0003Result;

public interface Sym0003Mapper {
	List<Sym0003Result> searchData(Map<String, Object> params);

	String getSearchDataTotalCounts(Map<String, Object> params);
}

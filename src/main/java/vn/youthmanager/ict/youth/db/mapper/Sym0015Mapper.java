package vn.youthmanager.ict.youth.db.mapper;

import java.util.List;
import java.util.Map;

import vn.youthmanager.ict.youth.db.model.Sym0015Result;

/**
 * 
 * @author nylf1992
 *
 */
public interface Sym0015Mapper {

	List<Sym0015Result> searchData(Map<String, Object> params);

	String getSearchDataTotalCounts(Map<String, Object> params);
	
	String getLastIdTown (Map<String, Object> params);
}

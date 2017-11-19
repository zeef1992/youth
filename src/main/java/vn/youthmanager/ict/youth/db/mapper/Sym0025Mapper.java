package vn.youthmanager.ict.youth.db.mapper;

import java.util.List;
import java.util.Map;

import vn.youthmanager.ict.youth.db.model.Sym0025Result;

/**
 * 
 * @author nylf1992
 *
 */
public interface Sym0025Mapper {

	List<Sym0025Result> searchData(Map<String, Object> params);

	String getSearchDataTotalCounts(Map<String, Object> params);
	
	String getLastIdCritera (Map<String, Object> params);
}

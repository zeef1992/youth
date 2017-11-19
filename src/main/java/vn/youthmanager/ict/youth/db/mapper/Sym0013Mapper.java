package vn.youthmanager.ict.youth.db.mapper;

import java.util.List;
import java.util.Map;

import vn.youthmanager.ict.youth.db.model.Sym0013Result;

/**
 * 
 * @author nylf1992
 *
 */
public interface Sym0013Mapper {

	List<Sym0013Result> searchData(Map<String, Object> params);

	String getSearchDataTotalCounts(Map<String, Object> params);
	
	String getLastIdDistrict (Map<String, Object> params);
}

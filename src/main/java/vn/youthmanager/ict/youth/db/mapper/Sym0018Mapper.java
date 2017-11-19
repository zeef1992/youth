package vn.youthmanager.ict.youth.db.mapper;

import java.util.List;
import java.util.Map;

import vn.youthmanager.ict.youth.db.model.Sym0018Result;

/**
 * 
 * @author nylf1992
 *
 */
public interface Sym0018Mapper {

	List<Sym0018Result> searchData(Map<String, Object> params);

	String getSearchDataTotalCounts(Map<String, Object> params);
	
	String getLastIdUniversity (Map<String, Object> params);
}

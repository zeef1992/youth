package vn.youthmanager.ict.youth.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import vn.youthmanager.ict.common.db.mapper.QltnMSpecializedMapper;
import vn.youthmanager.ict.common.db.mapper.QltnMUniversityMapper;
import vn.youthmanager.ict.youth.db.mapper.Sym0019Mapper;

/**
 * 
 * @author nylf1992
 *
 */
@Component
public class Sym0019Dao {

	@Autowired
	private Sym0019Mapper sym0019Mapper;

	@Autowired
	private QltnMUniversityMapper qltnMUniversityMapper;

	@Autowired
	private QltnMSpecializedMapper qltnMSpecializedMapper;

	public Sym0019Mapper getSym0019Mapper() {
		return sym0019Mapper;
	}

	public QltnMUniversityMapper getQltnMUniversityMapper() {
		return qltnMUniversityMapper;
	}

	public QltnMSpecializedMapper getQltnMSpecializedMapper() {
		return qltnMSpecializedMapper;
	}
	
}

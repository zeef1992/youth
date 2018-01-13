package vn.youthmanager.ict.youth.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import vn.youthmanager.ict.common.db.mapper.QltnMEducationalMapper;
import vn.youthmanager.ict.common.db.mapper.QltnMUniversityMapper;
import vn.youthmanager.ict.youth.db.mapper.Sym0018Mapper;

/**
 * 
 * @author nylf1992
 *
 */
@Component
public class Sym0018Dao {
	
	@Autowired
	private Sym0018Mapper sym0018Mapper;

	@Autowired
	private QltnMEducationalMapper qltnMEducationalMapper;
	
	@Autowired
	private QltnMUniversityMapper qltnMUniversityMapper;
	
	public Sym0018Mapper getSym0018Mapper() {
		return sym0018Mapper;
	}

	public QltnMUniversityMapper getQltnMUniversityMapper() {
		return qltnMUniversityMapper;
	}

	public QltnMEducationalMapper getQltnMEducationalMapper() {
		return qltnMEducationalMapper;
	}
}

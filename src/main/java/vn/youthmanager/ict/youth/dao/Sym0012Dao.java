package vn.youthmanager.ict.youth.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import vn.youthmanager.ict.common.db.mapper.QltnMCityMapper;
import vn.youthmanager.ict.common.db.mapper.QltnMCountryMapper;
import vn.youthmanager.ict.youth.db.mapper.Sym0012Mapper;

/**
 * 
 * @author nylf1992
 *
 */
@Component
public class Sym0012Dao {
	
	@Autowired
	private Sym0012Mapper sym0012Mapper;

	@Autowired
	private QltnMCityMapper qltnMCityMapper;

	@Autowired
	private QltnMCountryMapper qltnMCountryMapper;
	
	public Sym0012Mapper getSym0012Mapper() {
		return sym0012Mapper;
	}

	public QltnMCityMapper getQltnMCityMapper() {
		return qltnMCityMapper;
	}

	public QltnMCountryMapper getQltnMCountryMapper() {
		return qltnMCountryMapper;
	}
}

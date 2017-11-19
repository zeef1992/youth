package vn.youthmanager.ict.youth.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import vn.youthmanager.ict.common.db.mapper.QltnMCityMapper;
import vn.youthmanager.ict.common.db.mapper.QltnMCountryMapper;
import vn.youthmanager.ict.common.db.mapper.QltnMDistrictMapper;
import vn.youthmanager.ict.youth.db.mapper.Sym0013Mapper;

/**
 * 
 * @author nylf1992
 *
 */
@Component
public class Sym0013Dao {
	
	@Autowired
	private Sym0013Mapper sym0013Mapper;

	@Autowired
	private QltnMCityMapper qltnMCityMapper;

	@Autowired
	private QltnMCountryMapper qltnMCountryMapper;
	
	@Autowired
	private QltnMDistrictMapper qltnMDistrictMapper;
	
	public Sym0013Mapper getSym0013Mapper() {
		return sym0013Mapper;
	}

	public QltnMCityMapper getQltnMCityMapper() {
		return qltnMCityMapper;
	}

	public QltnMCountryMapper getQltnMCountryMapper() {
		return qltnMCountryMapper;
	}

	public QltnMDistrictMapper getQltnMDistrictMapper() {
		return qltnMDistrictMapper;
	}
}

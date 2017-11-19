package vn.youthmanager.ict.youth.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import vn.youthmanager.ict.common.db.mapper.QltnMCityMapper;
import vn.youthmanager.ict.common.db.mapper.QltnMCountryMapper;
import vn.youthmanager.ict.common.db.mapper.QltnMDistrictMapper;
import vn.youthmanager.ict.common.db.mapper.QltnMTownMapper;
import vn.youthmanager.ict.common.db.mapper.QltnMWardsMapper;
import vn.youthmanager.ict.youth.db.mapper.Sym0015Mapper;

/**
 * 
 * @author nylf1992
 *
 */
@Component
public class Sym0015Dao {

	@Autowired
	private Sym0015Mapper sym0015Mapper;

	@Autowired
	private QltnMCityMapper qltnMCityMapper;

	@Autowired
	private QltnMCountryMapper qltnMCountryMapper;

	@Autowired
	private QltnMDistrictMapper qltnMDistrictMapper;

	@Autowired
	private QltnMWardsMapper qltnMWardsMapper;

	@Autowired
	private QltnMTownMapper qltnMTownMapper;

	public Sym0015Mapper getSym0015Mapper() {
		return sym0015Mapper;
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

	public QltnMWardsMapper getQltnMWardsMapper() {
		return qltnMWardsMapper;
	}

	public QltnMTownMapper getQltnMTownMapper() {
		return qltnMTownMapper;
	}
}

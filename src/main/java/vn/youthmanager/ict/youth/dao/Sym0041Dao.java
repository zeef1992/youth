package vn.youthmanager.ict.youth.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import vn.youthmanager.ict.common.db.mapper.QltnMCategoryMapper;
import vn.youthmanager.ict.common.db.mapper.QltnMCityMapper;
import vn.youthmanager.ict.common.db.mapper.QltnMCountryMapper;
import vn.youthmanager.ict.common.db.mapper.QltnMDistrictMapper;
import vn.youthmanager.ict.common.db.mapper.QltnMEducationalMapper;
import vn.youthmanager.ict.common.db.mapper.QltnMGroupsMapper;
import vn.youthmanager.ict.common.db.mapper.QltnMPersonMapper;
import vn.youthmanager.ict.common.db.mapper.QltnMSpecializedMapper;
import vn.youthmanager.ict.common.db.mapper.QltnMStatusMapper;
import vn.youthmanager.ict.common.db.mapper.QltnMTownMapper;
import vn.youthmanager.ict.common.db.mapper.QltnMUniversityMapper;
import vn.youthmanager.ict.common.db.mapper.QltnMWardsMapper;
import vn.youthmanager.ict.youth.db.mapper.Sym0041Mapper;

/**
 * 
 * @author nylf1992
 *
 */
@Component
public class Sym0041Dao {

	@Autowired
	private Sym0041Mapper sym0041Mapper;

	public Sym0041Mapper getSym0041Mapper() {
		return sym0041Mapper;
	}

	@Autowired
	private QltnMCityMapper qltnMCityMapper;

	@Autowired
	private QltnMPersonMapper qltnMPersonMapper;

	@Autowired
	private QltnMCountryMapper qltnMCountryMapper;

	@Autowired
	private QltnMDistrictMapper qltnMDistrictMapper;

	@Autowired
	private QltnMWardsMapper qltnMWardsMapper;

	@Autowired
	private QltnMTownMapper qltnMTownMapper;

	@Autowired
	private QltnMGroupsMapper qltnMGroupsMapper;

	@Autowired
	private QltnMCategoryMapper qltnMCategoryMapper;

	@Autowired
	private QltnMStatusMapper qltnMStatusMapper;

	@Autowired
	private QltnMEducationalMapper qltnMEducationalMapper;

	@Autowired
	private QltnMSpecializedMapper qltnMSpecializedMapper;

	@Autowired
	private QltnMUniversityMapper qltnMUniversityMapper;

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

	public QltnMGroupsMapper getQltnMGroupsMapper() {
		return qltnMGroupsMapper;
	}

	public QltnMCategoryMapper getQltnMCategoryMapper() {
		return qltnMCategoryMapper;
	}

	public QltnMStatusMapper getQltnMStatusMapper() {
		return qltnMStatusMapper;
	}

	public QltnMEducationalMapper getQltnMEducationalMapper() {
		return qltnMEducationalMapper;
	}

	public QltnMSpecializedMapper getQltnMSpecializedMapper() {
		return qltnMSpecializedMapper;
	}

	public QltnMUniversityMapper getQltnMUniversityMapper() {
		return qltnMUniversityMapper;
	}

	public QltnMPersonMapper getQltnMPersonMapper() {
		return qltnMPersonMapper;
	}
}

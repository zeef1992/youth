package vn.youthmanager.ict.youth.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import vn.youthmanager.ict.youth.db.mapper.Sym0023Mapper;

/**
 * 
 * @author nylf1992
 *
 */
@Component
public class Sym0023Dao {

	@Autowired
	private Sym0023Mapper sym0023Mapper;

	public Sym0023Mapper getSym0023Mapper() {
		return sym0023Mapper;
	}
}

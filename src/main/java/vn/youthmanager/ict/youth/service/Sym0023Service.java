package vn.youthmanager.ict.youth.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.ui.Model;

import com.fasterxml.jackson.databind.ObjectMapper;

import vn.youthmanager.ict.common.db.model.QltnMAccessAuthorization;
import vn.youthmanager.ict.youth.dao.Sym0023Dao;
import vn.youthmanager.ict.youth.db.model.Sym0023Result;
@Service
public class Sym0023Service {

	private static Logger logger = Logger.getLogger(Sym0023Service.class);
	ObjectMapper mapper = new ObjectMapper();
    PlatformTransactionManager txManager;
	@Autowired
	private Sym0023Dao sym0023Dao;
	public void init(Model model) {
		List<Sym0023Result> list = new ArrayList<Sym0023Result>();
		HashMap<String, Object> params = new HashMap<String, Object>();
		list = sym0023Dao.getSym0023Mapper().searchData(params);
		if (list.size() > 0) {
			 logger.info("User searching finished");
		} else {
			logger.info("User searching finished");
            logger.info("  ==> 0 item");
		}
		try {
			model.addAttribute("screenList",list);
		} catch (Exception e) {
			model.addAttribute("screenList", "''");
			e.printStackTrace();
		}
		// access Authorization ID
		List<QltnMAccessAuthorization> accessData = new ArrayList<QltnMAccessAuthorization>();
		HashMap<String, Object> params1 = new HashMap<String, Object>();
		accessData = sym0023Dao.getSym0023Mapper().getAccessData(params1);
		if (accessData.size() > 0) {
			 logger.info("User searching finished");
		} else {
			logger.info("User searching finished");
            logger.info("  ==> 0 item");
		}
		try {
			model.addAttribute("accessData", mapper.writeValueAsString(accessData));
		} catch (Exception e) {
			model.addAttribute("accessData", "''");
			e.printStackTrace();
		}
	}
}

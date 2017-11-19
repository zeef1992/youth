package vn.youthmanager.ict.youth.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import vn.youthmanager.ict.common.db.model.QltnMUsers;
import vn.youthmanager.ict.youth.dao.LoginDao;

/**
 * 
 * @author nylf1992
 *
 */
@Service
public class LoginService {
	private static Logger logger = Logger.getLogger(HomeService.class);
	@Autowired
	private LoginDao loginDao;
	
	public List<QltnMUsers> searchdata(String userName, String password) {
		HashMap<String, Object> params = new HashMap<String, Object>();
		// set params for SQL
		params.put("username", userName);
		params.put("password", password);
		// Khởi Tạo 1 Mảng LIST kiểu QltnMUsers.
		List<QltnMUsers> bnn0007ResultList = new ArrayList<QltnMUsers>();
        try {
            logger.info("User searching started");
            // search starts
            bnn0007ResultList = loginDao.getLoginMapper().searchData(params);
        } catch (OutOfMemoryError ex) {
            ex.printStackTrace();
            QltnMUsers tempObj = new QltnMUsers();
            bnn0007ResultList.add(tempObj);
        } catch (Exception ex) {
            ex.printStackTrace();
            bnn0007ResultList = null;
        }
        return bnn0007ResultList;
	}
}

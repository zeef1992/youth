package vn.youthmanager.ict.youth.controller;

import java.util.List;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import vn.youthmanager.ict.common.db.model.QltnMUsers;
import vn.youthmanager.ict.youth.db.model.Sym0003Conditions;
import vn.youthmanager.ict.youth.db.model.Sym0003Result;
import vn.youthmanager.ict.youth.service.Sym0003Service;
/**
 * 
 * @author nylf1992
 *
 */
@Controller
@RequestMapping(value = "/0003")
public class Sym0003Controller {
	
	@Autowired
	private Sym0003Service sym0003Service;
	
	@RequestMapping(value= "/", method = RequestMethod.GET) 
	public String top(Locale locale, Model model) {
		return "youth/0003";
	}

	/**
	 * Get data in QLTN_M_USERS by conditions from Client.
	 * 
	 * @param searchConditions
	 * @return List<Sym0003Result>
	 */
	@RequestMapping(value = "/searchData", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody List<Sym0003Result> searchData(@RequestBody Sym0003Conditions searchConditions) {
        return sym0003Service.searchData(searchConditions);
    }

	/**
	 * Update data in Table QLTN_M_USERS by user Id.
	 *  
	 * @param QltnMUsers's Information
	 * @return Update successfully: 1/delete failed: -1
	 */
	@RequestMapping(value = "/updateData", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody String updateData(@RequestBody QltnMUsers qltnMUsers) {
        return sym0003Service.updateData(qltnMUsers);
    }


	@RequestMapping(value = "/insertData", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody String insertData(@RequestBody QltnMUsers userData) {
        return sym0003Service.insertData(userData);
    }

	@RequestMapping(value = "/deleteData", method = RequestMethod.POST)
    public @ResponseBody String deleteData(@RequestParam(value = "usersId") String usersId) {
        return sym0003Service.deleteData(usersId);
    }

	/**
	 * Get Data In Table QLTN_M_USERS by user Id.
	 * 
	 * @param usersId : data from client.
	 * @return List QltnMUsers.
	 */
	@RequestMapping(value = "/getSingleData", method = RequestMethod.POST)
    public @ResponseBody QltnMUsers getSingleData(@RequestParam(value = "usersId") String usersId) {
        return sym0003Service.getSingleData(usersId);
    }
}

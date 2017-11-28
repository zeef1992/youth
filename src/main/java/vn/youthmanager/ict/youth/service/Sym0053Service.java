package vn.youthmanager.ict.youth.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import vn.youthmanager.ict.youth.dao.Sym0053Dao;
import vn.youthmanager.ict.youth.db.model.Sym0053Result;

@Service
public class Sym0053Service {

	@Autowired
	private Sym0053Dao sym0053Dao;
	ObjectMapper mapper = new ObjectMapper();
	public void initDataNoteReport(Model model, String personId) {
		// create Map
		HashMap<String, Object> params = new HashMap<String, Object>();
		params.put("personId", personId);
		List<Sym0053Result> list0053 = sym0053Dao.getSym0053Mapper().getNoteReport(params);
		try {
			model.addAttribute("listJs0053", mapper.writeValueAsString(list0053));
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		model.addAttribute("list0053", list0053);
	}
}

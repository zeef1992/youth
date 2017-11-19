package vn.youthmanager.ict.youth.db.mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import vn.youthmanager.ict.common.db.model.QltnMProcessPerson;

public interface Sym0043Mapper {

	String getLastIdPerson(Map<String, Object> params);

	String getLastIdNoteReport(Map<String, Object> params);

	String getLastIdProcessPerson(Map<String, Object> params);

	String getLastIdFamilyRelatives(Map<String, Object> params);
	
	ArrayList<QltnMProcessPerson> getProcessEdit(Map<String, Object> params);
}

package vn.youthmanager.ict.youth.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import org.apache.log4j.Logger;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.apache.poi.xwpf.usermodel.XWPFRun;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;
import org.springframework.ui.Model;

import com.fasterxml.jackson.databind.ObjectMapper;

import vn.youthmanager.ict.common.cnst.Constants;
import vn.youthmanager.ict.common.cnst.LoggerMessage;
import vn.youthmanager.ict.common.db.model.QltnMCategory;
import vn.youthmanager.ict.common.db.model.QltnMCategoryExample;
import vn.youthmanager.ict.common.db.model.QltnMCity;
import vn.youthmanager.ict.common.db.model.QltnMCityExample;
import vn.youthmanager.ict.common.db.model.QltnMCountry;
import vn.youthmanager.ict.common.db.model.QltnMCountryExample;
import vn.youthmanager.ict.common.db.model.QltnMDistrict;
import vn.youthmanager.ict.common.db.model.QltnMDistrictExample;
import vn.youthmanager.ict.common.db.model.QltnMEducational;
import vn.youthmanager.ict.common.db.model.QltnMGroups;
import vn.youthmanager.ict.common.db.model.QltnMGroupsExample;
import vn.youthmanager.ict.common.db.model.QltnMSpecialized;
import vn.youthmanager.ict.common.db.model.QltnMSpecializedExample;
import vn.youthmanager.ict.common.db.model.QltnMStatus;
import vn.youthmanager.ict.common.db.model.QltnMStatusExample;
import vn.youthmanager.ict.common.db.model.QltnMTown;
import vn.youthmanager.ict.common.db.model.QltnMTownExample;
import vn.youthmanager.ict.common.db.model.QltnMUniversity;
import vn.youthmanager.ict.common.db.model.QltnMWards;
import vn.youthmanager.ict.common.db.model.QltnMWardsExample;
import vn.youthmanager.ict.common.util.Util;
import vn.youthmanager.ict.youth.dao.Sym0041Dao;
import vn.youthmanager.ict.youth.db.model.Sym0040Contions;
import vn.youthmanager.ict.youth.db.model.Sym0041Result;

@Service
public class Sym0041Service {

	@Autowired
	private Sym0041Dao sym0041Dao;	
	@Autowired
	private Sym0040Service sym0040Service;
	
	private static Logger logger = Logger.getLogger(Sym0003Service.class);
	
	ObjectMapper mapper = new ObjectMapper();
	// Variables definition
	PlatformTransactionManager txManager;
	@Autowired
	private ApplicationContext appContext;

	public void initData(Sym0040Contions sym0040Contions, Model model) {
		// set model Attribute 
		// category Id
		model.addAttribute("cateId", sym0040Contions.getCateId());
		// status Id
		model.addAttribute("statusId", sym0040Contions.getStatusId());
		// person Name
		model.addAttribute("personName", sym0040Contions.getPersonName());
		// identity Card
		model.addAttribute("identityCard", sym0040Contions.getIdentityCard());
		// country Id 
		model.addAttribute("countryId", sym0040Contions.getCountryId());
		// city Id
		model.addAttribute("cityId", sym0040Contions.getCityId());
		// district Id
		model.addAttribute("districtId", sym0040Contions.getDistrictId());
		// wards Id
		model.addAttribute("wardsId", sym0040Contions.getWardsId());
		// town Id 
		model.addAttribute("townId", sym0040Contions.getTownId());
		// groups Id
		model.addAttribute("groupsId", sym0040Contions.getGroupsId());
		// education Id
		model.addAttribute("educationId", sym0040Contions.getEducationId());
		// university Id
		model.addAttribute("universityId", sym0040Contions.getUniversityId());
		// specialized Id
		model.addAttribute("specializedId", sym0040Contions.getSpecializedId());

		// category
		List<QltnMCategory> cateData = new ArrayList<QltnMCategory>();
		try {
			QltnMCategoryExample QltnMCategoryExample = new QltnMCategoryExample();
			QltnMCategoryExample.Criteria countryCriteria = QltnMCategoryExample.createCriteria();
			countryCriteria.andDeleteFlagEqualTo(Constants.DELETE_FLAG_OFF);
			cateData = sym0041Dao.getQltnMCategoryMapper().selectByExample(QltnMCategoryExample);
			model.addAttribute("cateData", mapper.writeValueAsString(cateData));
        } catch (Exception ex) {
            ex.printStackTrace();
            cateData = new ArrayList<QltnMCategory>();
        }
		try {
            model.addAttribute("cateData", mapper.writeValueAsString(cateData));
        } catch (Exception ex) {
        	model.addAttribute("cateData", "");
        }
		// Status 
		List<QltnMStatus> StatusData = new ArrayList<QltnMStatus>();
		try {
			QltnMStatusExample QltnMStatusExample = new QltnMStatusExample();
			QltnMStatusExample.Criteria countryCriteria = QltnMStatusExample.createCriteria();
			countryCriteria.andDeleteFlagEqualTo(Constants.DELETE_FLAG_OFF);
			StatusData = sym0041Dao.getQltnMStatusMapper().selectByExample(QltnMStatusExample);
			model.addAttribute("StatusData", mapper.writeValueAsString(StatusData));
        } catch (Exception ex) {
            ex.printStackTrace();
            StatusData = new ArrayList<QltnMStatus>();
        }
		try {
            model.addAttribute("StatusData", mapper.writeValueAsString(StatusData));
        } catch (Exception ex) {
        	model.addAttribute("StatusData", "");
        }
		// Combobox Country Data
		List<QltnMCountry> countryData = new ArrayList<QltnMCountry>();
		try {
			QltnMCountryExample qltnMCountryExample = new QltnMCountryExample();
			QltnMCountryExample.Criteria countryCriteria = qltnMCountryExample.createCriteria();
			countryCriteria.andDeleteFlagEqualTo(Constants.DELETE_FLAG_OFF);
			countryData = sym0041Dao.getQltnMCountryMapper().selectByExample(qltnMCountryExample);
			model.addAttribute("countryData", mapper.writeValueAsString(countryData));
		} catch (Exception ex) {
			ex.printStackTrace();
			countryData = new ArrayList<QltnMCountry>();
		}
		try {
			model.addAttribute("countryData", mapper.writeValueAsString(countryData));
		} catch (Exception ex) {
			model.addAttribute("countryData", "");
		}
		// University
		List<QltnMUniversity> universityData = new ArrayList<QltnMUniversity>();
		try {
			universityData = sym0041Dao.getQltnMUniversityMapper().selectByExample(null);
			model.addAttribute("universityData", mapper.writeValueAsString(universityData));
        } catch (Exception ex) {
            ex.printStackTrace();
            universityData = new ArrayList<QltnMUniversity>();
        }
		try {
            model.addAttribute("universityData", mapper.writeValueAsString(universityData));
        } catch (Exception ex) {
        	model.addAttribute("universityData", "''");
        }
		// education
		List<QltnMEducational> educationData = new ArrayList<QltnMEducational>();
		try {
			educationData = sym0041Dao.getQltnMEducationalMapper().selectByExample(null);
			model.addAttribute("educationData", mapper.writeValueAsString(educationData));
        } catch (Exception ex) {
            ex.printStackTrace();
            educationData = new ArrayList<QltnMEducational>();
        }
		try {
            model.addAttribute("educationData", mapper.writeValueAsString(educationData));
        } catch (Exception ex) {
        	model.addAttribute("educationData", "''");
        }
	
	}

	/**
	 * searchData 
	 * 
	 * Select data from QLTN_M_PERSON
	 * 
	 * @param searchConditions
	 * @return
	 */
	public List<Sym0041Result> searchData(Sym0040Contions searchConditions) {
		List<Sym0041Result> symList0041 = new ArrayList<Sym0041Result>();
		HashMap<String, Object> params = createSearchConditionParams(searchConditions);
        try {
            logger.info(LoggerMessage.SEARCHING_STRATED);
            // search starts
            symList0041 = sym0041Dao.getSym0041Mapper().searchData(params);
            logger.info(LoggerMessage.EXECUTION_FINISHED);
            if (symList0041.size() > 0) {
                // "real" total from search result
                String searchDataTotalCounts = sym0041Dao.getSym0041Mapper().getSearchDataTotalCounts(params);
                symList0041.get(0).setSearchDataTotalCounts(searchDataTotalCounts);
                // handle city input data
                convertSanitize(symList0041);
                logger.info(LoggerMessage.SEARCHING_FINISHED);
                logger.info("  ==> " + searchDataTotalCounts + " item(s)");
            } else {
                logger.info(LoggerMessage.SEARCHING_FINISHED);
                logger.info(LoggerMessage.ZERO_ITEM);
            }
        } catch (OutOfMemoryError ex) {
            ex.printStackTrace();
            Sym0041Result tempObj = new Sym0041Result();
            tempObj.setSearchDataTotalCounts("-1");
            symList0041.add(tempObj);
        } catch (Exception ex) {
            ex.printStackTrace();
            symList0041 = null;
        }
        return symList0041;
	}

	public String downloadDocxFile(String personId) {
		// Status 
		String returnvalue = "";
		// information of Peson
		List<Sym0041Result> list0041 = new ArrayList<Sym0041Result>();
		try {
			list0041 = sym0040Service.getPersonDetail(personId);
			XWPFDocument document = new XWPFDocument();
		    File tempDocFile = new File(Constants.FILE_PATH +"resources/file/mau-ly-lich.doc");
		    FileOutputStream out = new FileOutputStream(tempDocFile);
		    XWPFParagraph paragraph = document.createParagraph();
		    XWPFRun run = paragraph.createRun();
		    run.setText("testing string ");
		    document.write(out);
		    out.close();
		} catch (Exception ex) {
			ex.printStackTrace();
			list0041 = null;
		}
		return returnvalue;
	}
	/**
	 * exportData 
	 * 
	 * Select data from QLTN_M_PERSON then export excel.
	 * 
	 * @param searchConditions
	 * @return
	 * @throws IOException 
	 */
	public String exportData(Sym0040Contions searchConditions) throws IOException {
		Object[] headerCell = {
				"LLTN_STT",	"KSKQuan_STT", "ID Thanh Niên",	"Tên Thanh Niên", "Ngày Sinh", "Nơi Sinh", "CMND/CCND",	"Nguên Quán", 
				"Dân Tộc", "Tôn Giáo", "Địa Chỉ Thường Trú", "Địa Chỉ Tạm Trú",	"Quốc Tịch", "Thành Phần", "năm thứ mấy", "Công Việc",
				"Nới Làm Việc",	"Create By", "Update By"
		};
		// file_name
		String FILE_NAME = "ExcelExport.xls";
		String SHEET_NAME = "Danh Sach Thanh Niên";
		List<Sym0041Result> symList0041 = new ArrayList<Sym0041Result>();
		HashMap<String, Object> params = createSearchConditionParams(searchConditions);
        try {
            logger.info(LoggerMessage.SEARCHING_STRATED);
            // search starts
            symList0041 = sym0041Dao.getSym0041Mapper().searchData(params);
            logger.info(LoggerMessage.EXECUTION_FINISHED);
            if (symList0041.size() > 0) {
            	FILE_NAME = writeXLSFile(headerCell, symList0041, FILE_NAME, SHEET_NAME);
            } else {
                logger.info(LoggerMessage.SEARCHING_FINISHED);
                logger.info(LoggerMessage.ZERO_ITEM);
            }
        } catch (OutOfMemoryError ex) {
            ex.printStackTrace();
            Sym0041Result tempObj = new Sym0041Result();
            tempObj.setSearchDataTotalCounts("-1");
            symList0041.add(tempObj);
        } catch (Exception ex) {
            ex.printStackTrace();
            symList0041 = null;
        }
        return FILE_NAME;
	}

	public String writeXLSFile(Object[] headerCell, List<Sym0041Result> dataCell , String FILE_NAME, String SHEET_NAME) throws IOException {
		DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
		Date date = new Date();
		String today = dateFormat.format(date).toString().replaceAll("\\/", "").replaceAll(" ", "").replaceAll("\\:", "");
		String excelFileName = Constants.DOWNLOAD_PATH + "/"+ today + FILE_NAME;//name of excel file
		
		String sheetName = SHEET_NAME;//name of sheet

		HSSFWorkbook wb = new HSSFWorkbook();
		HSSFSheet sheet = wb.createSheet(sheetName) ;
		//  prepare Excel work book
		Font headerFont = wb.createFont();
		// set font size
        headerFont.setFontHeightInPoints((short) 12);
        headerFont.setColor(IndexedColors.WHITE.getIndex());
        // set font weight
        headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
        
        CellStyle xlsColumnHeaderStyle = wb.createCellStyle();
        xlsColumnHeaderStyle.setAlignment(CellStyle.ALIGN_CENTER);
        xlsColumnHeaderStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
        xlsColumnHeaderStyle.setFillForegroundColor(IndexedColors.BLUE_GREY.getIndex());
        xlsColumnHeaderStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
        xlsColumnHeaderStyle.setFont(headerFont);
		int rowNum = 0;
		int colNum = 0;
		// create header
		HSSFRow row = sheet.createRow(rowNum++);
		for (Object datatype : headerCell) {
			// create cell
			HSSFCell cell = row.createCell(colNum++);
			// set CSS for cell
			cell.setCellStyle(xlsColumnHeaderStyle);
			if (datatype instanceof String) {
				cell.setCellValue((String) datatype);
			} else if (datatype instanceof Integer) {
				cell.setCellValue((Integer) datatype);
			}
		}
		for (int i = 0; i < dataCell.size(); i++) {
			colNum = 0;
			// create Row
			HSSFRow rowData = sheet.createRow(rowNum++);
			// create cell
			HSSFCell cell = rowData.createCell(colNum++);
			cell.setCellValue((String) dataCell.get(i).getLltnStt());
			cell = rowData.createCell(colNum++);
			cell.setCellValue((String) dataCell.get(i).getKskquanStt());
			cell = rowData.createCell(colNum++);
			cell.setCellValue((String) dataCell.get(i).getPersonId());
			cell = rowData.createCell(colNum++);
			cell.setCellValue((String) dataCell.get(i).getPersonName());
			cell = rowData.createCell(colNum++);
			cell.setCellValue((String) dataCell.get(i).getDateOfBirth() + "/"
					+ (String) dataCell.get(i).getMonthOfBirth() + "/" + (String) dataCell.get(i).getYearOfBirth());
			cell = rowData.createCell(colNum++);
			cell.setCellValue((String) dataCell.get(i).getPlaceOfBirth());
			cell = rowData.createCell(colNum++);
			cell.setCellValue((String) dataCell.get(i).getIdentityCard());
			cell = rowData.createCell(colNum++);
			cell.setCellValue((String) dataCell.get(i).getNation());
			cell = rowData.createCell(colNum++);
			cell.setCellValue((String) dataCell.get(i).getReligion());
			cell = rowData.createCell(colNum++);
			cell.setCellValue((String) dataCell.get(i).getLltnStt());
			cell = rowData.createCell(colNum++);
			cell.setCellValue((String) dataCell.get(i).getPermanentAddress());
			cell = rowData.createCell(colNum++);
			cell.setCellValue((String) dataCell.get(i).getTemporaryResidenceAddress());
			cell = rowData.createCell(colNum++);
			cell.setCellValue((String) dataCell.get(i).getCountryName());
			cell = rowData.createCell(colNum++);
			cell.setCellValue((String) dataCell.get(i).getElement());
			cell = rowData.createCell(colNum++);
			cell.setCellValue((String) dataCell.get(i).getGraduationYear());
			cell = rowData.createCell(colNum++);
			cell.setCellValue((String) dataCell.get(i).getJobId());
			cell = rowData.createCell(colNum++);
			cell.setCellValue((String) dataCell.get(i).getWorkPlace());
			cell = rowData.createCell(colNum++);
			cell.setCellValue((String) dataCell.get(i).getLltnStt());
			cell = rowData.createCell(colNum++);
			cell.setCellValue((String) dataCell.get(i).getLltnStt());
		}
		FileOutputStream fileOut = new FileOutputStream(excelFileName);
		
		//write this workbook to an Outputstream.
		wb.write(fileOut);
		fileOut.flush();
		fileOut.close();
		return today + FILE_NAME;
	}
	/**
     * Create search conditions parameters from data received from client
     * 
     * @param searchConditions : data received from client
     * @return HashMap object
     */
    private HashMap<String, Object> createSearchConditionParams(Sym0040Contions searchConditions) {
        HashMap<String, Object> params = new HashMap<String, Object>();
        // cate Id 
        params.put("cateId", searchConditions.getCateId());
        // status Id 
        params.put("statusId", searchConditions.getStatusId());
        // person Name
        params.put("personName", searchConditions.getPersonName().equals("") ? "" : "%" + searchConditions.getPersonName() + "%");
        // wards Code
        params.put("identityCard", searchConditions.getIdentityCard().equals("") ? "" : "%" + searchConditions.getIdentityCard() + "%");
        // country Id
        params.put("countryId", searchConditions.getCountryId());
        // city Id
        params.put("cityId", searchConditions.getCityId());
        // district Id
        params.put("districtId", searchConditions.getDistrictId());
        // wards Id
        params.put("wardsId", searchConditions.getWardsId());
        // town Id
        params.put("townId", searchConditions.getTownId());
        // groups Id 
        params.put("groupsId", searchConditions.getGroupsId());
        // education Id 
        params.put("educationId", searchConditions.getEducationId());
        // university Id 
        params.put("universityId", searchConditions.getUniversityId());
    	// specialized Id 
        params.put("specializedId", searchConditions.getSpecializedId());
        // From parameter
        params.put("fromRow", Integer.valueOf(searchConditions.getFromRow()));
        // Number of items in a page
        params.put("itemCount", Integer.valueOf(searchConditions.getItemCount()));

        return params;
    }

    /**
     * Handle city input data
     * 
     * @param inputData : search result data list
     */
    private void convertSanitize(List<Sym0041Result> inputData) {
        for (int i = 0; i < inputData.size(); i++) {
        	Sym0041Result currentData = inputData.get(i);
        	// country Name
        	currentData.setCountryName(Util.convertSanitize(currentData.getCountryName()));
        	// city Name
        	currentData.setCityName(Util.convertSanitize(currentData.getCityName()));
        	// District Name
        	currentData.setDistrictName(Util.convertSanitize(currentData.getDistrictName()));
        	// wards Name
        	currentData.setWardsName(Util.convertSanitize(currentData.getWardsName()));
        	// town Name
        	currentData.setTownName(Util.convertSanitize(currentData.getTownName()));
        	// groups Name
        	currentData.setGroupsName(Util.convertSanitize(currentData.getGroupsName()));
            // category Name
            currentData.setCateName(Util.convertSanitize(currentData.getCateName()));
            // status Name
            currentData.setStatusName(Util.convertSanitize(currentData.getStatusName()));
            // person Name
            currentData.setPersonName(Util.convertSanitize(currentData.getPersonName()));
			// level
			currentData.setLevel(Util.convertSanitize(currentData.getLevel()));
			// University Name
			currentData.setUniversityName(Util.convertSanitize(currentData.getUniversityName()));
			// specialized Name
			currentData.setSpecializedName(Util.convertSanitize(currentData.getSpecializedName()));
        }
    }


	public List<QltnMCity> getCityNameByCountryId(String countryId) {
		// Combobox City Data
		List<QltnMCity> cityData = new ArrayList<QltnMCity>();
		QltnMCityExample qltnMCityExample = new QltnMCityExample();
		QltnMCityExample.Criteria  cityCriteria = qltnMCityExample.createCriteria();
		cityCriteria.andCountryIdEqualTo(countryId);
	
		cityCriteria.andDeleteFlagEqualTo(Constants.DELETE_FLAG_OFF);
		cityData = sym0041Dao.getQltnMCityMapper().selectByExample(qltnMCityExample);
		return cityData;
	}

	public List<QltnMSpecialized> getSpecializedDataByUniversityId(String universityId) {
		// Combobox City Data
		List<QltnMSpecialized> specializedData = new ArrayList<QltnMSpecialized>();
		QltnMSpecializedExample qltnMSpecializedExample = new QltnMSpecializedExample();
		QltnMSpecializedExample.Criteria  specializedCriteria = qltnMSpecializedExample.createCriteria();
		specializedCriteria.andUniversityIdEqualTo(universityId);
	
		specializedCriteria.andDeleteFlagEqualTo(Constants.DELETE_FLAG_OFF);
		specializedData = sym0041Dao.getQltnMSpecializedMapper().selectByExample(qltnMSpecializedExample);
		return specializedData;
	}

	public List<QltnMDistrict> getDistrictNameByCityId(String countryId, String cityId) {
		// Combobox City Data
		List<QltnMDistrict> districtData = new ArrayList<QltnMDistrict>();
		QltnMDistrictExample qltnMDistrictExample = new QltnMDistrictExample();
		QltnMDistrictExample.Criteria  districtCriteria = qltnMDistrictExample.createCriteria();
		districtCriteria.andCountryIdEqualTo(countryId);
		districtCriteria.andCityIdEqualTo(cityId);
		districtCriteria.andDeleteFlagEqualTo(Constants.DELETE_FLAG_OFF);
		districtData = sym0041Dao.getQltnMDistrictMapper().selectByExample(qltnMDistrictExample);
		return districtData;
	}

	public List<QltnMWards> getWardsNameByDistrictId(String countryId, String cityId, String districtId) {
		// Combobox wards Data
		List<QltnMWards> wardsData = new ArrayList<QltnMWards>();
		QltnMWardsExample qltnMWardsExample = new QltnMWardsExample();
		QltnMWardsExample.Criteria  wardsCriteria = qltnMWardsExample.createCriteria();
		wardsCriteria.andCountryIdEqualTo(countryId);
		wardsCriteria.andCityIdEqualTo(cityId);
		wardsCriteria.andDistrictIdEqualTo(districtId);
		wardsCriteria.andDeleteFlagEqualTo(Constants.DELETE_FLAG_OFF);
		wardsData = sym0041Dao.getQltnMWardsMapper().selectByExample(qltnMWardsExample);
		return wardsData;
	}

	public List<QltnMTown> getTownNameByWardsId(String countryId, String cityId, String districtId, String wardsId) {
		// Combobox Town Data
		List<QltnMTown> townData = new ArrayList<QltnMTown>();
		QltnMTownExample qltnMTownExample = new QltnMTownExample();
		QltnMTownExample.Criteria  townCriteria = qltnMTownExample.createCriteria();
		townCriteria.andCountryIdEqualTo(countryId);
		townCriteria.andCityIdEqualTo(cityId);
		townCriteria.andDistrictIdEqualTo(districtId);
		townCriteria.andWardsIdEqualTo(wardsId);
		townCriteria.andDeleteFlagEqualTo(Constants.DELETE_FLAG_OFF);
		townData = sym0041Dao.getQltnMTownMapper().selectByExample(qltnMTownExample);
		return townData;
	}

	public List<QltnMGroups> getGroupsDataByTownId(String countryId, String cityId, String districtId, String wardsId, String townId) {
		// Combobox Groups Data
		List<QltnMGroups> townData = new ArrayList<QltnMGroups>();
		QltnMGroupsExample qltnMGroupsExample = new QltnMGroupsExample();
		QltnMGroupsExample.Criteria  groupsCriteria = qltnMGroupsExample.createCriteria();
		groupsCriteria.andCountryIdEqualTo(countryId);
		groupsCriteria.andCityIdEqualTo(cityId);
		groupsCriteria.andDistrictIdEqualTo(districtId);
		groupsCriteria.andWardsIdEqualTo(wardsId);
		groupsCriteria.andTownIdEqualTo(townId);
		groupsCriteria.andDeleteFlagEqualTo(Constants.DELETE_FLAG_OFF);
		townData = sym0041Dao.getQltnMGroupsMapper().selectByExample(qltnMGroupsExample);
		return townData;
	}



	/**
     * Delete report from DB
     * 
     * @param usersId : user's id to delete
     * @return String : delete successfully: 1/delete failed: -1
     */
    public String deleteData(String personId) {
    	// variable definition
        String returnValue = Constants.DELETE_RESULT_SUCCESSFUL;
        // delete starts
        try {
        	// transaction starts
            DefaultTransactionDefinition def = new DefaultTransactionDefinition();
            def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
            txManager = (PlatformTransactionManager) appContext.getBean("transactionManager");
            TransactionStatus status = txManager.getTransaction(def);
            try {
                int result = sym0041Dao.getQltnMPersonMapper().deleteByPrimaryKey(personId);
                if (result > 0) { // delete record in QLTN_M_PERSON successfully
                    // register to DB
                    txManager.commit(status);
                } else {
                    returnValue = Constants.DELETE_RESULT_FAILED;
                    txManager.rollback(status);
                }
            } catch (Exception ex) {
                ex.printStackTrace();
                logger.error("Error message: " + ex.getMessage());
                returnValue = Constants.DELETE_RESULT_FAILED;
                txManager.rollback(status);
            } 
        } catch (Exception ex) {
            ex.printStackTrace();
            logger.error("Error message: " + ex.getMessage());
            returnValue = Constants.DELETE_RESULT_FAILED;
        }
        return returnValue;
	}
}

package vn.youthmanager.ict.youth.service;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import org.apache.log4j.Logger;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import vn.youthmanager.ict.common.db.model.QltnMUsers;
import vn.youthmanager.ict.youth.dao.HomeDao;

@Service
public class HomeService {

	 private static final String FILE_NAME = "D:/MyFirstExcel";
	private static Logger logger = Logger.getLogger(HomeService.class);

	@Autowired
	private HomeDao homeDao;
	public List<QltnMUsers> searchdata() {
		HashMap<String, Object> params = new HashMap<String, Object>();
		List<QltnMUsers> bnn0007ResultList = new ArrayList<QltnMUsers>();
        try {
            logger.info("area searching started");
            // search starts
            bnn0007ResultList = homeDao.getHomeMapper().searchData(params);
            System.out.println("1212");
            System.out.println("1212");
            System.out.println("1212");
            logger.info("SQL execution finished");
            XSSFWorkbook workbook = new XSSFWorkbook();
            XSSFSheet sheet = workbook.createSheet("Datatypes in Java");
           /* Object[][] datatypes = {
                    {"Datatype", "Type", "Size(in bytes)"},
                    {"int", "Primitive", 2},
                    {"float", "Primitive", 4},
                    {"double", "Primitive", 8},
                    {"char", "Primitive", 1},
                    {"String", "Non-Primitive", "No fixed size"}
            };
            
            
            int rowNum = 0;*/
            QltnMUsers record = null;
            int colIndex = 0;
            
            System.out.println("Creating excel");
            for (int i = 0; i < bnn0007ResultList.size(); i++ ) {
            	record = bnn0007ResultList.get(i);
            	 // Reset the column index
                colIndex = 0;
                if (i == 0) {
                	Row row = sheet.createRow(i);
                	Cell cell = row.createCell(colIndex++);
                	cell.setCellValue("USERS_NAME");
                	cell = row.createCell(colIndex++);
                	cell.setCellValue("PASSWORD");
                	colIndex = 0;
                }
                
                Row row = sheet.createRow(i+1);
                Cell cell = row.createCell(colIndex++);
                cell.setCellValue(record.getUsersName());
                cell = row.createCell(colIndex++);
                cell.setCellValue(record.getPassword());
            }/*
            for (Object[] datatype : datatypes) {
                Row row = sheet.createRow(rowNum++);
                int colNum = 0;
                for (Object field : datatype) {
                    Cell cell = row.createCell(colNum++);
                    if (field instanceof String) {
                        cell.setCellValue((String) field);
                    } else if (field instanceof Integer) {
                        cell.setCellValue((Integer) field);
                    }
                }
            }*/
            Date date = new Date();
            try {
                FileOutputStream outputStream = new FileOutputStream( FILE_NAME + date.getTime() +".xlsx" );
                workbook.write(outputStream);
                workbook.cloneSheet(0);
            } catch (FileNotFoundException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }

            System.out.println("Done");
           
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

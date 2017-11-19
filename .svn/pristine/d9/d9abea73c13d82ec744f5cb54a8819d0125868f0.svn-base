package vn.youthmanager.ict.common.util;

import java.io.File;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import vn.youthmanager.ict.common.component.XmlConfig;



/**
 * Define all functions for read file xml
 * 
 * @author HiepTL
 *
 */
public class XmlConfigFunction {
	/** global object {XmlConfig} */
	private static XmlConfig xmlConfig;
	private static String filePath;

	public static String getFilePath() {
		return filePath;
	}

	public static void setFilePath(String filePathTmp) {
		filePath = filePathTmp;
	}

	/**
	 * Initialize XmlConfig object
	 */
	public static void initXmlConfig() {
		try {
			File xmlFile = new File(getFilePath());
			// Check the time the file was last modified
			if (xmlConfig != null && xmlFile.lastModified() == xmlConfig.getLastModified()) {
				return;
			}
			xmlConfig = new XmlConfig();
			xmlConfig.setLastModified(xmlFile.lastModified());
			DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
			DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
			Document doc = dBuilder.parse(xmlFile);
			doc.getDocumentElement().normalize();

			// Return new NodeList object containing all the matched xmlConfig tag.
			NodeList nodes = doc.getElementsByTagName("xmlConfig");
			for (int i = 0; i < nodes.getLength(); i++) {
				Node node = nodes.item(i);
				if (node.getNodeType() == Node.ELEMENT_NODE) {
					Element element = (Element) node;
					xmlConfig.setLinePerBlock(getValue("line_per_block", element));
					xmlConfig.setColPerBlock(getValue("col_per_block", element));
				}
			}

			// Return new NodeList object containing all the matched logMessage tag.
			nodes = doc.getElementsByTagName("logMessage");
			for (int i = 0; i < nodes.getLength(); i++) {
				Node node = nodes.item(i);
				if (node.getNodeType() == Node.ELEMENT_NODE) {
					Element element = (Element) node;
					xmlConfig.setDbAccess(getValue("db_access", element));
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	private static String getValue(String tag, Element element) {
		NodeList nodes = element.getElementsByTagName(tag).item(0).getChildNodes();
		Node node = (Node) nodes.item(0);
		return node.getNodeValue();
	}

	public static int getLinePerBlock() {
		initXmlConfig();
		return Integer.parseInt(xmlConfig.getLinePerBlock());
	}

	public static int getColPerBlock() {
		initXmlConfig();
		return Integer.parseInt(xmlConfig.getColPerBlock());
	}

	public String getDbAccess() {
		initXmlConfig();
		return xmlConfig.getDbAccess();
	}
}
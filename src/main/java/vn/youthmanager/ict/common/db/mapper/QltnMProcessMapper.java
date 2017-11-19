package vn.youthmanager.ict.common.db.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Param;
import vn.youthmanager.ict.common.db.model.QltnMProcess;
import vn.youthmanager.ict.common.db.model.QltnMProcessExample;

public interface QltnMProcessMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table qltn_m_process
     *
     * @mbggenerated Mon May 22 20:44:31 ICT 2017
     */
    int countByExample(QltnMProcessExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table qltn_m_process
     *
     * @mbggenerated Mon May 22 20:44:31 ICT 2017
     */
    int deleteByExample(QltnMProcessExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table qltn_m_process
     *
     * @mbggenerated Mon May 22 20:44:31 ICT 2017
     */
    int deleteByPrimaryKey(String processId);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table qltn_m_process
     *
     * @mbggenerated Mon May 22 20:44:31 ICT 2017
     */
    int insert(QltnMProcess record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table qltn_m_process
     *
     * @mbggenerated Mon May 22 20:44:31 ICT 2017
     */
    int insertSelective(QltnMProcess record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table qltn_m_process
     *
     * @mbggenerated Mon May 22 20:44:31 ICT 2017
     */
    List<QltnMProcess> selectByExample(QltnMProcessExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table qltn_m_process
     *
     * @mbggenerated Mon May 22 20:44:31 ICT 2017
     */
    QltnMProcess selectByPrimaryKey(String processId);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table qltn_m_process
     *
     * @mbggenerated Mon May 22 20:44:31 ICT 2017
     */
    int updateByExampleSelective(@Param("record") QltnMProcess record, @Param("example") QltnMProcessExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table qltn_m_process
     *
     * @mbggenerated Mon May 22 20:44:31 ICT 2017
     */
    int updateByExample(@Param("record") QltnMProcess record, @Param("example") QltnMProcessExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table qltn_m_process
     *
     * @mbggenerated Mon May 22 20:44:31 ICT 2017
     */
    int updateByPrimaryKeySelective(QltnMProcess record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table qltn_m_process
     *
     * @mbggenerated Mon May 22 20:44:31 ICT 2017
     */
    int updateByPrimaryKey(QltnMProcess record);
}
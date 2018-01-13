package vn.youthmanager.ict.common.db.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class QltnMUniversityExample {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table qltn_m_university
     *
     * @mbggenerated Sat Apr 08 18:31:52 ICT 2017
     */
    protected String orderByClause;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table qltn_m_university
     *
     * @mbggenerated Sat Apr 08 18:31:52 ICT 2017
     */
    protected boolean distinct;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table qltn_m_university
     *
     * @mbggenerated Sat Apr 08 18:31:52 ICT 2017
     */
    protected List<Criteria> oredCriteria;

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table qltn_m_university
     *
     * @mbggenerated Sat Apr 08 18:31:52 ICT 2017
     */
    public QltnMUniversityExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table qltn_m_university
     *
     * @mbggenerated Sat Apr 08 18:31:52 ICT 2017
     */
    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table qltn_m_university
     *
     * @mbggenerated Sat Apr 08 18:31:52 ICT 2017
     */
    public String getOrderByClause() {
        return orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table qltn_m_university
     *
     * @mbggenerated Sat Apr 08 18:31:52 ICT 2017
     */
    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table qltn_m_university
     *
     * @mbggenerated Sat Apr 08 18:31:52 ICT 2017
     */
    public boolean isDistinct() {
        return distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table qltn_m_university
     *
     * @mbggenerated Sat Apr 08 18:31:52 ICT 2017
     */
    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table qltn_m_university
     *
     * @mbggenerated Sat Apr 08 18:31:52 ICT 2017
     */
    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table qltn_m_university
     *
     * @mbggenerated Sat Apr 08 18:31:52 ICT 2017
     */
    public Criteria or() {
        Criteria criteria = createCriteriaInternal();
        oredCriteria.add(criteria);
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table qltn_m_university
     *
     * @mbggenerated Sat Apr 08 18:31:52 ICT 2017
     */
    public Criteria createCriteria() {
        Criteria criteria = createCriteriaInternal();
        if (oredCriteria.size() == 0) {
            oredCriteria.add(criteria);
        }
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table qltn_m_university
     *
     * @mbggenerated Sat Apr 08 18:31:52 ICT 2017
     */
    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table qltn_m_university
     *
     * @mbggenerated Sat Apr 08 18:31:52 ICT 2017
     */
    public void clear() {
        oredCriteria.clear();
        orderByClause = null;
        distinct = false;
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table qltn_m_university
     *
     * @mbggenerated Sat Apr 08 18:31:52 ICT 2017
     */
    protected abstract static class GeneratedCriteria {
        protected List<Criterion> criteria;

        protected GeneratedCriteria() {
            super();
            criteria = new ArrayList<Criterion>();
        }

        public boolean isValid() {
            return criteria.size() > 0;
        }

        public List<Criterion> getAllCriteria() {
            return criteria;
        }

        public List<Criterion> getCriteria() {
            return criteria;
        }

        protected void addCriterion(String condition) {
            if (condition == null) {
                throw new RuntimeException("Value for condition cannot be null");
            }
            criteria.add(new Criterion(condition));
        }

        protected void addCriterion(String condition, Object value, String property) {
            if (value == null) {
                throw new RuntimeException("Value for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value));
        }

        protected void addCriterion(String condition, Object value1, Object value2, String property) {
            if (value1 == null || value2 == null) {
                throw new RuntimeException("Between values for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value1, value2));
        }

        public Criteria andUniversityIdIsNull() {
            addCriterion("UNIVERSITY_ID is null");
            return (Criteria) this;
        }

        public Criteria andUniversityIdIsNotNull() {
            addCriterion("UNIVERSITY_ID is not null");
            return (Criteria) this;
        }

        public Criteria andEducationIdEqualTo(String value) {
            addCriterion("EDUCATION_ID =", value, "educationId");
            return (Criteria) this;
        }

        public Criteria andUniversityIdEqualTo(String value) {
            addCriterion("UNIVERSITY_ID =", value, "universityId");
            return (Criteria) this;
        }

        public Criteria andUniversityIdNotEqualTo(String value) {
            addCriterion("UNIVERSITY_ID <>", value, "universityId");
            return (Criteria) this;
        }

        public Criteria andUniversityIdGreaterThan(String value) {
            addCriterion("UNIVERSITY_ID >", value, "universityId");
            return (Criteria) this;
        }

        public Criteria andUniversityIdGreaterThanOrEqualTo(String value) {
            addCriterion("UNIVERSITY_ID >=", value, "universityId");
            return (Criteria) this;
        }

        public Criteria andUniversityIdLessThan(String value) {
            addCriterion("UNIVERSITY_ID <", value, "universityId");
            return (Criteria) this;
        }

        public Criteria andUniversityIdLessThanOrEqualTo(String value) {
            addCriterion("UNIVERSITY_ID <=", value, "universityId");
            return (Criteria) this;
        }

        public Criteria andUniversityIdLike(String value) {
            addCriterion("UNIVERSITY_ID like", value, "universityId");
            return (Criteria) this;
        }

        public Criteria andUniversityIdNotLike(String value) {
            addCriterion("UNIVERSITY_ID not like", value, "universityId");
            return (Criteria) this;
        }

        public Criteria andUniversityIdIn(List<String> values) {
            addCriterion("UNIVERSITY_ID in", values, "universityId");
            return (Criteria) this;
        }

        public Criteria andUniversityIdNotIn(List<String> values) {
            addCriterion("UNIVERSITY_ID not in", values, "universityId");
            return (Criteria) this;
        }

        public Criteria andUniversityIdBetween(String value1, String value2) {
            addCriterion("UNIVERSITY_ID between", value1, value2, "universityId");
            return (Criteria) this;
        }

        public Criteria andUniversityIdNotBetween(String value1, String value2) {
            addCriterion("UNIVERSITY_ID not between", value1, value2, "universityId");
            return (Criteria) this;
        }

        public Criteria andUniversityCodeIsNull() {
            addCriterion("UNIVERSITY_CODE is null");
            return (Criteria) this;
        }

        public Criteria andUniversityCodeIsNotNull() {
            addCriterion("UNIVERSITY_CODE is not null");
            return (Criteria) this;
        }

        public Criteria andUniversityCodeEqualTo(String value) {
            addCriterion("UNIVERSITY_CODE =", value, "universityCode");
            return (Criteria) this;
        }

        public Criteria andUniversityCodeNotEqualTo(String value) {
            addCriterion("UNIVERSITY_CODE <>", value, "universityCode");
            return (Criteria) this;
        }

        public Criteria andUniversityCodeGreaterThan(String value) {
            addCriterion("UNIVERSITY_CODE >", value, "universityCode");
            return (Criteria) this;
        }

        public Criteria andUniversityCodeGreaterThanOrEqualTo(String value) {
            addCriterion("UNIVERSITY_CODE >=", value, "universityCode");
            return (Criteria) this;
        }

        public Criteria andUniversityCodeLessThan(String value) {
            addCriterion("UNIVERSITY_CODE <", value, "universityCode");
            return (Criteria) this;
        }

        public Criteria andUniversityCodeLessThanOrEqualTo(String value) {
            addCriterion("UNIVERSITY_CODE <=", value, "universityCode");
            return (Criteria) this;
        }

        public Criteria andUniversityCodeLike(String value) {
            addCriterion("UNIVERSITY_CODE like", value, "universityCode");
            return (Criteria) this;
        }

        public Criteria andUniversityCodeNotLike(String value) {
            addCriterion("UNIVERSITY_CODE not like", value, "universityCode");
            return (Criteria) this;
        }

        public Criteria andUniversityCodeIn(List<String> values) {
            addCriterion("UNIVERSITY_CODE in", values, "universityCode");
            return (Criteria) this;
        }

        public Criteria andUniversityCodeNotIn(List<String> values) {
            addCriterion("UNIVERSITY_CODE not in", values, "universityCode");
            return (Criteria) this;
        }

        public Criteria andUniversityCodeBetween(String value1, String value2) {
            addCriterion("UNIVERSITY_CODE between", value1, value2, "universityCode");
            return (Criteria) this;
        }

        public Criteria andUniversityCodeNotBetween(String value1, String value2) {
            addCriterion("UNIVERSITY_CODE not between", value1, value2, "universityCode");
            return (Criteria) this;
        }

        public Criteria andUniversityNameIsNull() {
            addCriterion("UNIVERSITY_NAME is null");
            return (Criteria) this;
        }

        public Criteria andUniversityNameIsNotNull() {
            addCriterion("UNIVERSITY_NAME is not null");
            return (Criteria) this;
        }

        public Criteria andUniversityNameEqualTo(String value) {
            addCriterion("UNIVERSITY_NAME =", value, "universityName");
            return (Criteria) this;
        }

        public Criteria andUniversityNameNotEqualTo(String value) {
            addCriterion("UNIVERSITY_NAME <>", value, "universityName");
            return (Criteria) this;
        }

        public Criteria andUniversityNameGreaterThan(String value) {
            addCriterion("UNIVERSITY_NAME >", value, "universityName");
            return (Criteria) this;
        }

        public Criteria andUniversityNameGreaterThanOrEqualTo(String value) {
            addCriterion("UNIVERSITY_NAME >=", value, "universityName");
            return (Criteria) this;
        }

        public Criteria andUniversityNameLessThan(String value) {
            addCriterion("UNIVERSITY_NAME <", value, "universityName");
            return (Criteria) this;
        }

        public Criteria andUniversityNameLessThanOrEqualTo(String value) {
            addCriterion("UNIVERSITY_NAME <=", value, "universityName");
            return (Criteria) this;
        }

        public Criteria andUniversityNameLike(String value) {
            addCriterion("UNIVERSITY_NAME like", value, "universityName");
            return (Criteria) this;
        }

        public Criteria andUniversityNameNotLike(String value) {
            addCriterion("UNIVERSITY_NAME not like", value, "universityName");
            return (Criteria) this;
        }

        public Criteria andUniversityNameIn(List<String> values) {
            addCriterion("UNIVERSITY_NAME in", values, "universityName");
            return (Criteria) this;
        }

        public Criteria andUniversityNameNotIn(List<String> values) {
            addCriterion("UNIVERSITY_NAME not in", values, "universityName");
            return (Criteria) this;
        }

        public Criteria andUniversityNameBetween(String value1, String value2) {
            addCriterion("UNIVERSITY_NAME between", value1, value2, "universityName");
            return (Criteria) this;
        }

        public Criteria andUniversityNameNotBetween(String value1, String value2) {
            addCriterion("UNIVERSITY_NAME not between", value1, value2, "universityName");
            return (Criteria) this;
        }

        public Criteria andCreateUserIdIsNull() {
            addCriterion("CREATE_USER_ID is null");
            return (Criteria) this;
        }

        public Criteria andCreateUserIdIsNotNull() {
            addCriterion("CREATE_USER_ID is not null");
            return (Criteria) this;
        }

        public Criteria andCreateUserIdEqualTo(String value) {
            addCriterion("CREATE_USER_ID =", value, "createUserId");
            return (Criteria) this;
        }

        public Criteria andCreateUserIdNotEqualTo(String value) {
            addCriterion("CREATE_USER_ID <>", value, "createUserId");
            return (Criteria) this;
        }

        public Criteria andCreateUserIdGreaterThan(String value) {
            addCriterion("CREATE_USER_ID >", value, "createUserId");
            return (Criteria) this;
        }

        public Criteria andCreateUserIdGreaterThanOrEqualTo(String value) {
            addCriterion("CREATE_USER_ID >=", value, "createUserId");
            return (Criteria) this;
        }

        public Criteria andCreateUserIdLessThan(String value) {
            addCriterion("CREATE_USER_ID <", value, "createUserId");
            return (Criteria) this;
        }

        public Criteria andCreateUserIdLessThanOrEqualTo(String value) {
            addCriterion("CREATE_USER_ID <=", value, "createUserId");
            return (Criteria) this;
        }

        public Criteria andCreateUserIdLike(String value) {
            addCriterion("CREATE_USER_ID like", value, "createUserId");
            return (Criteria) this;
        }

        public Criteria andCreateUserIdNotLike(String value) {
            addCriterion("CREATE_USER_ID not like", value, "createUserId");
            return (Criteria) this;
        }

        public Criteria andCreateUserIdIn(List<String> values) {
            addCriterion("CREATE_USER_ID in", values, "createUserId");
            return (Criteria) this;
        }

        public Criteria andCreateUserIdNotIn(List<String> values) {
            addCriterion("CREATE_USER_ID not in", values, "createUserId");
            return (Criteria) this;
        }

        public Criteria andCreateUserIdBetween(String value1, String value2) {
            addCriterion("CREATE_USER_ID between", value1, value2, "createUserId");
            return (Criteria) this;
        }

        public Criteria andCreateUserIdNotBetween(String value1, String value2) {
            addCriterion("CREATE_USER_ID not between", value1, value2, "createUserId");
            return (Criteria) this;
        }

        public Criteria andCreateDateIsNull() {
            addCriterion("CREATE_DATE is null");
            return (Criteria) this;
        }

        public Criteria andCreateDateIsNotNull() {
            addCriterion("CREATE_DATE is not null");
            return (Criteria) this;
        }

        public Criteria andCreateDateEqualTo(Date value) {
            addCriterion("CREATE_DATE =", value, "createDate");
            return (Criteria) this;
        }

        public Criteria andCreateDateNotEqualTo(Date value) {
            addCriterion("CREATE_DATE <>", value, "createDate");
            return (Criteria) this;
        }

        public Criteria andCreateDateGreaterThan(Date value) {
            addCriterion("CREATE_DATE >", value, "createDate");
            return (Criteria) this;
        }

        public Criteria andCreateDateGreaterThanOrEqualTo(Date value) {
            addCriterion("CREATE_DATE >=", value, "createDate");
            return (Criteria) this;
        }

        public Criteria andCreateDateLessThan(Date value) {
            addCriterion("CREATE_DATE <", value, "createDate");
            return (Criteria) this;
        }

        public Criteria andCreateDateLessThanOrEqualTo(Date value) {
            addCriterion("CREATE_DATE <=", value, "createDate");
            return (Criteria) this;
        }

        public Criteria andCreateDateIn(List<Date> values) {
            addCriterion("CREATE_DATE in", values, "createDate");
            return (Criteria) this;
        }

        public Criteria andCreateDateNotIn(List<Date> values) {
            addCriterion("CREATE_DATE not in", values, "createDate");
            return (Criteria) this;
        }

        public Criteria andCreateDateBetween(Date value1, Date value2) {
            addCriterion("CREATE_DATE between", value1, value2, "createDate");
            return (Criteria) this;
        }

        public Criteria andCreateDateNotBetween(Date value1, Date value2) {
            addCriterion("CREATE_DATE not between", value1, value2, "createDate");
            return (Criteria) this;
        }

        public Criteria andUpdateUserIdIsNull() {
            addCriterion("UPDATE_USER_ID is null");
            return (Criteria) this;
        }

        public Criteria andUpdateUserIdIsNotNull() {
            addCriterion("UPDATE_USER_ID is not null");
            return (Criteria) this;
        }

        public Criteria andUpdateUserIdEqualTo(String value) {
            addCriterion("UPDATE_USER_ID =", value, "updateUserId");
            return (Criteria) this;
        }

        public Criteria andUpdateUserIdNotEqualTo(String value) {
            addCriterion("UPDATE_USER_ID <>", value, "updateUserId");
            return (Criteria) this;
        }

        public Criteria andUpdateUserIdGreaterThan(String value) {
            addCriterion("UPDATE_USER_ID >", value, "updateUserId");
            return (Criteria) this;
        }

        public Criteria andUpdateUserIdGreaterThanOrEqualTo(String value) {
            addCriterion("UPDATE_USER_ID >=", value, "updateUserId");
            return (Criteria) this;
        }

        public Criteria andUpdateUserIdLessThan(String value) {
            addCriterion("UPDATE_USER_ID <", value, "updateUserId");
            return (Criteria) this;
        }

        public Criteria andUpdateUserIdLessThanOrEqualTo(String value) {
            addCriterion("UPDATE_USER_ID <=", value, "updateUserId");
            return (Criteria) this;
        }

        public Criteria andUpdateUserIdLike(String value) {
            addCriterion("UPDATE_USER_ID like", value, "updateUserId");
            return (Criteria) this;
        }

        public Criteria andUpdateUserIdNotLike(String value) {
            addCriterion("UPDATE_USER_ID not like", value, "updateUserId");
            return (Criteria) this;
        }

        public Criteria andUpdateUserIdIn(List<String> values) {
            addCriterion("UPDATE_USER_ID in", values, "updateUserId");
            return (Criteria) this;
        }

        public Criteria andUpdateUserIdNotIn(List<String> values) {
            addCriterion("UPDATE_USER_ID not in", values, "updateUserId");
            return (Criteria) this;
        }

        public Criteria andUpdateUserIdBetween(String value1, String value2) {
            addCriterion("UPDATE_USER_ID between", value1, value2, "updateUserId");
            return (Criteria) this;
        }

        public Criteria andUpdateUserIdNotBetween(String value1, String value2) {
            addCriterion("UPDATE_USER_ID not between", value1, value2, "updateUserId");
            return (Criteria) this;
        }

        public Criteria andLastUpdateDateIsNull() {
            addCriterion("LAST_UPDATE_DATE is null");
            return (Criteria) this;
        }

        public Criteria andLastUpdateDateIsNotNull() {
            addCriterion("LAST_UPDATE_DATE is not null");
            return (Criteria) this;
        }

        public Criteria andLastUpdateDateEqualTo(Date value) {
            addCriterion("LAST_UPDATE_DATE =", value, "lastUpdateDate");
            return (Criteria) this;
        }

        public Criteria andLastUpdateDateNotEqualTo(Date value) {
            addCriterion("LAST_UPDATE_DATE <>", value, "lastUpdateDate");
            return (Criteria) this;
        }

        public Criteria andLastUpdateDateGreaterThan(Date value) {
            addCriterion("LAST_UPDATE_DATE >", value, "lastUpdateDate");
            return (Criteria) this;
        }

        public Criteria andLastUpdateDateGreaterThanOrEqualTo(Date value) {
            addCriterion("LAST_UPDATE_DATE >=", value, "lastUpdateDate");
            return (Criteria) this;
        }

        public Criteria andLastUpdateDateLessThan(Date value) {
            addCriterion("LAST_UPDATE_DATE <", value, "lastUpdateDate");
            return (Criteria) this;
        }

        public Criteria andLastUpdateDateLessThanOrEqualTo(Date value) {
            addCriterion("LAST_UPDATE_DATE <=", value, "lastUpdateDate");
            return (Criteria) this;
        }

        public Criteria andLastUpdateDateIn(List<Date> values) {
            addCriterion("LAST_UPDATE_DATE in", values, "lastUpdateDate");
            return (Criteria) this;
        }

        public Criteria andLastUpdateDateNotIn(List<Date> values) {
            addCriterion("LAST_UPDATE_DATE not in", values, "lastUpdateDate");
            return (Criteria) this;
        }

        public Criteria andLastUpdateDateBetween(Date value1, Date value2) {
            addCriterion("LAST_UPDATE_DATE between", value1, value2, "lastUpdateDate");
            return (Criteria) this;
        }

        public Criteria andLastUpdateDateNotBetween(Date value1, Date value2) {
            addCriterion("LAST_UPDATE_DATE not between", value1, value2, "lastUpdateDate");
            return (Criteria) this;
        }

        public Criteria andDeleteFlagIsNull() {
            addCriterion("DELETE_FLAG is null");
            return (Criteria) this;
        }

        public Criteria andDeleteFlagIsNotNull() {
            addCriterion("DELETE_FLAG is not null");
            return (Criteria) this;
        }

        public Criteria andDeleteFlagEqualTo(String value) {
            addCriterion("DELETE_FLAG =", value, "deleteFlag");
            return (Criteria) this;
        }

        public Criteria andDeleteFlagNotEqualTo(String value) {
            addCriterion("DELETE_FLAG <>", value, "deleteFlag");
            return (Criteria) this;
        }

        public Criteria andDeleteFlagGreaterThan(String value) {
            addCriterion("DELETE_FLAG >", value, "deleteFlag");
            return (Criteria) this;
        }

        public Criteria andDeleteFlagGreaterThanOrEqualTo(String value) {
            addCriterion("DELETE_FLAG >=", value, "deleteFlag");
            return (Criteria) this;
        }

        public Criteria andDeleteFlagLessThan(String value) {
            addCriterion("DELETE_FLAG <", value, "deleteFlag");
            return (Criteria) this;
        }

        public Criteria andDeleteFlagLessThanOrEqualTo(String value) {
            addCriterion("DELETE_FLAG <=", value, "deleteFlag");
            return (Criteria) this;
        }

        public Criteria andDeleteFlagLike(String value) {
            addCriterion("DELETE_FLAG like", value, "deleteFlag");
            return (Criteria) this;
        }

        public Criteria andDeleteFlagNotLike(String value) {
            addCriterion("DELETE_FLAG not like", value, "deleteFlag");
            return (Criteria) this;
        }

        public Criteria andDeleteFlagIn(List<String> values) {
            addCriterion("DELETE_FLAG in", values, "deleteFlag");
            return (Criteria) this;
        }

        public Criteria andDeleteFlagNotIn(List<String> values) {
            addCriterion("DELETE_FLAG not in", values, "deleteFlag");
            return (Criteria) this;
        }

        public Criteria andDeleteFlagBetween(String value1, String value2) {
            addCriterion("DELETE_FLAG between", value1, value2, "deleteFlag");
            return (Criteria) this;
        }

        public Criteria andDeleteFlagNotBetween(String value1, String value2) {
            addCriterion("DELETE_FLAG not between", value1, value2, "deleteFlag");
            return (Criteria) this;
        }
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table qltn_m_university
     *
     * @mbggenerated do_not_delete_during_merge Sat Apr 08 18:31:52 ICT 2017
     */
    public static class Criteria extends GeneratedCriteria {

        protected Criteria() {
            super();
        }
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table qltn_m_university
     *
     * @mbggenerated Sat Apr 08 18:31:52 ICT 2017
     */
    public static class Criterion {
        private String condition;

        private Object value;

        private Object secondValue;

        private boolean noValue;

        private boolean singleValue;

        private boolean betweenValue;

        private boolean listValue;

        private String typeHandler;

        public String getCondition() {
            return condition;
        }

        public Object getValue() {
            return value;
        }

        public Object getSecondValue() {
            return secondValue;
        }

        public boolean isNoValue() {
            return noValue;
        }

        public boolean isSingleValue() {
            return singleValue;
        }

        public boolean isBetweenValue() {
            return betweenValue;
        }

        public boolean isListValue() {
            return listValue;
        }

        public String getTypeHandler() {
            return typeHandler;
        }

        protected Criterion(String condition) {
            super();
            this.condition = condition;
            this.typeHandler = null;
            this.noValue = true;
        }

        protected Criterion(String condition, Object value, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.typeHandler = typeHandler;
            if (value instanceof List<?>) {
                this.listValue = true;
            } else {
                this.singleValue = true;
            }
        }

        protected Criterion(String condition, Object value) {
            this(condition, value, null);
        }

        protected Criterion(String condition, Object value, Object secondValue, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.secondValue = secondValue;
            this.typeHandler = typeHandler;
            this.betweenValue = true;
        }

        protected Criterion(String condition, Object value, Object secondValue) {
            this(condition, value, secondValue, null);
        }
    }
}
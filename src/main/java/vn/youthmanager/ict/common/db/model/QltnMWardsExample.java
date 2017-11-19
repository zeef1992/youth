package vn.youthmanager.ict.common.db.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class QltnMWardsExample {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table qltn_m_wards
     *
     * @mbggenerated Sat Apr 08 18:31:52 ICT 2017
     */
    protected String orderByClause;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table qltn_m_wards
     *
     * @mbggenerated Sat Apr 08 18:31:52 ICT 2017
     */
    protected boolean distinct;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table qltn_m_wards
     *
     * @mbggenerated Sat Apr 08 18:31:52 ICT 2017
     */
    protected List<Criteria> oredCriteria;

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table qltn_m_wards
     *
     * @mbggenerated Sat Apr 08 18:31:52 ICT 2017
     */
    public QltnMWardsExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table qltn_m_wards
     *
     * @mbggenerated Sat Apr 08 18:31:52 ICT 2017
     */
    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table qltn_m_wards
     *
     * @mbggenerated Sat Apr 08 18:31:52 ICT 2017
     */
    public String getOrderByClause() {
        return orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table qltn_m_wards
     *
     * @mbggenerated Sat Apr 08 18:31:52 ICT 2017
     */
    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table qltn_m_wards
     *
     * @mbggenerated Sat Apr 08 18:31:52 ICT 2017
     */
    public boolean isDistinct() {
        return distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table qltn_m_wards
     *
     * @mbggenerated Sat Apr 08 18:31:52 ICT 2017
     */
    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table qltn_m_wards
     *
     * @mbggenerated Sat Apr 08 18:31:52 ICT 2017
     */
    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table qltn_m_wards
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
     * This method corresponds to the database table qltn_m_wards
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
     * This method corresponds to the database table qltn_m_wards
     *
     * @mbggenerated Sat Apr 08 18:31:52 ICT 2017
     */
    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table qltn_m_wards
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
     * This class corresponds to the database table qltn_m_wards
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

        public Criteria andWardsIdIsNull() {
            addCriterion("WARDS_ID is null");
            return (Criteria) this;
        }

        public Criteria andWardsIdIsNotNull() {
            addCriterion("WARDS_ID is not null");
            return (Criteria) this;
        }

        public Criteria andWardsIdEqualTo(String value) {
            addCriterion("WARDS_ID =", value, "wardsId");
            return (Criteria) this;
        }

        public Criteria andWardsIdNotEqualTo(String value) {
            addCriterion("WARDS_ID <>", value, "wardsId");
            return (Criteria) this;
        }

        public Criteria andWardsIdGreaterThan(String value) {
            addCriterion("WARDS_ID >", value, "wardsId");
            return (Criteria) this;
        }

        public Criteria andWardsIdGreaterThanOrEqualTo(String value) {
            addCriterion("WARDS_ID >=", value, "wardsId");
            return (Criteria) this;
        }

        public Criteria andWardsIdLessThan(String value) {
            addCriterion("WARDS_ID <", value, "wardsId");
            return (Criteria) this;
        }

        public Criteria andWardsIdLessThanOrEqualTo(String value) {
            addCriterion("WARDS_ID <=", value, "wardsId");
            return (Criteria) this;
        }

        public Criteria andWardsIdLike(String value) {
            addCriterion("WARDS_ID like", value, "wardsId");
            return (Criteria) this;
        }

        public Criteria andWardsIdNotLike(String value) {
            addCriterion("WARDS_ID not like", value, "wardsId");
            return (Criteria) this;
        }

        public Criteria andWardsIdIn(List<String> values) {
            addCriterion("WARDS_ID in", values, "wardsId");
            return (Criteria) this;
        }

        public Criteria andWardsIdNotIn(List<String> values) {
            addCriterion("WARDS_ID not in", values, "wardsId");
            return (Criteria) this;
        }

        public Criteria andWardsIdBetween(String value1, String value2) {
            addCriterion("WARDS_ID between", value1, value2, "wardsId");
            return (Criteria) this;
        }

        public Criteria andWardsIdNotBetween(String value1, String value2) {
            addCriterion("WARDS_ID not between", value1, value2, "wardsId");
            return (Criteria) this;
        }

        public Criteria andDistrictIdIsNull() {
            addCriterion("DISTRICT_ID is null");
            return (Criteria) this;
        }

        public Criteria andDistrictIdIsNotNull() {
            addCriterion("DISTRICT_ID is not null");
            return (Criteria) this;
        }

        public Criteria andDistrictIdEqualTo(String value) {
            addCriterion("DISTRICT_ID =", value, "districtId");
            return (Criteria) this;
        }

        public Criteria andDistrictIdNotEqualTo(String value) {
            addCriterion("DISTRICT_ID <>", value, "districtId");
            return (Criteria) this;
        }

        public Criteria andDistrictIdGreaterThan(String value) {
            addCriterion("DISTRICT_ID >", value, "districtId");
            return (Criteria) this;
        }

        public Criteria andDistrictIdGreaterThanOrEqualTo(String value) {
            addCriterion("DISTRICT_ID >=", value, "districtId");
            return (Criteria) this;
        }

        public Criteria andDistrictIdLessThan(String value) {
            addCriterion("DISTRICT_ID <", value, "districtId");
            return (Criteria) this;
        }

        public Criteria andDistrictIdLessThanOrEqualTo(String value) {
            addCriterion("DISTRICT_ID <=", value, "districtId");
            return (Criteria) this;
        }

        public Criteria andDistrictIdLike(String value) {
            addCriterion("DISTRICT_ID like", value, "districtId");
            return (Criteria) this;
        }

        public Criteria andDistrictIdNotLike(String value) {
            addCriterion("DISTRICT_ID not like", value, "districtId");
            return (Criteria) this;
        }

        public Criteria andDistrictIdIn(List<String> values) {
            addCriterion("DISTRICT_ID in", values, "districtId");
            return (Criteria) this;
        }

        public Criteria andDistrictIdNotIn(List<String> values) {
            addCriterion("DISTRICT_ID not in", values, "districtId");
            return (Criteria) this;
        }

        public Criteria andDistrictIdBetween(String value1, String value2) {
            addCriterion("DISTRICT_ID between", value1, value2, "districtId");
            return (Criteria) this;
        }

        public Criteria andDistrictIdNotBetween(String value1, String value2) {
            addCriterion("DISTRICT_ID not between", value1, value2, "districtId");
            return (Criteria) this;
        }

        public Criteria andCityIdIsNull() {
            addCriterion("CITY_ID is null");
            return (Criteria) this;
        }

        public Criteria andCityIdIsNotNull() {
            addCriterion("CITY_ID is not null");
            return (Criteria) this;
        }

        public Criteria andCityIdEqualTo(String value) {
            addCriterion("CITY_ID =", value, "cityId");
            return (Criteria) this;
        }

        public Criteria andCityIdNotEqualTo(String value) {
            addCriterion("CITY_ID <>", value, "cityId");
            return (Criteria) this;
        }

        public Criteria andCityIdGreaterThan(String value) {
            addCriterion("CITY_ID >", value, "cityId");
            return (Criteria) this;
        }

        public Criteria andCityIdGreaterThanOrEqualTo(String value) {
            addCriterion("CITY_ID >=", value, "cityId");
            return (Criteria) this;
        }

        public Criteria andCityIdLessThan(String value) {
            addCriterion("CITY_ID <", value, "cityId");
            return (Criteria) this;
        }

        public Criteria andCityIdLessThanOrEqualTo(String value) {
            addCriterion("CITY_ID <=", value, "cityId");
            return (Criteria) this;
        }

        public Criteria andCityIdLike(String value) {
            addCriterion("CITY_ID like", value, "cityId");
            return (Criteria) this;
        }

        public Criteria andCityIdNotLike(String value) {
            addCriterion("CITY_ID not like", value, "cityId");
            return (Criteria) this;
        }

        public Criteria andCityIdIn(List<String> values) {
            addCriterion("CITY_ID in", values, "cityId");
            return (Criteria) this;
        }

        public Criteria andCityIdNotIn(List<String> values) {
            addCriterion("CITY_ID not in", values, "cityId");
            return (Criteria) this;
        }

        public Criteria andCityIdBetween(String value1, String value2) {
            addCriterion("CITY_ID between", value1, value2, "cityId");
            return (Criteria) this;
        }

        public Criteria andCityIdNotBetween(String value1, String value2) {
            addCriterion("CITY_ID not between", value1, value2, "cityId");
            return (Criteria) this;
        }

        public Criteria andCountryIdIsNull() {
            addCriterion("COUNTRY_ID is null");
            return (Criteria) this;
        }

        public Criteria andCountryIdIsNotNull() {
            addCriterion("COUNTRY_ID is not null");
            return (Criteria) this;
        }

        public Criteria andCountryIdEqualTo(String value) {
            addCriterion("COUNTRY_ID =", value, "countryId");
            return (Criteria) this;
        }

        public Criteria andCountryIdNotEqualTo(String value) {
            addCriterion("COUNTRY_ID <>", value, "countryId");
            return (Criteria) this;
        }

        public Criteria andCountryIdGreaterThan(String value) {
            addCriterion("COUNTRY_ID >", value, "countryId");
            return (Criteria) this;
        }

        public Criteria andCountryIdGreaterThanOrEqualTo(String value) {
            addCriterion("COUNTRY_ID >=", value, "countryId");
            return (Criteria) this;
        }

        public Criteria andCountryIdLessThan(String value) {
            addCriterion("COUNTRY_ID <", value, "countryId");
            return (Criteria) this;
        }

        public Criteria andCountryIdLessThanOrEqualTo(String value) {
            addCriterion("COUNTRY_ID <=", value, "countryId");
            return (Criteria) this;
        }

        public Criteria andCountryIdLike(String value) {
            addCriterion("COUNTRY_ID like", value, "countryId");
            return (Criteria) this;
        }

        public Criteria andCountryIdNotLike(String value) {
            addCriterion("COUNTRY_ID not like", value, "countryId");
            return (Criteria) this;
        }

        public Criteria andCountryIdIn(List<String> values) {
            addCriterion("COUNTRY_ID in", values, "countryId");
            return (Criteria) this;
        }

        public Criteria andCountryIdNotIn(List<String> values) {
            addCriterion("COUNTRY_ID not in", values, "countryId");
            return (Criteria) this;
        }

        public Criteria andCountryIdBetween(String value1, String value2) {
            addCriterion("COUNTRY_ID between", value1, value2, "countryId");
            return (Criteria) this;
        }

        public Criteria andCountryIdNotBetween(String value1, String value2) {
            addCriterion("COUNTRY_ID not between", value1, value2, "countryId");
            return (Criteria) this;
        }

        public Criteria andWardsCodeIsNull() {
            addCriterion("WARDS_CODE is null");
            return (Criteria) this;
        }

        public Criteria andWardsCodeIsNotNull() {
            addCriterion("WARDS_CODE is not null");
            return (Criteria) this;
        }

        public Criteria andWardsCodeEqualTo(String value) {
            addCriterion("WARDS_CODE =", value, "wardsCode");
            return (Criteria) this;
        }

        public Criteria andWardsCodeNotEqualTo(String value) {
            addCriterion("WARDS_CODE <>", value, "wardsCode");
            return (Criteria) this;
        }

        public Criteria andWardsCodeGreaterThan(String value) {
            addCriterion("WARDS_CODE >", value, "wardsCode");
            return (Criteria) this;
        }

        public Criteria andWardsCodeGreaterThanOrEqualTo(String value) {
            addCriterion("WARDS_CODE >=", value, "wardsCode");
            return (Criteria) this;
        }

        public Criteria andWardsCodeLessThan(String value) {
            addCriterion("WARDS_CODE <", value, "wardsCode");
            return (Criteria) this;
        }

        public Criteria andWardsCodeLessThanOrEqualTo(String value) {
            addCriterion("WARDS_CODE <=", value, "wardsCode");
            return (Criteria) this;
        }

        public Criteria andWardsCodeLike(String value) {
            addCriterion("WARDS_CODE like", value, "wardsCode");
            return (Criteria) this;
        }

        public Criteria andWardsCodeNotLike(String value) {
            addCriterion("WARDS_CODE not like", value, "wardsCode");
            return (Criteria) this;
        }

        public Criteria andWardsCodeIn(List<String> values) {
            addCriterion("WARDS_CODE in", values, "wardsCode");
            return (Criteria) this;
        }

        public Criteria andWardsCodeNotIn(List<String> values) {
            addCriterion("WARDS_CODE not in", values, "wardsCode");
            return (Criteria) this;
        }

        public Criteria andWardsCodeBetween(String value1, String value2) {
            addCriterion("WARDS_CODE between", value1, value2, "wardsCode");
            return (Criteria) this;
        }

        public Criteria andWardsCodeNotBetween(String value1, String value2) {
            addCriterion("WARDS_CODE not between", value1, value2, "wardsCode");
            return (Criteria) this;
        }

        public Criteria andWardsNameIsNull() {
            addCriterion("WARDS_NAME is null");
            return (Criteria) this;
        }

        public Criteria andWardsNameIsNotNull() {
            addCriterion("WARDS_NAME is not null");
            return (Criteria) this;
        }

        public Criteria andWardsNameEqualTo(String value) {
            addCriterion("WARDS_NAME =", value, "wardsName");
            return (Criteria) this;
        }

        public Criteria andWardsNameNotEqualTo(String value) {
            addCriterion("WARDS_NAME <>", value, "wardsName");
            return (Criteria) this;
        }

        public Criteria andWardsNameGreaterThan(String value) {
            addCriterion("WARDS_NAME >", value, "wardsName");
            return (Criteria) this;
        }

        public Criteria andWardsNameGreaterThanOrEqualTo(String value) {
            addCriterion("WARDS_NAME >=", value, "wardsName");
            return (Criteria) this;
        }

        public Criteria andWardsNameLessThan(String value) {
            addCriterion("WARDS_NAME <", value, "wardsName");
            return (Criteria) this;
        }

        public Criteria andWardsNameLessThanOrEqualTo(String value) {
            addCriterion("WARDS_NAME <=", value, "wardsName");
            return (Criteria) this;
        }

        public Criteria andWardsNameLike(String value) {
            addCriterion("WARDS_NAME like", value, "wardsName");
            return (Criteria) this;
        }

        public Criteria andWardsNameNotLike(String value) {
            addCriterion("WARDS_NAME not like", value, "wardsName");
            return (Criteria) this;
        }

        public Criteria andWardsNameIn(List<String> values) {
            addCriterion("WARDS_NAME in", values, "wardsName");
            return (Criteria) this;
        }

        public Criteria andWardsNameNotIn(List<String> values) {
            addCriterion("WARDS_NAME not in", values, "wardsName");
            return (Criteria) this;
        }

        public Criteria andWardsNameBetween(String value1, String value2) {
            addCriterion("WARDS_NAME between", value1, value2, "wardsName");
            return (Criteria) this;
        }

        public Criteria andWardsNameNotBetween(String value1, String value2) {
            addCriterion("WARDS_NAME not between", value1, value2, "wardsName");
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
     * This class corresponds to the database table qltn_m_wards
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
     * This class corresponds to the database table qltn_m_wards
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
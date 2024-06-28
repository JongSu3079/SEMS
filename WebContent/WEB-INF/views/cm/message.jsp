<%--  CSS/JS browser cache delete --%>
<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<c:set var="toDay"><fmt:formatDate value="<%=new java.util.Date()%>" pattern="yyyy-MM-dd" /></c:set>

<c:set var="smCompanyCd"><spring:message code="companyCd"/></c:set>
<c:set var="smLogoAlt"><spring:message code="logoAlt"/></c:set>

<c:set var="smAgree"><spring:message code="agree"/></c:set>
<c:set var="smAcceptPeakAlarm"><spring:message code="acceptPeakAlarm"/></c:set>
<c:set var="smAcceptEqmtAlarm"><spring:message code="acceptEqmtAlarm"/></c:set>
<c:set var="smAlarmHistNotExist"><spring:message code="alarmHistNotExist"/></c:set>
<c:set var="smChangeSuccess"><spring:message code="changeSuccess"/></c:set>
<c:set var="smChangeFail"><spring:message code="changeFail"/></c:set>
<c:set var="smCheckInput"><spring:message code="checkInput"/></c:set>
<c:set var="smCommSuccess"><spring:message code="commSuccess"/></c:set>
<c:set var="smCommFail"><spring:message code="commFail"/></c:set>
<c:set var="smDeny"><spring:message code="deny"/></c:set>
<c:set var="smGwCommFail"><spring:message code="gwCommFail"/></c:set>
<c:set var="smContElecMgntStr"><spring:message code="contElecMgntStr"/></c:set>
<c:set var="smDimHigh"><spring:message code="dimHigh"/></c:set>
<c:set var="smDimLow"><spring:message code="dimLow"/></c:set>
<c:set var="smEqmtNotExist"><spring:message code="eqmtNotExist"/></c:set>
<c:set var="smErrorHappens"><spring:message code="errorHappens"/></c:set>
<c:set var="smFindIdpw"><spring:message code="findIdpw"/></c:set>
<c:set var="smLoginInfoNotCorrect"><spring:message code="loginInfoNotCorrect"/></c:set>
<c:set var="smSessionInvalid"><spring:message code="sessionInvalid"/></c:set>
<c:set var="smSessionInfoNotCorrect"><spring:message code="sessionInfoNotCorrect"/></c:set>
<c:set var="smNotSame"><spring:message code="notSame"/></c:set>
<c:set var="smRsltNotExist"><spring:message code="rsltNotExist"/></c:set>
<c:set var="smOnlyForMobile"><spring:message code="onlyForMobile"/></c:set>
<c:set var="smPwChange"><spring:message code="pwChange"/></c:set>
<c:set var="smRegiDev"><spring:message code="regiDev"/></c:set>
<c:set var="smSaveSuccess"><spring:message code="saveSuccess"/></c:set>
<c:set var="smSaveSuccessRetFail"><spring:message code="saveSuccessRetFail"/></c:set>
<c:set var="smSaveFail"><spring:message code="saveFail"/></c:set>
<c:set var="smSelectHomeDisp"><spring:message code="selectHomeDisp"/></c:set>
<c:set var="smIdStrNotExist"><spring:message code="idStrNotExist"/></c:set>
<c:set var="smTypeCorrectly"><spring:message code="typeCorrectly"/></c:set>
<c:set var="smTypeId"><spring:message code="typeId"/></c:set>
<c:set var="smTypePw"><spring:message code="typePw"/></c:set>
<c:set var="smTryAgain"><spring:message code="tryAgain"/></c:set>

<c:set var="smAccmUsage"><spring:message code="accmUsage"/></c:set>
<c:set var="smAlarmHist"><spring:message code="alarmHist"/></c:set>
<c:set var="smAlarmRaiseTime"><spring:message code="alarmRaiseTime"/></c:set>
<c:set var="smAvgTempCtrlUsage"><spring:message code="avgTempCtrlUsage"/></c:set>
<c:set var="smAvgTempCtrlHour"><spring:message code="avgTempCtrlHour"/></c:set>
<c:set var="smAvgDimmingLevel"><spring:message code="avgDimmingLevel"/></c:set>
<c:set var="smCheckNewPw"><spring:message code="checkNewPw"/></c:set>
<c:set var="smCommError"><spring:message code="commError"/></c:set>
<c:set var="smCoolingEqmtState"><spring:message code="coolingEqmtState"/></c:set>
<c:set var="smDimmingSetting"><spring:message code="dimmingSetting"/></c:set>
<c:set var="smDimmingLevel"><spring:message code="dimmingLevel"/></c:set>
<c:set var="smEmailAddrRegi"><spring:message code="emailAddrRegi"/></c:set>
<c:set var="smEnerUsage"><spring:message code="enerUsage"/></c:set>
<c:set var="smEnerUsageAnal"><spring:message code="enerUsageAnal"/></c:set>
<c:set var="smEnerUsagePerStr"><spring:message code="enerUsagePerStr"/></c:set>
<c:set var="smEqmtAlarm"><spring:message code="eqmtAlarm"/></c:set>
<c:set var="smEqtInfo"><spring:message code="eqtInfo"/></c:set>
<c:set var="smHacUsage"><spring:message code="hacUsage"/></c:set>
<c:set var="smHomeSelect"><spring:message code="homeSelect"/></c:set>
<c:set var="smHqRecomm"><spring:message code="hqRecomm"/></c:set>
<c:set var="smLowTemp"><spring:message code="lowTemp"/></c:set>
<c:set var="smMyStr"><spring:message code="myStr"/></c:set>
<c:set var="smNotFunc"><spring:message code="notFunc"/></c:set>
<c:set var="smOrgCd"><spring:message code="orgCd"/></c:set>
<c:set var="smOrgNm"><spring:message code="orgNm"/></c:set>
<c:set var="smOrgTree"><spring:message code="orgTree"/></c:set>
<c:set var="smPrevPw"><spring:message code="prevPw"/></c:set>
<c:set var="smPasswordMod"><spring:message code="passwordMod"/></c:set>
<c:set var="smPeakAlarm"><spring:message code="peakAlarm"/></c:set>
<c:set var="smPwMod"><spring:message code="pwMod"/></c:set>
<c:set var="smPushRegi"><spring:message code="pushRegi"/></c:set>
<c:set var="smPushMsgReceiveRegi"><spring:message code="pushMsgReceiveRegi"/></c:set>
<c:set var="smRemsLogin"><spring:message code="remsLogin"/></c:set>
<c:set var="smRecentMonthAlarmCnt"><spring:message code="recentMonthAlarmCnt"/></c:set>
<c:set var="smRetrieveTime"><spring:message code="retrieveTime"/></c:set>
<c:set var="smRememberMe"><spring:message code="rememberMe"/></c:set>
<c:set var="smSelectLocale"><spring:message code="selectLocale"/></c:set>
<c:set var="smSimilarStrAvg"><spring:message code="similarStrAvg"/></c:set>
<c:set var="smSignSetting"><spring:message code="signSetting"/></c:set>
<c:set var="smStrAlarmList"><spring:message code="strAlarmList"/></c:set>
<c:set var="smStrCompare"><spring:message code="strCompare"/></c:set>
<c:set var="smStrState"><spring:message code="strState"/></c:set>
<c:set var="smStrAvgIndoorTemp"><spring:message code="strAvgIndoorTemp"/></c:set>
<c:set var="smStrElecUsagePerSpace"><spring:message code="strElecUsagePerSpace"/></c:set>
<c:set var="smSunriseTime"><spring:message code="sunriseTime"/></c:set>
<c:set var="smSunsetTime"><spring:message code="sunsetTime"/></c:set>
<c:set var="smTempCali"><spring:message code="tempCali"/></c:set>
<c:set var="smTempTrend"><spring:message code="tempTrend"/></c:set>
<c:set var="smTempCtrlMode"><spring:message code="tempCtrlMode"/></c:set>
<c:set var="smTempCtrlOper"><spring:message code="tempCtrlOper"/></c:set>
<c:set var="smTempCtrlOperState"><spring:message code="tempCtrlOperState"/></c:set>
<c:set var="smTempCtrlOperTimeLine"><spring:message code="tempCtrlOperTimeLine"/></c:set>
<c:set var="smTempCtrlOperTimeCheck"><spring:message code="tempCtrlOperTimeCheck"/></c:set>
<c:set var="smTempCtrlOperTimeSetting"><spring:message code="tempCtrlOperTimeSetting"/></c:set>
<c:set var="smTempCtrlPref"><spring:message code="tempCtrlPref"/></c:set>
<c:set var="smThisMonthPredict"><spring:message code="thisMonthPredict"/></c:set>
<c:set var="smTotalUsage"><spring:message code="totalUsage"/></c:set>
<c:set var="smTypeNewPw"><spring:message code="typeNewPw"/></c:set>
<c:set var="smUseWattage"><spring:message code="useWattage"/></c:set>
<c:set var="smUserAgreement"><spring:message code="userAgreement"/></c:set>
<c:set var="smUsagePerSpace"><spring:message code="usagePerSpace"/></c:set>
<c:set var="smSearchStr"><spring:message code="searchStr"/></c:set>
<c:set var="smAlarmList"><spring:message code="alarmList"/></c:set>

<c:set var="smApr"><spring:message code="apr"/></c:set>
<c:set var="smAlarm"><spring:message code="alarm"/></c:set>
<c:set var="smAnal"><spring:message code="anal"/></c:set>
<c:set var="smAvg"><spring:message code="avg"/></c:set>
<c:set var="smAccm"><spring:message code="accm"/></c:set>
<c:set var="smAfternoon"><spring:message code="afternoon"/></c:set>
<c:set var="smAug"><spring:message code="aug"/></c:set>
<c:set var="smCali"><spring:message code="cali"/></c:set>
<c:set var="smCasher"><spring:message code="casher"/></c:set>
<c:set var="smChange"><spring:message code="change"/></c:set>
<c:set var="smClos"><spring:message code="clos"/></c:set>
<c:set var="smClose"><spring:message code="close"/></c:set>
<c:set var="smCloud"><spring:message code="cloud"/></c:set>
<c:set var="smCloudy"><spring:message code="cloudy"/></c:set>
<c:set var="smCnfm"><spring:message code="cnfm"/></c:set>
<c:set var="smCnt"><spring:message code="cnt"/></c:set>
<c:set var="smCompare"><spring:message code="compare"/></c:set>
<c:set var="smCooling"><spring:message code="cooling"/></c:set>
<c:set var="smCoolingEqt"><spring:message code="coolingEqt"/></c:set>
<c:set var="smDate"><spring:message code="date"/></c:set>
<c:set var="smDec"><spring:message code="dec"/></c:set>
<c:set var="smDelay"><spring:message code="delay"/></c:set>
<c:set var="smDevice"><spring:message code="device"/></c:set>
<c:set var="smDiff"><spring:message code="diff"/></c:set>
<c:set var="smDim"><spring:message code="dim"/></c:set>
<c:set var="smEner"><spring:message code="ener"/></c:set>
<c:set var="smElecWatt"><spring:message code="elecWatt"/></c:set>
<c:set var="smEqmt"><spring:message code="eqmt"/></c:set>
<c:set var="smEqt"><spring:message code="eqt"/></c:set>
<c:set var="smFeb"><spring:message code="feb"/></c:set>
<c:set var="smFog"><spring:message code="fog"/></c:set>
<c:set var="smFriday"><spring:message code="friday"/></c:set>
<c:set var="smFunc"><spring:message code="func"/></c:set>
<c:set var="smGood"><spring:message code="good"/></c:set>
<c:set var="smHac"><spring:message code="hac"/></c:set>
<c:set var="smHeating"><spring:message code="heating"/></c:set>
<c:set var="smHist"><spring:message code="hist"/></c:set>
<c:set var="smHq"><spring:message code="hq"/></c:set>
<c:set var="smId"><spring:message code="id"/></c:set>
<c:set var="smIndoor"><spring:message code="indoor"/></c:set>
<c:set var="smInfo"><spring:message code="info"/></c:set>
<c:set var="smJan"><spring:message code="jan"/></c:set>
<c:set var="smJun"><spring:message code="jun"/></c:set>
<c:set var="smJul"><spring:message code="jul"/></c:set>
<c:set var="smLastMonth"><spring:message code="lastMonth"/></c:set>
<c:set var="smLayout"><spring:message code="layout"/></c:set>
<c:set var="smLess"><spring:message code="less"/></c:set>
<c:set var="smLogout"><spring:message code="logout"/></c:set>
<c:set var="smLvl"><spring:message code="lvl"/></c:set>
<c:set var="smMar"><spring:message code="mar"/></c:set>
<c:set var="smMay"><spring:message code="may"/></c:set>
<c:set var="smMod"><spring:message code="mod"/></c:set>
<c:set var="smMode"><spring:message code="mode"/></c:set>
<c:set var="smMonday"><spring:message code="monday"/></c:set>
<c:set var="smMore"><spring:message code="more"/></c:set>
<c:set var="smMorning"><spring:message code="morning"/></c:set>
<c:set var="smMsg"><spring:message code="msg"/></c:set>
<c:set var="smNone"><spring:message code="none"/></c:set>
<c:set var="smNov"><spring:message code="nov"/></c:set>
<c:set var="smOffice"><spring:message code="office"/></c:set>
<c:set var="smOct"><spring:message code="oct"/></c:set>
<c:set var="smOper"><spring:message code="oper"/></c:set>
<c:set var="smOpen"><spring:message code="open"/></c:set>
<c:set var="smPassword"><spring:message code="password"/></c:set>
<c:set var="smPerSpace"><spring:message code="perSpace"/></c:set>
<c:set var="smPresent"><spring:message code="present"/></c:set>
<c:set var="smPrefer"><spring:message code="prefer"/></c:set>
<c:set var="smPush"><spring:message code="push"/></c:set>
<c:set var="smRecent"><spring:message code="recent"/></c:set>
<c:set var="smReceive"><spring:message code="receive"/></c:set>
<c:set var="smRecomm"><spring:message code="recomm"/></c:set>
<c:set var="smRegi"><spring:message code="regi"/></c:set>
<c:set var="smRetireve"><spring:message code="retireve"/></c:set>
<c:set var="smSaturday"><spring:message code="saturday"/></c:set>
<c:set var="smSave"><spring:message code="save"/></c:set>
<c:set var="smSep"><spring:message code="sep"/></c:set>
<c:set var="smSimilar"><spring:message code="similar"/></c:set>
<c:set var="smSign"><spring:message code="sign"/></c:set>
<c:set var="smSetting"><spring:message code="setting"/></c:set>
<c:set var="smSnow"><spring:message code="snow"/></c:set>
<c:set var="smShower"><spring:message code="shower"/></c:set>
<c:set var="smSrch"><spring:message code="srch"/></c:set>
<c:set var="smState"><spring:message code="state"/></c:set>
<c:set var="smStrNm"><spring:message code="strNm"/></c:set>
<c:set var="smStr"><spring:message code="str"/></c:set>
<c:set var="smSunday"><spring:message code="sunday"/></c:set>
<c:set var="smSunny"><spring:message code="sunny"/></c:set>
<c:set var="smSunrise"><spring:message code="sunrise"/></c:set>
<c:set var="smSunset"><spring:message code="sunset"/></c:set>
<c:set var="smTemp"><spring:message code="temp"/></c:set>
<c:set var="smTimeLine"><spring:message code="timeLine"/></c:set>
<c:set var="smTime"><spring:message code="time"/></c:set>
<c:set var="smThisMonth"><spring:message code="thisMonth"/></c:set>
<c:set var="smThursday"><spring:message code="thursday"/></c:set>
<c:set var="smTuesday"><spring:message code="tuesday"/></c:set>
<c:set var="smLightning"><spring:message code="lightning"/></c:set>
<c:set var="smList"><spring:message code="list"/></c:set>
<c:set var="smOutdoor"><spring:message code="outdoor"/></c:set>
<c:set var="smOneMonth"><spring:message code="oneMonth"/></c:set>
<c:set var="smOrg"><spring:message code="org"/></c:set>
<c:set var="smPeak"><spring:message code="peak"/></c:set>
<c:set var="smPredict"><spring:message code="predict"/></c:set>
<c:set var="smPw"><spring:message code="pw"/></c:set>
<c:set var="smRise"><spring:message code="rise"/></c:set>
<c:set var="smRslt"><spring:message code="rslt"/></c:set>
<c:set var="smThisMonth1"><spring:message code="thisMonth1"/></c:set>
<c:set var="smToday"><spring:message code="today"/></c:set>
<c:set var="smTotal"><spring:message code="total"/></c:set>
<c:set var="smTrend"><spring:message code="trend"/></c:set>
<c:set var="smUse"><spring:message code="use"/></c:set>
<c:set var="smUsage"><spring:message code="usage"/></c:set>
<c:set var="smWednesday"><spring:message code="wednesday"/></c:set>
<c:set var="smYesterday"><spring:message code="yesterday"/></c:set>
<c:set var="smYearMonthDay"><spring:message code="yearMonthDay"/></c:set>
<c:set var="smWarn"><spring:message code="warn"/></c:set>

<c:set var="smAmnt"><spring:message code="amnt"/></c:set>
<c:set var="smDay"><spring:message code="day"/></c:set>
<c:set var="smMonth"><spring:message code="month"/></c:set>
<c:set var="smHh"><spring:message code="hh"/></c:set>
<c:set var="smMm"><spring:message code="mm"/></c:set>
<c:set var="smPer"><spring:message code="per"/></c:set>
<c:set var="smRain"><spring:message code="rain"/></c:set>
<c:set var="smWeek"><spring:message code="week"/></c:set>
<c:set var="smYear"><spring:message code="year"/></c:set>

<c:set var="smCommonCssPath">
	<c:choose>
		<c:when test="${ smCompanyCd eq 'gsr' }">css_theme</c:when>
		<c:otherwise>css</c:otherwise>
	</c:choose>
</c:set>

<c:set var="smCommonImagesPath">
	<c:choose>
		<c:when test="${ smCompanyCd eq 'gsr' }">images_theme</c:when>
		<c:otherwise>images</c:otherwise>
	</c:choose>
</c:set>

<c:set var="now" value="<%=new java.util.Date()%>" />
<fmt:formatDate value="${now}" pattern="yyyyMMdd" var="sysDate"/>
<fmt:formatDate value="${now}" pattern="yyyy" var="nowYear"/>
<c:set var="strSpring" 		value="${nowYear}02040000" /> 
<c:set var="strSummer" 		value="${nowYear}05050000" /> 
<c:set var="strFall" 		value="${nowYear}09010000" /> 
<c:set var="strWinter" 		value="${nowYear}11070000" /> 
<c:set var="strHeatS" 		value="${nowYear}07010000" /> 
<c:set var="strHeatE" 		value="${nowYear}08310000" /> 
<c:set var="strLastDate" 	value="${nowYear}12310000" /> 
<c:set var="strFirstDate" 	value="${nowYear}01010000" /> 
<fmt:parseDate value="${strSpring}" pattern="yyyyMMddHHmm" var="springDate"/>
<fmt:parseDate value="${strSummer}" pattern="yyyyMMddHHmm" var="summerDate"/>
<fmt:parseDate value="${strFall}" pattern="yyyyMMddHHmm" var="fallDate"/>
<fmt:parseDate value="${strWinter}" pattern="yyyyMMddHHmm" var="winterDate"/>
<fmt:parseDate value="${strHeatS}" pattern="yyyyMMddHHmm" var="HeatSDate"/>
<fmt:parseDate value="${strHeatE}" pattern="yyyyMMddHHmm" var="HeatEDate"/>
<fmt:parseDate value="${strLastDate}" pattern="yyyyMMddHHmm" var="lastDate"/>
<fmt:parseDate value="${strFirstDate}" pattern="yyyyMMddHHmm" var="firstDate"/>

<fmt:formatDate value="${springDate}" pattern="yyyyMMdd" var="spring" />
<fmt:formatDate value="${summerDate}" pattern="yyyyMMdd" var="summer" />
<fmt:formatDate value="${fallDate}" pattern="yyyyMMdd" var="fall" />
<fmt:formatDate value="${winterDate}" pattern="yyyyMMdd" var="winter" />
<fmt:formatDate value="${HeatSDate}" pattern="yyyyMMdd" var="HeatS" />
<fmt:formatDate value="${HeatEDate}" pattern="yyyyMMdd" var="HeatE" />
<fmt:formatDate value="${lastDate}" pattern="yyyyMMdd" var="lastDay" />
<fmt:formatDate value="${firstDate}" pattern="yyyyMMdd" var="firstDay" />

<c:set var="smCompanyCssPath">
	<c:choose>
		<c:when test="${ smCompanyCd eq 'gsr' }">
			<c:if test="${ spring <= sysDate && sysDate < summer}">
  				css_theme/season1
			</c:if>
			<c:if test="${ summer <= sysDate && sysDate < fall}">
				<c:choose>
					<c:when test="${ HeatS <= sysDate  && sysDate <= HeatE}">
						css_theme/season3
					</c:when>
					<c:otherwise>
						css_theme/season2
					</c:otherwise>
				</c:choose>
			</c:if>
			<c:if test="${ fall <= sysDate && sysDate < winter}">
				css_theme/season4
			</c:if>
			<c:if test="${ (winter <= sysDate && sysDate <= lastDay) || (firstDay <= sysDate && sysDate < spring) }">
				css_theme/season5
			</c:if>
		</c:when>
		<c:otherwise>css</c:otherwise>
	</c:choose>
</c:set>

<c:set var="smCompanyImagePath">
	<c:choose>
		<c:when test="${ smCompanyCd eq 'gsr' }">
			<c:if test="${ spring <= sysDate && sysDate < summer}">
  				images_theme/season1
			</c:if>
			<c:if test="${ summer <= sysDate && sysDate < fall}">
				<c:choose>
					<c:when test="${HeatS <= sysDate && sysDate <= HeatE}">
						images_theme/season3
					</c:when>
					<c:otherwise>
						images_theme/season2
					</c:otherwise>
				</c:choose>
			</c:if>
			<c:if test="${fall <= sysDate && sysDate < winter}">
				images_theme/season4
			</c:if>
			<c:if test="${ (winter <= sysDate && sysDate <= lastDay) || (firstDay <= sysDate && sysDate < spring) }">
				images_theme/season5
			</c:if>
		</c:when>
		<c:otherwise>images</c:otherwise>
	</c:choose>
</c:set>

<c:set var="smGraphStyleForCm">
	<c:choose>
		<c:when test="${ smCompanyCd eq 'gsr' }">
			<c:if test="${spring <= sysDate && sysDate < summer}">
  				gsr_theme_season1
			</c:if>
			<c:if test="${summer <= sysDate && sysDate < fall}">
				<c:choose>
					<c:when test="${HeatS <= sysDate && sysDate <= HeatE}">
						gsr_theme_season3
					</c:when>
					<c:otherwise>
						gsr_theme_season2
					</c:otherwise>
				</c:choose>
			</c:if>
			<c:if test="${fall <= sysDate && sysDate < winter}">
				gsr_theme_season4
			</c:if>
			<c:if test="${ (winter <= sysDate && sysDate <= lastDay) || (firstDay <= sysDate && sysDate < spring) }">
				gsr_theme_season5
			</c:if>
		</c:when>
		<c:otherwise>${smCompanyCd}</c:otherwise>
	</c:choose>
</c:set>

<c:set var="smGraphStyleForVm">
	<c:choose>
		<c:when test="${ smCompanyCd eq 'gsr' }">gsr_theme</c:when>
		<c:otherwise>common</c:otherwise>
	</c:choose>
</c:set>

<c:set var="smStatusHeight">
	<c:choose>
		<c:when test="${ statusBar > -1 }">sh${statusBar}</c:when>
		<c:otherwise>sh${ userVo.getSh() }</c:otherwise>
	</c:choose>
</c:set>

<script type="text/javascript">
	var smCompanyCdJS = '${smCompanyCd}';
	var smLogoAltJS = '${smLogoAlt}';
	var smStr = '${smStr}';
	var smCommonImagesPath = '${smCommonImagesPath}';
	var smGraphStyleForVm = '${smGraphStyleForVm}';
	var smGraphStyleForCm = '${smGraphStyleForCm}';
</script>
import {
	host
} from "./url";
import axios from 'axios';
import axiosUtil from "./axiosUtil";
import {
	data
} from "vue-awesome";

/**
 * 实时负荷曲线
 * @param {*} data
 * @returns
 */
export function gfPlantDay24YG() {
	return axiosUtil({
		method: "post",
		url: host + "/GFXny/GFPlantDay24YG?plant=GF_YG",
	});
}

/**
 * 实时负荷数值
 * @param {*} data
 * @returns
 */
export function getPlantRealData(plant) {
	return axiosUtil({
		method: "post",
		url: host + `/GFXny/getPlantRealData?plant=${plant}`,
	});
}

/**
 * 月发电量上网量
 */
export function getMonthDLRpt() {
	return axiosUtil({
		method: "post",
		url: host + "/GFXny/getMonthDLRpt",
	});
}

/**
 * 月发电量上网量曲线
 * @returns
 */
export function getMonthDLListRpt() {
	return axiosUtil({
		method: "post",
		url: host + "/GFXny/getMonthDLListRpt",
	});
}

/**
 * 年发电量上网量
 * @returns
 */
export function getYearMonthDLListRpt() {
	return axiosUtil({
		method: "post",
		url: host + "/GFXny/getYearMonthDLListRpt",
	});
}

/**
 * 智慧能源
 */
export function smarterEnergy(id) {
	return axiosUtil({
		method: "post",
		url: host + `/GFXny/SmarterEnergy?id=${id}`,
	});
}

/**
 * 曲线
 * @param {*} tag
 * @returns
 */
export function smarterEnergy24(tag) {
	return axiosUtil({
		method: "post",
		url: host + `/GFXny/SmarterEnergy24?tag=${tag}`,
	});
}

/**
 * 火电发电量
 * @returns
 */
export function getPlantMonthDLListRpt() {
	return axiosUtil({
		method: "post",
		url: host + `/Plant/getMonthDLListRpt`,
	});
}

/**
 * 火电发电设备台数
 * @returns
 */
export function GF_PLANT_UNIT_STATE() {
	return axiosUtil({
		method: "post",
		url: host + `/GFXny/GF_PLANT_UNIT_STATE`,
	});
}

/**
 * 智慧能源
 * @returns
 */
export function SmarterEnergyList(data) {
	return axiosUtil({
		method: "POST",
		url: host + `/GFXny/SmarterEnergyList`,
		data: data,
	});
}

/**
 * 获取容量
 * @returns
 */
export function getGFBaseInfo() {
	return axiosUtil({
		method: "POST",
		url: host + `/Plant/getGFBaseInfo`,
	});
}

/**
 * 新能源 风电
 * @param {*} data
 * @returns
 */
export function XNYFDRealDataList(data) {
	return axiosUtil({
		method: "POST",
		url: host + `/GFXny/XNYFDRealDataList`,
		data: data,
	});
}

/**
 * 新能源 光伏
 * @param {*} data
 * @returns
 */
export function XNYGFRealDataList(data) {
	return axiosUtil({
		method: "POST",
		url: host + `/GFXny/XNYGFRealDataList`,
		data: data,
	});
}

/**
 * 火电板块
 * @param {*} data
 * @returns
 */
export function getPlantRealDataList(data) {
	return axiosUtil({
		method: "POST",
		url: host + `/Plant/getPlantRealDataList`,
		data: data,
	});
}

/**
 * 同比
 * @param {*} data
 * @returns
 */
export function sumFDL(data) {
	return axiosUtil({
		method: "POST",
		url: host + `/PlantDetail/sumFDL?plantID=${data}`,
	});
}

/**
 * 火电数据
 * @param {*} data
 * @returns
 */
export function sumCoal_Gas_DL(data) {
	return axiosUtil({
		method: "POST",
		url: host + `/PlantDetail/sumCoal_Gas_DL?plantID=${data}`,
	});
}

/**
 * 实时负荷曲线
 * @param {*} data
 * @returns
 */
export function getPlant24Data(data) {
	return axiosUtil({
		method: "POST",
		url: host + `/PlantDetail/getPlant24Data?plant=${data}`,
	});
}

/**
 * 获取安全生产天数
 * @returns
 */
export function safeDays() {
	return axiosUtil({
		method: "POST",
		url: host + `/Base/safeDays`,
	});
}

/**
 *
 * @returns
 */
export function getLNBaseInfo() {
	return axiosUtil({
		method: "POST",
		url: host + `/LN/getLNBaseInfo`,
	});
}

/**
 *
 * @returns
 */
export function LNSmarterEnergyList(data) {
	return axiosUtil({
		method: "POST",
		url: host + `/LN/SmarterEnergyList`,
		data: data,
	});
}

/**
 *
 * @returns
 */
export function sum_DL_GLGR(data) {
	return axiosUtil({
		method: "POST",
		url: host + `/LN/sum_DL_GLGR?plantID=${data}`,
	});
}

/**
 * 获取新能源风光占比
 * @returns
 */
export function xnySubjectGetGFBaseInfo() {
	return axiosUtil({
		method: "POST",
		url: host + `/XnySubject/getGFBaseInfo`,
	});
}

/**
 * 获取新能源信息
 * @param {*} xnyid 
 * @returns 
 */
export function XNYDetailGetGFXnyInfo(xnyid) {
	return axiosUtil({
		method: "POST",
		url: host + `/XNYDetail/getGFXnyInfo?xnyID=${xnyid}`,
	});
}

/**
 * 获取新能源信息
 * @param {*} xnyid 
 * @returns 
 */
export function XNYDetailGetFDXnyInfo(xnyid) {
	return axiosUtil({
		method: "POST",
		url: host + `/XNYDetail/getFDXnyInfo?xnyID=${xnyid}`,
	});
}

/**
 * 登录接口
 * @param {*} xnyid 
 * @returns 
 */
export function login(data) {
	const url = `${host}/api/sysAuth/login`;
	return axios.post(url, data);
}


export function getAqscts() {
	const url = `${host}/api/szsb/getAqscts`;
	return axios.post(url);
}


export function getRealtimeData() {
	const url = `${host}/api/szsb/getRealtimeData`;
	return axios.post(url);
}


export function getLoadDataInDay() {
	const url = `${host}/api/szsb/getLoadDataInDay`;
	return axios.post(url);
}


// export function getBKYJSL() {
// 	const url = `${host}/api/szsb/getBKYJSL`;
// 	return axios.post(url);
// }
export function getBKYJSL(data) {
	const url = `${host}/api/szsb/getBKYJSL`;
	// 使用 URLSearchParams 将对象转换为查询字符串
	const params = new URLSearchParams(data).toString();
	return axios.post(`${url}?${params}`);
}


export function getZyYjCountByDw(data) {
	const url = `${host}/api/szsb/getZyYjCountByDw`;
	// 使用 URLSearchParams 将对象转换为查询字符串
	const params = new URLSearchParams(data).toString();
	return axios.post(`${url}?${params}`);
}


export function getQsfxDataList(data) {
	const url = `${host}/api/szsb/getQsfxDataList`;
	// 使用 URLSearchParams 将对象转换为查询字符串
	const params = new URLSearchParams(data).toString();
	return axios.post(`${url}?${params}`);
}

export function getSjData(data) {
	const url = `${host}/api/szsb/getSjData`;
	// 使用 URLSearchParams 将对象转换为查询字符串
	const params = new URLSearchParams(data).toString();
	return axios.post(`${url}?${params}`);
}

export function getYjDataByBk(data) {
	const url = `${host}/api/szsb/getYjDataByBk`;
	// 使用 URLSearchParams 将对象转换为查询字符串
	const params = new URLSearchParams(data).toString();
	return axios.post(`${url}?${params}`);
}



export function getYJList() {
	const url = `${host}/api/szsb/getYJList`;
	return axios.post(url);
}

export function logout() {
	const url = `${host}/api/sysAuth/logout`;
	return axios.post(url);
}




export function getJZListByOrg(data) {
	const url = `${host}/api/sysAuth/getJZListByOrg`;
	return axios.post(url, data);
}


// 在 serve.js 中更新函数
export function getYjCountByJzh(data) {
	const url = `${host}/api/szsb/getYjCountByJzh`;
	// 使用 URLSearchParams 将对象转换为查询字符串
	const params = new URLSearchParams(data).toString();
	return axios.post(`${url}?${params}`);
}



// export function getYjListByJzh(data) {
// 	const url = `${host}/api/sysAuth/getYjListByJzh`;
// 	return axios.post(url, data);
// }

export function getYjListByJzh(data) {
	const url = `${host}/api/szsb/getYjListByJzh`;
	// 使用 URLSearchParams 将对象转换为查询字符串
	const params = new URLSearchParams(data).toString();
	return axios.post(`${url}?${params}`);
}






export function userInfo() {
	const url = `${host}/api/sysAuth/userInfo`;
	return axios.post(url);
}
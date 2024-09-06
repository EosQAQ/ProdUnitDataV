import world from "../../assets/mapData/world.json";
import china from "../../assets/mapData/china.json";

import jiangsu from '../../assets/mapData/jiangsu.json'
import gansu from "../../assets/mapData/gansu.json";
import fujian from "../../assets/mapData/fujian.json";
import guangdong from "../../assets/mapData/guangdong.json";
import guangxi from "../../assets/mapData/guangxi.json";
import anhui from "../../assets/mapData/anhui.json";
import beijing from "../../assets/mapData/beijing.json";
import tianjin from "../../assets/mapData/tianjin.json";
import shanghai from "../../assets/mapData/shanghai.json";
import chongqing from "../../assets/mapData/chongqing.json";
import liaoning from "../../assets/mapData/liaoning.json";
import jilin from "../../assets/mapData/jilin.json";
import henan from "../../assets/mapData/henan.json";
import heilongjiang from "../../assets/mapData/heilongjiang.json";
import hebei from "../../assets/mapData/hebei.json";
import guizhou from "../../assets/mapData/guizhou.json";
import sichuan from "../../assets/mapData/sichuan.json";
import shanxi1 from "../../assets/mapData/shanxi1.json";
import shanxi from "../../assets/mapData/guangxi.json";
import xinjiang from "../../assets/mapData/xinjiang.json";
import neimenggu from "../../assets/mapData/neimenggu.json";
import shandong from "../../assets/mapData/shandong.json";
import zhejiang from "../../assets/mapData/zhejiang.json";
import yunnan from "../../assets/mapData/yunnan.json";
import taiwan from "../../assets/mapData/taiwan.json";
import xizang from "../../assets/mapData/xizang.json";
import hunan from "../../assets/mapData/hunan.json";
import hubei from "../../assets/mapData/hubei.json";
import ningxia from "../../assets/mapData/ningxia.json";


import { LinearToneMapping } from "three";

export function MapData() {
    return {
        world: world,
        中国: china,
        江苏: jiangsu,
        上海: shanghai,
        北京: beijing,
        天津: tianjin,
        重庆: chongqing,
        安徽: anhui,
        // 澳门: aomen,
        福建: fujian,
        甘肃: gansu,
        广东: guangdong,
        广西: guangxi,
        内蒙古:neimenggu,
        新疆:xinjiang,
        山西:shanxi,
        陕西:shanxi1,
        四川:sichuan,
        贵州:guizhou,
        河北:hebei,
        黑龙江:heilongjiang,
        河南:henan,
        吉林:jilin,
        辽宁:liaoning,
        山东:shandong,
        浙江:zhejiang,
        云南:yunnan,
        宁夏:ningxia,
        台湾:taiwan,
        西藏:xizang,
        湖南:hunan,
        湖北:hubei

        // 江北区: CQjiangbei,
    }
}


export function GetMapDataKey() {

    const md = MapData()
    let keys = [];
    for (let k in md) {
        keys.push(k);
    }
    return keys;
}



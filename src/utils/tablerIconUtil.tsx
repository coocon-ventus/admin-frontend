import {Icon123,IconHelp,IconBrandChrome,IconDashboard,IconKey,
IconChartBar,IconApps,IconSettings,IconDeviceDesktopAnalytics} from '@tabler/icons';

const map = new Map();
map.set("Icon123" ,Icon123);
map.set("IconHelp" ,IconHelp);
map.set("IconBrandChrome" ,IconBrandChrome);
map.set("IconDashboard" ,IconDashboard);
map.set("IconKey" ,IconKey);
map.set("IconChartBar" ,IconChartBar);
map.set("IconApps" ,IconApps);
map.set("IconSettings" ,IconSettings);
map.set("IconDeviceDesktopAnalytics" ,IconDeviceDesktopAnalytics);
 const tablerIconUtil = (iconName:string) =>{
    return map.get(iconName);
};

export default tablerIconUtil;
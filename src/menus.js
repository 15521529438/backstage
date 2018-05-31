const menus = [
	{
		name: '信息总览',
		key: 'sub1',
		icon: 'gift',
		routePath: '',
		isMenuFirst: true,
		children: [
			{
				name: '数据驾驶舱',
				key: 1,
				routePath: 'banner',
			},
			{
				name: '项目总览',
				key: 2,
				routePath: 'itemcollect',
			},
			{
				name: '工点总览',
				key: 3,
				routePath: 'workingpoint',
			},
		],
	},
	{
		name: '工程配置',
		key: 'sub2',
		icon: 'gift',
		routePath: '',
		children: [
			{
				name: '信息项目配置',
				key: 4,
				routePath: 'projectmessage',
			},
			{
				name: '工程进度管理',
				key: 5,
				routePath: 'projectprogress',
			},
			{
				name: '工程文档管理',
				key: 6,
				routePath: 'projectdocument',
			},
		],
	},
	{
		name: '检测管理',
		key: 'sub3',
		icon: 'gift',
		routePath: '',
		children: [
			{
				name: '测点配置',
				key: 7,
				routePath: 'detectionPointConfig',
			},
			{
				name: '数据录入',
				key: 8,
				routePath: '',
			},
			{
				name: '数据查询',
				key: 9,
				routePath: '',
			},
		],
	},
	{
		name: '风险源管理',
		key: 'sub4',
		icon: 'gift',
		routePath: '',
		children: [
			{
				name: '测点配置',
				key: 10,
				routePath: '',
			},
			{
				name: '数据录入',
				key: 11,
				routePath: '',
			},
			{
				name: '数据查询',
				key: 12,
				routePath: '',
			},
		],
	},
	{
		name: '预警分级处理',
		key: 'sub5',
		icon: 'gift',
		routePath: '',
		children: [
			{
				name: '预警推送',
				key: 13,
				routePath: '',
			},
			{
				name: '数据录入',
				key: 14,
				routePath: '',
			},
			{
				name: '数据查询',
				key: 15,
				routePath: '',
			},
		],
	},
]


export default menus;
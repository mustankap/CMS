import { Icon } from "@iconify/react";
import pieChart2Fill from "@iconify/icons-eva/pie-chart-2-fill";
import peopleFill from "@iconify/icons-eva/people-fill";
import shoppingBagFill from "@iconify/icons-eva/shopping-bag-fill";
import fileTextFill from "@iconify/icons-eva/file-text-fill";
import lockFill from "@iconify/icons-eva/lock-fill";
import personAddFill from "@iconify/icons-eva/person-add-fill";
import alertTriangleFill from "@iconify/icons-eva/alert-triangle-fill";

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
	{
		title: "dashboard",
		path: "/dashboard/app",
		icon: getIcon(pieChart2Fill),
	},
	{
		title: "Employees",
		path: "/dashboard/employees",
		icon: getIcon(peopleFill),
	},
	{
		title: "Custodians",
		path: "/dashboard/gunmen",
		icon: getIcon(peopleFill),
	},
	{
		title: "Vendors",
		path: "/dashboard/vendors",
		icon: getIcon(peopleFill),
	},
	{
		title: "Branch",
		path: "/dashboard/branch",
		icon: getIcon(peopleFill),
	},
	{
		title: "Vehicle",
		path: "/dashboard/vehicle",
		icon: getIcon(peopleFill),
	},
	{
		title: "Region",
		path: "/dashboard/region",
		icon: getIcon(peopleFill),
	},
	{
		title: "trip",
		path: "/dashboard/trip",
		icon: getIcon(shoppingBagFill),
	},
];
// 	{
// 		title: "product",
// 		path: "/dashboard/products",
// 		icon: getIcon(shoppingBagFill),
// 	},
// 	{
// 		title: "blog",
// 		path: "/dashboard/blog",
// 		icon: getIcon(fileTextFill),
// 	},
// 	{
// 		title: "login",
// 		path: "/login",
// 		icon: getIcon(lockFill),
// 	},
// 	//   {
// 	//     title: 'register',
// 	//     path: '/register',
// 	//     icon: getIcon(personAddFill)
// 	//   },
// 	{
// 		title: "Not found",
// 		path: "/404",
// 		icon: getIcon(alertTriangleFill),
// 	},
// ];

export default sidebarConfig;

// Filename - components/SidebarData.js

import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import { FaCalendar } from "react-icons/fa";
import { CiViewList } from "react-icons/ci";
import { FaTableList } from "react-icons/fa6";
import { FaPersonCirclePlus } from "react-icons/fa6";
import { FaUserDoctor } from "react-icons/fa6";

export const SidebarData = [
	{
		title: "Calendar",
		path: "/about-us",
		icon: <FaCalendar />,
		//iconClosed: <RiIcons.RiArrowDownSFill />,
		//iconOpened: <RiIcons.RiArrowUpSFill />,

		subNav: [
			{
				title: "Our Aim",
				path: "/about-us/aim",
				icon: <IoIcons.IoIosPaper />,
			},
			{
				title: "Our Vision",
				path: "/about-us/vision",
				icon: <IoIcons.IoIosPaper />,
			},
		],
	},
	{
		title: "Appointments",
		path: "/services",
		icon: <FaTableList />,
		//iconClosed: <RiIcons.RiArrowDownSFill />,
		//iconOpened: <RiIcons.RiArrowUpSFill />,

		subNav: [
			{
				title: "Service 1",
				path: "/services/services1",
				icon: <IoIcons.IoIosPaper />,
				cName: "sub-nav",
			},
			{
				title: "Service 2",
				path: "/services/services2",
				icon: <IoIcons.IoIosPaper />,
				cName: "sub-nav",
			},
			{
				title: "Service 3",
				path: "/services/services3",
				icon: <IoIcons.IoIosPaper />,
			},
		],
	},
	{
		title: "Patients",
		path: "/contact",
		icon: <FaPersonCirclePlus />,
	},
	{
		title: "Doctors",
		path: "/events",
		icon: <FaUserDoctor />,

		//iconClosed: <RiIcons.RiArrowDownSFill />,
		//iconOpened: <RiIcons.RiArrowUpSFill />,

		subNav: [
			{
				title: "Event 1",
				path: "/events/events1",
				icon: <IoIcons.IoIosPaper />,
			},
			{
				title: "Event 2",
				path: "/events/events2",
				icon: <IoIcons.IoIosPaper />,
			},
		],
	},
	{
		title: "Support",
		path: "/support",
		icon: <IoIcons.IoMdHelpCircle />,
	},
];

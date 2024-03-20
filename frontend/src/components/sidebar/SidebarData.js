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
		path: "/admin-calendar-view",
		icon: <FaCalendar />,
		//iconClosed: <RiIcons.RiArrowDownSFill />,
		//iconOpened: <RiIcons.RiArrowUpSFill />,

		
	},
	{
		title: "Appointments",
		path: "/admin-appointments",
		icon: <FaTableList />,
		//iconClosed: <RiIcons.RiArrowDownSFill />,
		//iconOpened: <RiIcons.RiArrowUpSFill />,

		
	},
	{
		title: "Patients",
		path: "/admin-patients",
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
];

// Filename - components/SidebarData.js

import React from "react";
import * as IoIcons from "react-icons/io";
import { FaCalendar } from "react-icons/fa";
import { FaTableList } from "react-icons/fa6";
import { FaPersonCirclePlus } from "react-icons/fa6";
import { FaUserDoctor } from "react-icons/fa6";

export const SidebarData = [
	{
		title: "Calendar",
		path: "/admin-calendar-view",
		icon: <FaCalendar />,
	},
	{
		title: "Appointments",
		path: "/admin-appointments",
		icon: <FaTableList />,
	},
	{
		title: "Patients",
		path: "/admin-patients",
		icon: <FaPersonCirclePlus />,
	},
];

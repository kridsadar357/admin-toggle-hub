import { LayoutDashboard, AppWindow, Users, Users2 } from "lucide-react";
import Index from "./pages/Index.jsx";
import AppsList from "./pages/AppsList.jsx";
import UsersList from "./pages/UsersList.jsx";
import TeamsList from "./pages/TeamsList.jsx";

export const navItems = [
  {
    title: "Overview",
    to: "/",
    icon: <LayoutDashboard className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Apps",
    to: "/apps",
    icon: <AppWindow className="h-4 w-4" />,
    page: <AppsList />,
    subItems: [
      { title: "Manage", to: "/apps/manage" },
      { title: "Upload", to: "/apps/upload" },
    ],
  },
  {
    title: "Users",
    to: "/users",
    icon: <Users className="h-4 w-4" />,
    page: <UsersList />,
  },
  {
    title: "Teams",
    to: "/teams",
    icon: <Users2 className="h-4 w-4" />,
    page: <TeamsList />,
  },
];

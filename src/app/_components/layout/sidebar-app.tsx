import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "~/components/ui/sidebar";
import Logo from "../logo/logo";
import NavbarSearch from "~/app/_features/search/navbar-search";
import { Cloud, Search, Settings, Sun, Clock } from "lucide-react";

const data = {
  navMain: [
    {
      title: "Weather",
      url: "#",
      items: [
        {
          title: "Current",
          url: "/weather",
          icon: <Cloud className="mr-2 h-4 w-4" />,
        },
        {
          title: "Hourly",
          url: "/weather/hourly",
          icon: <Clock className="mr-2 h-4 w-4" />,
        },
        {
          title: "Daily",
          url: "/weather/daily",
          icon: <Sun className="mr-2 h-4 w-4" />,
        },
      ],
    },
    {
      title: "Search",
      url: "/search",
      items: [
        {
          title: "Find Location",
          url: "/search",
          icon: <Search className="mr-2 h-4 w-4" />,
        },
      ],
    },
    {
      title: "Settings",
      url: "/settings",
      items: [
        {
          title: "Preferences",
          url: "/settings",
          icon: <Settings className="mr-2 h-4 w-4" />,
        },
      ],
    },
  ],
};

export function SidebarApp({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Logo />
        <NavbarSearch />
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url} className="flex items-center">
                        {item.icon}
                        {item.title}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

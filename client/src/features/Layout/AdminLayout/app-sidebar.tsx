import {Calendar, CircleQuestionMark,  FileText, FileUser,Layers,ListTree,Package,Palette, Ruler, Settings, ShoppingCart, SlidersHorizontal, Stethoscope, TicketPercent } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { title } from "process"
import { url } from "inspector"

const items = [
    {
        title: "Products",
        url: "/admin/products",
        icon: Package ,
    },
    {
        title: " Orders",
        url: "/admin/orders",
        icon: ShoppingCart,
    },
    {
        title: "Personals",
        url: "/admin/personals",
        icon: FileUser,
    },
    {
        title: "Personal Specialties",
        url: "/admin/personal-specialties",
        icon: Stethoscope,
    },
    {
        title: "Blog",
        url:"/admin/blog",
        icon: FileText,
    },
    {
        title: "Questions",
        url: "/admin/questions",
        icon: CircleQuestionMark,
    },
    {
        title: "Appointments",
        url: "/admin/appointments",
        icon: Calendar,
    },
    {
        title: "Coupons",
        url: "/admin/coupons",
        icon: TicketPercent,
    },
    {
        title: "Courses",
        url: "/admin/courses",
        icon: ListTree,
    },
    
]

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel><Settings size={24} strokeWidth={3} className="mr-1" />Admin Dashboard</SidebarGroupLabel>
                    <SidebarGroupContent className="">
                        <SidebarMenu className="mt-2">
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
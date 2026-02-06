import {Calendar, CircleQuestionMark,  FileText, FileUser,IdCardLanyard,Layers,ListTree,LogOut,Package,Palette, Ruler, Settings, ShoppingCart, SlidersHorizontal, Stethoscope, TicketPercent } from "lucide-react"

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
import Link from "next/link"

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
        icon: IdCardLanyard ,
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
                    <SidebarGroupLabel className="w-[70px] p-3 transition hover:bg-white hover:text-[#ff1949] border-[1px] hover:border-[#ff1949]">
                        <Link href="/">
                        <button className="flex items-center gap-1 text-[12px]"> Back <LogOut size={14} /> </button>
                        </Link>
                    </SidebarGroupLabel>
                    <SidebarGroupLabel className="pl-5">
                        Admin Dashboard
                    </SidebarGroupLabel>
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
"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./app-sidebar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem("token")

        if (!token) {
            router.replace("/error")
            return
        }

        try {
            const payload = JSON.parse(atob(token.split(".")[1]))

            if (payload.role !== "admin") {
                router.replace("/error") // və ya /403
            }
        } catch (err) {
            router.replace("/login")
        }
    }, [])

    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full px-6">
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    )
}

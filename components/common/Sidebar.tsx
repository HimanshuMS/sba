"use client"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
  } from "@/components/ui/navigation-menu"
import Link from "next/link"

export default function Sidebar() {
    return(
        <div className="flex flex-col w-[300px] min-w-[300px] border-r min-h-screen p-4">
            <h1>Simple Budget</h1>
            <NavigationMenu>
                <NavigationMenuList className="flex flex-col">
                    <NavigationMenuItem>
                        <Link href="/dashboard/settings" legacyBehavior passHref>
                            <NavigationMenuLink className={`${navigationMenuTriggerStyle()} w-full`}>
                                Settings
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/dashboard/loans" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Loans
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}
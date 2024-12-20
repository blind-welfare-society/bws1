"use client";
import Link from "next/link.js";
import { usePathname } from "next/navigation";
import menu_data from "../../../data/MenuData";
import React, { useState } from "react";

const NavMenu = () => {
    const [navTitle, setNavTitle] = useState("");
    const currentRoute = usePathname();

    const isMenuItemActive = (menuLink: string) => {
        return currentRoute === menuLink;
    };

    const isSubMenuItemActive = (subMenuLink: string) => {
        return currentRoute === subMenuLink;
    };

    //openMobileMenu
    const openMobileMenu = (menu: any) => {
        if (navTitle === menu) {
            setNavTitle("");
        } else {
            setNavTitle(menu);
        }
    };

    const toggleSubMenu = (menuTitle: string) => {
        setNavTitle((prev) => (prev === menuTitle ? "" : menuTitle));
    };

    return (
        <ul className="navbar-nav menu-open text-lg-end">
            {menu_data.map((menu: any) => (
                <li key={menu.id}
                    onClick={() => openMobileMenu(menu.title)}
                    className={`nav-item ${menu.has_dropdown ? "menu-item-has-children" : ""} 
                    ${navTitle === menu.title ? "open" : ""} `}
                    title={menu.title}
                >
                    <Link
                        href={menu.link}
                        role="button"
                        aria-current={isMenuItemActive(menu.link) ? "page" : undefined}
                        aria-expanded={menu.has_dropdown && navTitle === menu.title}
                        aria-haspopup={menu.has_dropdown ? "true" : "false"}
                        className={`${isMenuItemActive(menu.link) ? "active" : ""}`}
                    >
                        {menu.title}
                    </Link>

                    {menu.has_dropdown && (
                        <>
                            {menu.sub_menus && (
                                <ul
                                    className="sub-menu"
                                    role="menu"
                                    aria-label={`${menu.title} submenu`}
                                    hidden={navTitle !== menu.title}
                                >
                                    {menu.sub_menus &&
                                        menu.sub_menus.map((sub_m: any, i: number) => (
                                            <li key={i} role="none">
                                                <Link
                                                    href={sub_m.link}
                                                    role="menuitem"
                                                    aria-current={isSubMenuItemActive(sub_m.link) ? "page" : undefined}
                                                    className={isSubMenuItemActive(sub_m.link) ? "active" : ""}
                                                >
                                                    {sub_m.title}
                                                </Link>
                                            </li>
                                        ))}
                                </ul>
                            )}
                        </>
                    )}
                </li>
            ))}
            <li className="donate-btn-mobile" title="Donate Now"><Link role="menuitem" className="" href="/donate">Donate Now</Link></li>
        </ul>
    );
};

export default NavMenu;


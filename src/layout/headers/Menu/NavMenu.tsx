"use client";
import Link from "next/link.js";
import { usePathname } from "next/navigation";
import menu_data from "../../../data/MenuData";
import React, { useState } from "react";

const NavMenu = () => {
    const [navTitle, setNavTitle] = useState<string | null>(null);
    const currentRoute = usePathname();

    const isMenuItemActive = (menuLink: string) => currentRoute === menuLink;

    const isSubMenuItemActive = (subMenuLink: string) => currentRoute === subMenuLink;

    const toggleSubMenu = (menuTitle: string) => {
        setNavTitle((prev) => (prev === menuTitle ? null : menuTitle));
    };

    return (
        <ul className="navbar-nav menu-open text-lg-end">
            {menu_data.map((menu: any) => (
                <li
                    key={menu.id}
                    className={`nav-item ${menu.has_dropdown ? "menu-item-has-children" : ""} 
                        ${navTitle === menu.title ? "open" : ""}`}
                    title={menu.title}
                >
                    {menu.has_dropdown ? (
                       <Link
                            href={menu.link || "#"}
                            role="button"
                            aria-haspopup={menu.has_dropdown ? "true" : undefined}
                            aria-expanded={menu.has_dropdown && navTitle === menu.title ? "true" : "false"}
                            aria-controls={menu.has_dropdown ? `submenu-${menu.id}` : undefined}
                            className={`${isMenuItemActive(menu.link)  ? "active" : ""}`}
                            onClick={(e) => {
                                if (menu.has_dropdown) {
                                    e.preventDefault(); // Prevent navigation for dropdown toggles
                                    toggleSubMenu(menu.title);
                                }
                            }}
                        >
                            {menu.title}
                        </Link>
                    ): (
                        <Link
                            href={menu.link}
                            aria-current={isMenuItemActive(menu.link) ? "page" : undefined}
                            className={`${isMenuItemActive(menu.link) ? "active" : ""}`}
                        >
                            {menu.title}
                         </Link>   
                    )}

                    {menu.has_dropdown && menu.sub_menus && (
                        <ul
                            id={`submenu-${menu.id}`}
                            className="sub-menu"
                            role="menu"
                            aria-hidden={navTitle !== menu.title}
                        >
                            {menu.sub_menus.map((sub_m: any, i: number) => (
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
                </li>
            ))}
            <li className="donate-btn-mobile" title="Donate Now">
                <Link role="menuitem" href="/donate">Donate Now</Link>
            </li>
        </ul>
    );
};

export default NavMenu;
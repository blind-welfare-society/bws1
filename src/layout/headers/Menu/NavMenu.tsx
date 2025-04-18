"use client";
import Link from "next/link.js";
import { usePathname } from "next/navigation";
import menu_data from "../../../data/MenuData";
import React, { useState } from "react";

const NavMenu = () => {
    const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
    const currentRoute = usePathname();

    const isMenuItemActive = (menuLink: string) => currentRoute === menuLink;

    const isSubMenuItemActive = (subMenuLink: string) => currentRoute === subMenuLink;

    const handleMenuToggle = (menuTitle: string) => {
        setExpandedMenu((prev) => (prev === menuTitle ? null : menuTitle));
    };

    const handleKeyPress = (event: React.KeyboardEvent, menuTitle: string) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleMenuToggle(menuTitle);
        }
    };

    return (
        <ul className="navbar-nav menu-open text-lg-end" role="menubar">
            {menu_data.map((menu: any) => (
                <li
                    key={menu.id}
                    className={`nav-item ${menu.has_dropdown ? "menu-item-has-children" : ""} 
                        ${expandedMenu === menu.title ? "open" : ""}`}
                    title={menu.title}
                >
                    {menu.has_dropdown ? (
                        <a
                            href={menu.link || "#"}
                            role="button"
                            aria-expanded={menu.has_dropdown && expandedMenu === menu.title ? "true" : "false"}
                            tabIndex={0}
                            className={`nav-link ${isMenuItemActive(menu.link) ? "active" : ""}`}
                            id={menu.has_dropdown ? `accessible-submenu-${menu.id}` : undefined}
                            aria-controls={menu.has_dropdown ? `accessible-submenu-${menu.id + 1}` : undefined}
                            //aria-haspopup={menu.has_dropdown ? "true" : undefined}
                            //aria-label={`${menu.has_dropdown && expandedMenu === menu.title ? menu.title + " Expanded" : menu.title + " Collapsed"}`}
                            onClick={(e) => {
                                if (menu.has_dropdown) {
                                    e.preventDefault();
                                    handleMenuToggle(menu.title);
                                }
                            }}
                            onKeyDown={(e) => handleKeyPress(e, menu.title)}
                        >
                            {menu.title}
                        </a>
                    ): (
                        <a
                        href={menu.link || "#"}
                        className={`nav-link ${isMenuItemActive(menu.link) ? "active" : ""}`}
                        >
                            {menu.title}
                        </a>
                    )}
                    {menu.has_dropdown && menu.sub_menus && (
                        /* eslint-disable */
                        <div
                            className="sub-nav sub-menu"
                            role="region"
                            id={`accessible-submenu-${menu.id + 1}`}
                            aria-expanded={expandedMenu == menu.title}
                            aria-hidden={expandedMenu !== menu.title}
                            aria-labelledby={`accessible-submenu-${menu.id}`}
                        >
                            <ul className="sub-nav-group">
                                {menu.sub_menus.map((sub_m: any, i: number) => (
                                    <li key={i} title={sub_m.title}>
                                        <Link
                                            href={sub_m.link}
                                            aria-current={isSubMenuItemActive(sub_m.link) ? "page" : undefined}
                                            className={isSubMenuItemActive(sub_m.link) ? "active" : ""}
                                            tabIndex={expandedMenu === menu.title ? 0 : -1}
                                        >
                                            {sub_m.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        /* eslint-disable */
                    )}
                </li>
            ))}
            <li className="donate-btn-mobile" title="Donate Now">
                <Link href="/donate" style={{ color: "#fff", backgroundColor: "#f84d42"}}>Donate Now</Link>
            </li>
        </ul>
    );
};

export default NavMenu;
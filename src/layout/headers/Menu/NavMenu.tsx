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
        setExpandedMenu((prev) => (prev === menuTitle ? null : menuTitle)); // Toggle expanded state
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
                            aria-haspopup="true"
                            aria-expanded={expandedMenu === menu.title ? "true" : "false"}  // Reflect toggle state
                            aria-controls={`submenu-${menu.id}`} // Control the submenu
                            id={`accessible-submenu-${menu.id}`}
                            className={`nav-link ${isMenuItemActive(menu.link) ? "active" : ""}`}
                            onClick={(e) => {
                                if (menu.has_dropdown) {
                                    e.preventDefault();
                                    handleMenuToggle(menu.title);  // Toggle submenu visibility
                                }
                            }}
                            onKeyDown={(e) => handleKeyPress(e, menu.title)}
                            tabIndex={0}
                        >
                            {menu.title}
                        </a>
                    ) : (
                        <a
                            href={menu.link || "#"}
                            className={`nav-link ${isMenuItemActive(menu.link) ? "active" : ""}`}
                        >
                            {menu.title}
                        </a>
                    )}
                    {menu.has_dropdown && menu.sub_menus && (
                        <div
                            id={`submenu-${menu.id}`}
                            role=""
                            className={`sub-nav sub-menu ${expandedMenu === menu.title ? "show" : "collapse"}`}  // Added `collapse` and `show` for visibility toggling
                            aria-expanded={expandedMenu === menu.title ? "true" : "false"}  // Updated on toggle
                            aria-hidden={expandedMenu !== menu.title ? "true" : "false"}
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
                    )}
                </li>
            ))}
            <li className="donate-btn-mobile" title="Donate Now">
                <Link href="/donate">Donate Now</Link>
            </li>
        </ul>
    );
};

export default NavMenu;

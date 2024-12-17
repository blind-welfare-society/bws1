"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import menu_data from "../../../data/MenuData";

const NavMenu = () => {
    const [navTitle, setNavTitle] = useState("");
    const currentRoute = usePathname();

    const isMenuItemActive = (menuLink: string) => {
        return currentRoute === menuLink;
    };

    const isSubMenuItemActive = (subMenuLink: string) => {
        return currentRoute === subMenuLink;
    };

    const openMenuOnHover = (menu: string) => {
        setNavTitle(menu);
    };

    const closeMenuOnBlur = () => {
        setNavTitle("");
    };

    return (
        <ul className="navbar-nav menu-open text-lg-end" role="menu">
            {menu_data.map((menu: any) => (
                <li
                    key={menu.id}
                    className={`menu-item ${menu.has_dropdown ? "menu-item-has-children" : ""} ${
                        navTitle === menu.title ? "open" : ""
                    }`}
                    role="button"
                    aria-haspopup={menu.has_dropdown ? "true" : "false"}
                    aria-expanded={menu.has_dropdown && navTitle === menu.title ? "true" : "false"}
                    onMouseEnter={() => openMenuOnHover(menu.title)}
                    onMouseLeave={closeMenuOnBlur}
                    onFocus={() => openMenuOnHover(menu.title)} // For keyboard users
                    onBlur={closeMenuOnBlur} // Close when focus leaves
                >
                    <Link
                        href={menu.link}
                        className={`menu-link ${
                            navTitle === menu.title ? "active" : ""
                        } ${(isMenuItemActive(menu.link) || (menu.sub_menus && menu.sub_menus.some((sub_m: any) => sub_m.link && isSubMenuItemActive(sub_m.link)))) ? "active" : ""}`}
                    >
                        {menu.title}
                    </Link>

                    {menu.has_dropdown && (
                        <ul
                            className="sub-menu"
                            role="menu"
                            style={{ display: navTitle === menu.title ? "block" : "none" }}
                        >
                            {menu.sub_menus.map((sub_m: any, i: number) => (
                                <li key={i} className="sub-menu-item" role="menuitem">
                                    <Link
                                        href={sub_m.link}
                                        className={navTitle === menu.title ? "active" : ""}
                                    >
                                        {sub_m.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </li>
            ))}
            <li className="donate-btn-mobile" role="menuitem">
                <Link href="/donate">Donate Now</Link>
            </li>
        </ul>
    );
};

export default NavMenu;

interface MenuItem {
    id: number;
    title: string;
    link: string;
    has_dropdown: boolean;
    sub_menus?: {
        link: string;
        title: string;
    }[];
}[];

const menu_data: MenuItem[] = [

    {
        id: 1,
        has_dropdown: true,
        title: "Home",
        link: "/",
    },
    {
        id: 2,
        has_dropdown: true,
        title: "About Us",
        link: "",
        sub_menus: [
            { link: "/about-us", title: "Overview" },
            { link: "/mission-and-vision", title: "Mission and Vision" },
            { link: "/our-founder", title: "Our Founder" },
            { link: "/volunteer", title: "Volunteer" },
        ],
    },
    {
        id: 3,
        has_dropdown: true,
        title: "Our Activities",
        link: "",
        sub_menus: [
            { link: "/our-projects", title: "Our Projects" },
            { link: "/news", title: "News & Events" },
            { link: "/featured-campaigns", title: "Featured Campaigns" },
            { link: "/stories-of-change", title: "Stories of Change" },
            { link: "/testimonials", title: "Testimonials" },
        ],
    },
    {
        id: 4,
        has_dropdown: true,
        title: "Gallery",
        link: "",
        sub_menus: [
            { link: "/gallery", title: "Photo Gallery" },
            { link: "/videos", title: "Video Gallery" },
        ],
    },
    {
        id: 5,
        has_dropdown: true,
        title: "Donate Now",
        link: "/donate",
    },
    {
        id: 6,
        has_dropdown: true,
        title: "Blogs",
        link: "/blogs",
    },
];
export default menu_data;

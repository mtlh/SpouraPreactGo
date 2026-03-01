import { FunctionComponent } from "preact";

interface MenuItem {
    label: string;
    href: string;
}

interface MenuSection {
    title: string;
    items: MenuItem[];
}

interface MegaMenuProps {
    title: string;
    description?: string;
    sections: MenuSection[];
    typeChar?: string; // 'm', 'w', or 'k' for shop filtering
}

// Map title to type character for "View All" link
const getTypeChar = (title: string, fallback?: string): string => {
    const lower = title.toLowerCase();
    if (lower.includes("men")) return "m";
    if (lower.includes("women")) return "w";
    if (lower.includes("kid")) return "k";
    return fallback || "";
};

export const MegaMenu: FunctionComponent<MegaMenuProps> = ({
    title,
    description = "Select what suits your style best...",
    sections,
    typeChar,
}) => {
    const shopType = typeChar || getTypeChar(title);

    return (
        <div className="p-6 mega-menu mb-16 sm:mb-0 shadow-2xl bg-gradient-to-r from-blue-500 to-blue-700">
            <div className="grid grid-cols-4 max-w-7xl m-auto gap-6">
                {/* Title Section */}
                <div className="col-span-1">
                    <h2 className="font-bold text-4xl flex pb-4 text-white">{title}</h2>
                    <p className="text-lg text-white/80">{description}</p>
                    {shopType && (
                        <a
                            href={`/shop?type=${shopType}`}
                            className="inline-block mt-4 px-6 py-2 rounded-full border-2 border-white text-white font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200"
                        >
                            View All {title}
                        </a>
                    )}
                </div>

                {/* Menu Sections */}
                {sections.map((section) => (
                    <div key={section.title} className="grid grid-cols-1 p-2">
                        <div className="font-semibold text-xl flex items-center gap-2 text-white mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            {section.title}
                        </div>
                        <ul className="space-y-2">
                            {section.items.map((item) => (
                                <li key={item.href}>
                                    <a
                                        className="text-white/80 hover:text-white hover:underline text-base transition-all duration-200 inline-block"
                                        href={item.href}
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

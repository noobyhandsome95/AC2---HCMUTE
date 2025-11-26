import { Link } from "react-router-dom";
import type { IconButtonType } from "../../Types";
import { BoxSearch } from "./BoxSearch";

interface PopupComponentProps {
    links: IconButtonType[];
    hasSearch?: boolean;
}

export const PopupComponent = ({ links, hasSearch }: PopupComponentProps) => {
    const itemClass = "w-full px-12 py-3 text-white flex flex-row items-center justify-start space-x-3 rounded-sm hover:bg-primary-dark/40 transition-all-300 cursor-pointer";

    return (
        <div className="bg-primary rounded flex flex-col min-w-[160px]">
            {hasSearch && (
                <div className="px-4 pt-2">
                    <BoxSearch
                        currentWidth="w-full"
                        currentHeight="h-10"
                        bgColor="bg-primary-dark/30"
                        hoverBgColor="hover:bg-primary-dark/50"
                        textColor="text-white"
                    />
                </div>
            )}
            {links.map((link) => (
                link.onClick ? (
                    <button
                        key={link.title}
                        onClick={link.onClick}
                        className={itemClass}
                    >
                        {link.icon}
                        <span>{link.title}</span>
                    </button>
                ) : (
                    <Link
                        key={link.title}
                        to={link.url}
                        className={itemClass}
                    >
                        {link.icon}
                        <span>{link.title}</span>
                    </Link>
                )
            ))}
        </div>
    );
};

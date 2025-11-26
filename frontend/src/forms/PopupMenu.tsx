import { FaFileAlt } from "react-icons/fa";
import { PopupComponent } from "../components/sub/PopupComponent";
import type { IconButtonType } from "../Types";
import { FaMap, FaPager } from "react-icons/fa6";
import { PiExamFill } from "react-icons/pi";

export const PopupMenu = (props: { isOpen: boolean }) => {
    const allLinks: IconButtonType[] = [
        {
            icon: <FaMap size="22" />,
            title: "Roadmap",
            url: "/roadmap",
        },
        {
            icon: <FaPager size="22" />,
            title: "Blogs",
            url: "/blogs",
        },
        {
            icon: <FaFileAlt size="22" />,
            title: "Documents",
            url: "/documents",
        },
        {
            icon: <PiExamFill size="22" />,
            title: "Exams",
            url: "/exams",
        },
    ];

    return (
        <div
            className={`
                  absolute right-0 top-full mt-4
                  p-[2px] rounded-md shadow-lg animated-rgb-border
                  transition-all-300 transform
                  ${props.isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}`}
        >
            <PopupComponent links={allLinks} hasSearch={true} />
        </div>
    );
};

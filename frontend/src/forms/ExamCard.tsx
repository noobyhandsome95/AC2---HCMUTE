import { FaStar } from "react-icons/fa";
import type { ExamType } from "../Types";

interface ExamCardProps {
    maxWidth?: string;
    minWidth?: string;
    currentWidth: string;
    bgColor?: string;
    subClassName?: string;
    disableZoom?: boolean;
    data: ExamType;
}

export const ExamCard = ({
    maxWidth,
    minWidth,
    currentWidth,
    bgColor,
    subClassName,
    disableZoom,
    data,
}: ExamCardProps) => {
    const progress = Math.min(Math.max(data.completionCount || 0, 0), 100);

    return (
        <button className={` 
          ${maxWidth} ${minWidth} ${currentWidth} ${bgColor} 
          pb-4 h-full flex flex-col items-start justify-center rounded-lg transition-all-300
          ${subClassName} ${disableZoom ? "" : "hover:scale-105"}`}
        >
            <div className="w-full aspect-[16/9] rounded-lg overflow-hidden outline outline-[1px] outline-primary-dark/80 shadow-lg">
                <img
                    src={data.coverImage || "card-default.jpg"}
                    alt={data.title}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="px-4 pt-2 w-full text-2xl text-left font-bold text-white line-clamp-2">{data.title}</div>

            <div className="px-4 w-full text-sm text-left font-semibold text-white/60 line-clamp-1 break-all">
                {data.author?.displayName || "Unknown Author"}
            </div>

            <div className="w-full py-2 px-4 mt-auto">
                <div className="w-full h-[3px] bg-white/10 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-secondary/90 transition-all-300 ease-out"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>

            <div className="w-full px-4 pt-1 flex-between flex-row">
                <span className="text-white/80 text-xs font-semibold">
                    {data.completionCount ? `${data.completionCount}% complete` : "Start Course"}
                </span>
                <div className="flex text-yellow-300 gap-0.5">
                    {[...Array(5)].map((_, i) => (
                        <FaStar key={i} size={12} />
                    ))}
                </div>
            </div>
        </button>
    );
};

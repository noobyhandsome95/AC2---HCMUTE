import { FaBookOpen, FaChartLine } from "react-icons/fa";

interface CardProps {
  subClassName?: string;
  maxWidth?: string;
  minWidth?: string;
  currentWidth: string;
  bgColor?: string;
  title: string;
  author: string;
  subscription?: string;
  tags: string[];
  views: number;
  duration: string;
  logoURL?: string;
  disableZoom?: boolean;
}

export const CardBlog = (props: CardProps) => {
  const zoomClass = props.disableZoom ? "" : "hover:scale-105";
    return (
        <div className={`
          ${props.maxWidth} ${props.minWidth} ${props.currentWidth} ${props.bgColor}
          pb-4 h-full flex flex-col items-start justify-start rounded-lg transition-all-300 cursor-pointer 
          ${props.subClassName} ${zoomClass}`}
        >
          <button className="w-full aspect-[16/9] rounded-lg overflow-hidden outline outline-[1px] outline-primary-dark/80 shadow-lg">
            <img src={props.logoURL || "card-default.jpg"} alt="card"/>
          </button>
          <ul className="w-[90%] flex flex-row flex-nowrap items-center overflow-hidden gap-3 pl-3 py-2">
            {props.tags.map((tag) => (
              <button key={tag} className="btn-rgb-shadow flex-shrink-0 px-2 bg-primary-dark/30 text-sm text-center text-accent rounded-lg outline outline-[1px] outline-accent/40 hover:text-blue-200 hover:bg-primary-dark/80 hover:outline-accent/80 transition-all-300">
                {tag}
              </button>
            ))}
          </ul>
          <button className="px-4 w-full leading-8 text-2xl text-left font-bold text-white line-clamp-1">{props.title}</button>
          {props.subscription && <button className="px-4 w-full text-sm text-left font-semibold text-white/60 line-clamp-2 break-all">{props.subscription}</button>}
          <button className="mt-auto px-4 text-sm text-left font-semibold text-white line-clamp-1 break-all hover:text-white/60 transition-all-300">{props.author}</button>
          <div className="pl-4 w-full flex flex-row items-center justify-start space-x-2">
            <div className="text-white/60"><FaBookOpen size='16'/></div>
            <p className="text-white/60">{props.duration}</p>
            <div className="text-white/60">•</div>
            <div className="text-white/60"><FaChartLine size='16'/></div>
            <p className="text-white/60">{props.views} views</p>
          </div>
        </div>
    );
};


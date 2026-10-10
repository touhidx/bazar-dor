import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
import { FaCaretDown, FaCaretUp } from "react-icons/fa6";

const Marquee = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
  );
  const data = await res.json();
  return (
    <div>
      <MarqueeText direction="right" duration={10}>
        {data.map((h) => (
          <div
            key={h.id}
            className="border-l border-l-gray-300 pl-3 pr-4 py-2 flex items-center gap-2 text-sm"
          >
            <span className="flex items-center gap-1 font-medium">
              <span>{h.categoryIcon}</span>
              <span>{h.nameBn}</span>
            </span>

            <span className="text-gray-700">
              {h.today.toLocaleString("bn-BD")} টাকা/কেজি
            </span>

            {h.change.dir === "down" ? (
              <span className="flex  text-[#D03739] font-semibold gap-0.5">
                <FaCaretUp className="text-base" />
                <span>{h.change.pct.toLocaleString("bn-BD")} %</span>
              </span>
            ) : (
              <span className="flex items-center text-[#1A9951] font-semibold gap-0.5">
                <FaCaretDown className="text-base" />
                <span>{h.change.pct.toLocaleString("bn-BD")} %</span>
              </span>
            )}
          </div>
        ))}
      </MarqueeText>
      <hr className="text-gray-200" />
    </div>
  );
};

export default Marquee;

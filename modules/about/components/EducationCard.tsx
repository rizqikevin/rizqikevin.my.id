import Image from "next/image";
import { BsBuildings as CompanyIcon } from "react-icons/bs";

import { EducationProps } from "@/common/types/education";
import SpotlightCard from "@/common/components/elements/SpotlightCard";

const EducationCard = ({
  school,
  major,
  logo,
  degree,
  start_year,
  end_year,
  link,
  location,
  GPA,
  coursework,
  highlights,
}: EducationProps) => {
  return (
    <SpotlightCard className="flex items-start gap-5 p-6">
      {logo ? (
        <Image width={70} height={70} src={logo} alt={school} />
      ) : (
        <CompanyIcon size={65} />
      )}

      <div className="space-y-1">
        {link ? (
          <a href={link} target="_blank">
            <h6>{school}</h6>
          </a>
        ) : (
          <h6>{school}</h6>
        )}
        <div className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
          <div className="flex flex-col gap-1 md:flex-row md:gap-2">
            <span>{degree}</span>
            <span className="hidden text-neutral-300 dark:text-neutral-700 md:block">
              •
            </span>
            <span>{major}</span>
            {GPA && (
              <div className="flex gap-2">
                <span className="hidden text-neutral-300 dark:text-neutral-700 md:block">
                  •
                </span>
                <span>GPA: </span>
                <span>{GPA}</span>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-1 text-[12px] md:flex-row md:gap-2">
            <span className="dark:text-neutral-500">
              {start_year} - {end_year}
            </span>
            <span className="hidden rounded-full text-neutral-300 dark:text-neutral-700 md:block">
              •
            </span>
            <span>{location}</span>
          </div>

          {highlights && highlights.length > 0 ? (
            <ul className="space-y-1 pt-2 text-xs leading-relaxed">
              {highlights.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="font-bold text-neutral-700 dark:text-neutral-300">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          ) : null}

          {coursework && coursework.length > 0 ? (
            <div className="pt-2 text-xs leading-relaxed">
              <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                Relevant Coursework:
              </span>{" "}
              <span>{coursework.join(", ")}</span>
            </div>
          ) : null}
        </div>
      </div>
    </SpotlightCard>
  );
};

export default EducationCard;

"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  BsArrowUpRight,
  BsCameraReels,
  BsInstagram,
  BsStars,
} from "react-icons/bs";

import { SOCIAL_MEDIA } from "@/common/constants/socialMedia";

const profile = {
  name: "Rizqi Kevin",
  username: "rizqikevin_",
  bio: "Frontend-focused software engineer sharing coding work, experiments, and behind-the-scenes progress.",
};

const highlights = [
  "Coding reels and short dev updates",
  "Project launches and UI explorations",
  "Personal brand and creative experiments",
];

const Instagram = () => {
  const t = useTranslations("ContentsPage");
  const instagramProfile = SOCIAL_MEDIA.find((item) => item.name === "instagram");

  return (
    <section className="space-y-6">
      <div className="overflow-hidden rounded-[2rem] border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
        <div className="bg-[radial-gradient(circle_at_top_left,_rgba(244,114,182,0.22),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(249,115,22,0.22),_transparent_35%),linear-gradient(135deg,_rgba(126,34,206,0.15),_rgba(236,72,153,0.08)_45%,_rgba(249,115,22,0.14))] p-6 md:p-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-5">
              <div className="flex h-24 w-24 items-center justify-center rounded-full border border-white/40 bg-white/70 text-[#E1306C] shadow-lg backdrop-blur dark:border-white/10 dark:bg-neutral-950/60">
                <BsInstagram size={42} />
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-neutral-600 dark:text-neutral-400">
                    Instagram
                  </p>
                  <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">
                    @{profile.username}
                  </h2>
                  <p className="mt-1 text-sm text-neutral-700 dark:text-neutral-300">
                    {profile.name}
                  </p>
                </div>

                <p className="max-w-2xl text-sm leading-7 text-neutral-700 dark:text-neutral-300">
                  {profile.bio}
                </p>
              </div>
            </div>

            <Link
              href={instagramProfile?.href || "https://www.instagram.com/rizqikevin_/"}
              target="_blank"
              className="inline-flex items-center gap-2 self-start rounded-full bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:scale-105 dark:bg-white dark:text-neutral-950"
            >
              {t("open_instagram")}
              <BsArrowUpRight size={16} />
            </Link>
          </div>
        </div>

        <div className="grid gap-4 border-t border-neutral-200 p-6 dark:border-neutral-800 md:grid-cols-[1.2fr_0.8fr] md:p-8">
          <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-5 dark:border-neutral-800 dark:bg-neutral-950">
            <div className="mb-4 flex items-center gap-2 text-sm font-medium text-neutral-900 dark:text-white">
              <BsCameraReels className="text-pink-500" />
              {t("instagram_section_title")}
            </div>

            <div className="space-y-3">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-5 dark:border-neutral-800 dark:bg-neutral-950">
            <div className="mb-4 flex items-center gap-2 text-sm font-medium text-neutral-900 dark:text-white">
              <BsStars className="text-orange-500" />
              {t("instagram_profile_title")}
            </div>

            <div className="space-y-4 text-sm text-neutral-700 dark:text-neutral-300">
              <p>{t("instagram_profile_copy")}</p>
              <div className="rounded-2xl border border-dashed border-neutral-300 px-4 py-4 dark:border-neutral-700">
                <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">
                  Username
                </p>
                <p className="mt-2 text-base font-semibold text-neutral-900 dark:text-white">
                  @{profile.username}
                </p>
              </div>
              <Link
                href={instagramProfile?.href || "https://www.instagram.com/rizqikevin_/"}
                target="_blank"
                className="inline-flex items-center gap-2 text-sm font-semibold text-pink-600 transition hover:gap-3 dark:text-pink-400"
              >
                {t("view_profile")}
                <BsArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Instagram;

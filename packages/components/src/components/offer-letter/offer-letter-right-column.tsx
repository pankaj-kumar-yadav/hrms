import { type ComponentType } from "react";
import {
  AddressBookIcon,
  BirthdayCakeIcon,
  BookOpen01Icon,
  Briefcase01Icon,
  Call02Icon,
  CheckmarkBadge02Icon,
  Flag02Icon,
  Location01Icon,
  Mail01Icon,
  MapPinpoint01Icon,
  UserGroupIcon,
  UserSquareIcon,
  WorkHistoryIcon,
} from "hugeicons-react";

type IconComponent = ComponentType<{
  className?: string;
  color?: string;
  size?: number | string;
  strokeWidth?: number;
  showAlt?: boolean;
}>;

type InfoRow = {
  icon: IconComponent;
  label: string;
  value: string;
  filled?: boolean;
  valueVariant?: "default" | "link" | "tag";
  suffixBadge?: string;
};

const personalInfo: InfoRow[] = [
  { icon: BirthdayCakeIcon, label: "Birth of date", value: "20 Oct, 2000 (24 yo)" },
  { icon: Flag02Icon, label: "Nationality", value: "Indonesian", filled: true },
  { icon: UserGroupIcon, label: "Dependants", value: "2 Kids, Divorce" },
  { icon: WorkHistoryIcon, label: "Experience", value: "2 Years" },
];

const addressInfo: InfoRow[] = [
  { icon: Location01Icon, label: "Location", value: "London, UK" },
  {
    icon: Mail01Icon,
    label: "Email",
    value: "yahyopd@gmail.com",
    valueVariant: "link",
  },
  {
    icon: Call02Icon,
    label: "Phone",
    value: "+62 123 123 1234",
    valueVariant: "link",
  },
];

const preferenceInfo: InfoRow[] = [
  {
    icon: BookOpen01Icon,
    label: "Curriculums",
    value: "British Curriculum",
    valueVariant: "tag",
    suffixBadge: "+2",
  },
  {
    icon: Briefcase01Icon,
    label: "Job Titles",
    value: "Math Teacher",
    valueVariant: "tag",
  },
  {
    icon: MapPinpoint01Icon,
    label: "Work Location",
    value: "Qatar",
    valueVariant: "tag",
    filled: true,
  },
];

function InfoSection({
  title,
  rows,
  icon: SectionIcon,
}: {
  title: string;
  rows: InfoRow[];
  icon: IconComponent;
}) {
  return (
    <section className="border-t border-[#eeecf3] pt-6 first:border-t-0 first:pt-0">
      <h3 className="mb-4 flex items-center gap-2 text-[21px] font-semibold leading-none text-[#28223b]">
        <SectionIcon className="text-[#68627e]" size={18} strokeWidth={1.9} />
        <span>{title}</span>
      </h3>
      <div className="space-y-3">
        {rows.map((row) => (
          <div className="flex items-center gap-3" key={row.label}>
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[#f2f1f7] text-[#6f6a84]">
              <row.icon showAlt={row.filled} size={15} strokeWidth={1.9} />
            </span>
            <p className="min-w-[110px] text-sm text-[#77728f]">{row.label}</p>
            <span className="text-sm font-semibold text-[#2d2940]">:</span>
            <div className="flex items-center gap-2">
              {row.valueVariant === "tag" ? (
                <span className="inline-flex items-center rounded-full bg-[#f2f1f7] px-3 py-1 text-xs font-semibold text-[#352f49]">
                  {row.value}
                </span>
              ) : (
                <p
                  className={
                    row.valueVariant === "link"
                      ? "text-sm font-semibold text-[#3a73e2] underline-offset-2 hover:underline"
                      : "text-sm font-semibold text-[#2e2942]"
                  }
                >
                  {row.value}
                </p>
              )}
              {row.suffixBadge ? (
                <span className="inline-flex rounded-full bg-[#efedf6] px-2 py-0.5 text-[11px] font-semibold text-[#5a556e]">
                  {row.suffixBadge}
                </span>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function OfferLetterRightColumn() {
  return (
    <aside className="space-y-6 bg-white p-5 md:p-6 lg:border-l lg:border-[#eceaf2]">
      <div className="flex items-center gap-3 rounded-xl bg-[#fbfaff] p-3">
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#f4d8bf] text-sm font-bold text-[#7a4d19]">
          YP
        </div>
        <div>
          <p className="flex items-center gap-1 text-[17px] font-semibold text-[#2b263d]">
            <span>Yahyo Prayogo Diningrat</span>
            <CheckmarkBadge02Icon
              className="text-[#3575ff]"
              showAlt
              size={15}
              strokeWidth={1.9}
            />
          </p>
          <p className="text-xs text-[#7d7891]">
            Candidate ID: #77987 | Career Page
          </p>
        </div>
      </div>

      <InfoSection
        icon={UserSquareIcon}
        rows={personalInfo}
        title="Personal Information"
      />
      <InfoSection
        icon={AddressBookIcon}
        rows={addressInfo}
        title="Address & Contact Information"
      />
      <InfoSection
        icon={Briefcase01Icon}
        rows={preferenceInfo}
        title="Preferences"
      />
    </aside>
  );
}

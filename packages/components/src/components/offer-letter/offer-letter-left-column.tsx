import { type ComponentType, type ReactNode } from "react";
import {
  AddressBookIcon,
  Attachment01Icon,
  Calendar01Icon,
  Call02Icon,
  Cancel01Icon,
  CheckmarkSquare03Icon,
  DocumentValidationIcon,
  DropdownFieldTypeIcon,
  Image01Icon,
  Mail01Icon,
  Pen01Icon,
  RadioButtonIcon,
  Search01Icon,
  SignatureIcon,
  Stamp01Icon,
  Table02Icon,
  TextIcon,
  TextNumberSignIcon,
  Tick01Icon,
  UserCircleIcon,
  UserSquareIcon,
} from "hugeicons-react";

type IconComponent = ComponentType<{
  className?: string;
  color?: string;
  size?: number | string;
  strokeWidth?: number;
  showAlt?: boolean;
}>;

type ElementItem = {
  icon: IconComponent;
  label: string;
  filled?: boolean;
};

const fillableFieldElements: ElementItem[] = [
  { icon: SignatureIcon, label: "Signature" },
  { icon: Pen01Icon, label: "Initial" },
  { icon: Stamp01Icon, label: "Stamp" },
  { icon: DocumentValidationIcon, label: "Data Sign" },
];

const textElements: ElementItem[] = [
  { icon: TextIcon, label: "Text" },
  { icon: TextNumberSignIcon, label: "Number" },
  { icon: CheckmarkSquare03Icon, label: "Checkbox" },
  { icon: RadioButtonIcon, label: "Radio" },
  { icon: DropdownFieldTypeIcon, label: "Dropdown" },
  { icon: Calendar01Icon, label: "Date" },
  { icon: Table02Icon, label: "Table" },
];

const personalDataElements: ElementItem[] = [
  { icon: UserSquareIcon, label: "Name" },
  { icon: Mail01Icon, label: "Email" },
  { icon: Call02Icon, label: "Phone" },
  { icon: AddressBookIcon, label: "Address" },
];

const extendElements: ElementItem[] = [
  { icon: Image01Icon, label: "Image" },
  { icon: Attachment01Icon, label: "Attachment" },
  { icon: Tick01Icon, label: "Approve", filled: true },
  { icon: Cancel01Icon, label: "Decline", filled: true },
];

function SideSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-[#eeecf3] pt-4 first:border-t-0 first:pt-0">
      <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9793a8]">
        {title}
      </h3>
      {children}
    </section>
  );
}

function ChipButton({ icon: Icon, label, filled }: ElementItem) {
  return (
    <button
      className="flex items-center gap-2 rounded-xl border border-[#eceaf2] bg-[#f6f5fa] px-3 py-2 text-left text-[15px] font-semibold text-[#353047] transition hover:bg-[#efedf7]"
      type="button"
    >
      <span className="text-[#68627e]">
        <Icon showAlt={filled} size={15} strokeWidth={1.85} />
      </span>
      <span>{label}</span>
    </button>
  );
}

export function OfferLetterLeftColumn() {
  return (
    <aside className="space-y-5 bg-[#fbfaff] p-5 lg:border-r lg:border-[#eceaf2]">
      <div className="grid grid-cols-2 rounded-xl border border-[#eceaf2] bg-[#f5f3fa] p-1 text-sm font-semibold">
        <button className="rounded-lg py-2 text-[#8883a0]" type="button">
          Templates
        </button>
        <button
          className="rounded-lg bg-white py-2 text-[#332d49] shadow-sm"
          type="button"
        >
          Elements
        </button>
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-[#eceaf2] bg-white px-4 py-2 text-sm text-[#9a96ad]">
        <Search01Icon size={16} strokeWidth={1.9} />
        <span>Search...</span>
      </div>

      <SideSection title="Fillable Fields">
        <div className="mb-3 flex items-center justify-between rounded-xl border border-[#eceaf2] bg-white px-4 py-2 text-sm font-semibold text-[#4b4561]">
          <span className="flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#f1eef9] text-[#6f40d7]">
              <UserCircleIcon showAlt size={16} strokeWidth={1.8} />
            </span>
            <span>Yahyo Prayogo</span>
          </span>
          <DropdownFieldTypeIcon size={15} strokeWidth={1.9} />
        </div>
        <div className="grid grid-cols-2 gap-2">
          {fillableFieldElements.map((item) => (
            <ChipButton key={item.label} {...item} />
          ))}
        </div>
      </SideSection>

      <SideSection title="Text Elements">
        <div className="grid grid-cols-2 gap-2">
          {textElements.map((item) => (
            <ChipButton key={item.label} {...item} />
          ))}
        </div>
      </SideSection>

      <SideSection title="Personal Data Elements">
        <div className="grid grid-cols-2 gap-2">
          {personalDataElements.map((item) => (
            <ChipButton key={item.label} {...item} />
          ))}
        </div>
      </SideSection>

      <SideSection title="Extend Elements">
        <div className="grid grid-cols-2 gap-2">
          {extendElements.map((item) => (
            <ChipButton key={item.label} {...item} />
          ))}
        </div>
      </SideSection>
    </aside>
  );
}

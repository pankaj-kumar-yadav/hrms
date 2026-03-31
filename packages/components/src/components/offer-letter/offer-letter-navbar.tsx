import { type MouseEventHandler, type ReactNode } from "react";
import { Navbar } from "../layout/navbar";

type OfferLetterNavbarProps = {
  title: string;
  createdBy: string;
  updatedText: string;
  backIcon: ReactNode;
  previewIcon: ReactNode;
  shareIcon: ReactNode;
  sendIcon: ReactNode;
  onBackClick?: MouseEventHandler<HTMLButtonElement>;
  onPreviewClick?: MouseEventHandler<HTMLButtonElement>;
  onShareClick?: MouseEventHandler<HTMLButtonElement>;
  onCancelClick?: MouseEventHandler<HTMLButtonElement>;
  onSaveSendClick?: MouseEventHandler<HTMLButtonElement>;
};

export function OfferLetterNavbar({
  title,
  createdBy,
  updatedText,
  backIcon,
  previewIcon,
  shareIcon,
  sendIcon,
  onBackClick,
  onPreviewClick,
  onShareClick,
  onCancelClick,
  onSaveSendClick,
}: OfferLetterNavbarProps) {
  return (
    <Navbar className="flex-wrap items-start border-b border-[#ebe8f2] bg-white px-5 py-4 md:px-8">
      <Navbar.Left>
        <button
          aria-label="Go back"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#eceaf2] bg-[#f7f6fb] text-[#7b7691]"
          onClick={onBackClick}
          type="button"
        >
          {backIcon}
        </button>
      </Navbar.Left>

      <Navbar.Main>
        <div>
          <h1 className="text-[22px] font-bold text-[#241f36] md:text-[26px]">
            {title}
          </h1>
          <p className="mt-1 text-sm text-[#7f7a93]">
            Created by{" "}
            <span className="font-semibold text-[#4a4561]">{createdBy}</span>
            <span className="mx-2">|</span>
            {updatedText}
          </p>
        </div>
      </Navbar.Main>

      <Navbar.Right className="w-full flex-wrap justify-start md:w-auto md:justify-end">
        <button
          className="flex items-center gap-2 rounded-xl border border-[#eceaf2] bg-white px-4 py-2 text-sm font-semibold text-[#433d57]"
          onClick={onPreviewClick}
          type="button"
        >
          {previewIcon}
          <span>Preview</span>
        </button>
        <button
          aria-label="Share"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#eceaf2] bg-white text-[#6f6a85]"
          onClick={onShareClick}
          type="button"
        >
          {shareIcon}
        </button>
        <button
          className="rounded-xl border border-[#eceaf2] bg-white px-5 py-2 text-sm font-semibold text-[#49435d]"
          onClick={onCancelClick}
          type="button"
        >
          Cancel
        </button>
        <button
          className="flex items-center gap-2 rounded-xl bg-[linear-gradient(135deg,_#8c3bff_0%,_#5912da_100%)] px-5 py-2 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(94,34,214,0.45)]"
          onClick={onSaveSendClick}
          type="button"
        >
          {sendIcon}
          <span>Save &amp; Send</span>
        </button>
      </Navbar.Right>
    </Navbar>
  );
}

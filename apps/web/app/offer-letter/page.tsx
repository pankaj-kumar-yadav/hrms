import { Manrope, Source_Serif_4 } from "next/font/google";
import {
  ArrowLeft01Icon,
  MailSend02Icon,
  Share08Icon,
  ViewIcon,
} from "hugeicons-react";
import { DottedPattern } from "@repo/components/components/backgrounds/dotted-pattern";
import { OfferLetterLeftColumn } from "@repo/components/components/offer-letter/offer-letter-left-column";
import { OfferLetterNavbar } from "@repo/components/components/offer-letter/offer-letter-navbar";
import { OfferLetterRightColumn } from "@repo/components/components/offer-letter/offer-letter-right-column";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
});

export default function OfferLetterPage() {
  return (
    <main
      className={`${manrope.variable} ${sourceSerif.variable} min-h-screen bg-[radial-gradient(circle_at_top,_#f7f6fb_0%,_#ece9f3_62%,_#e5e2ef_100%)] p-4 text-[#2f2b3d] md:p-8`}
      style={{ fontFamily: "var(--font-manrope)" }}
    >
      <div className="mx-auto max-w-[1460px] overflow-hidden rounded-[28px] border border-white/70 bg-[#f7f6fb] shadow-[0_28px_90px_rgba(43,31,74,0.16)]">
        <OfferLetterNavbar
          backIcon={<ArrowLeft01Icon size={18} strokeWidth={2} />}
          createdBy="Leo Passaquindici"
          previewIcon={<ViewIcon size={16} strokeWidth={1.9} />}
          sendIcon={<MailSend02Icon showAlt size={16} strokeWidth={1.9} />}
          shareIcon={<Share08Icon size={17} strokeWidth={1.9} />}
          title="Leo Passaquindici Arcand Offer letter"
          updatedText="Updated 2 minutes ago"
        />

        <div className="grid border-t border-[#f2f0f7] lg:grid-cols-[280px_minmax(0,1fr)_330px]">
          <OfferLetterLeftColumn />

          <section className="relative overflow-hidden p-0">
            <DottedPattern className="absolute inset-0" />
            <div className="relative z-10 w-full rounded-none bg-white px-6 pb-12 pt-7 shadow-none md:px-12">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#e4f6e8] text-[11px] font-bold text-[#1a7a3f]">
                    LI
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#26233b]">
                      Liberty International
                    </p>
                    <p className="text-[11px] text-[#6f6a81]">
                      300 World St, Colombo 00300, Sri Lanka
                    </p>
                  </div>
                </div>
                <div className="rounded-md border border-[#eceaf2] bg-[#faf9fd] px-3 py-2 text-right text-[11px] text-[#6e6982]">
                  <p>www.libertyinternational.uk</p>
                  <p>+94 112 - 444 - 056</p>
                </div>
              </div>

              <div className="mt-4 h-[3px] bg-[#3d6eed]" />

              <h2
                className="mt-8 text-center text-[44px] font-semibold leading-tight text-[#232034] md:text-[52px]"
                style={{ fontFamily: "var(--font-source-serif)" }}
              >
                Job Offer Letter
              </h2>

              <div className="mt-6 space-y-4 text-[13px] leading-6 text-[#312d41]">
                <p>
                  Dear <span className="font-semibold">Yahyo Prayogo</span>,
                </p>
                <p>
                  Following the recruitment process you have participated in,
                  Liberty International is pleased to offer you the position
                  with the following details.
                </p>

                <p className="font-semibold">1. Position &amp; Placement</p>
                <div className="overflow-hidden rounded-lg border border-[#e7e5ef]">
                  <table className="w-full border-collapse text-[12px]">
                    <tbody>
                      <tr className="border-b border-[#e7e5ef] bg-[#fbfafd]">
                        <td className="w-1/3 border-r border-[#e7e5ef] px-3 py-2 font-semibold">
                          Job Title
                        </td>
                        <td className="px-3 py-2">
                          Learning &amp; Development Specialist
                        </td>
                      </tr>
                      <tr className="border-b border-[#e7e5ef]">
                        <td className="border-r border-[#e7e5ef] px-3 py-2 font-semibold">
                          Department
                        </td>
                        <td className="px-3 py-2">Academic</td>
                      </tr>
                      <tr className="border-b border-[#e7e5ef] bg-[#fbfafd]">
                        <td className="border-r border-[#e7e5ef] px-3 py-2 font-semibold">
                          Business Address
                        </td>
                        <td className="px-3 py-2">
                          United Arab Emirates, Abu Dhabi
                        </td>
                      </tr>
                      <tr>
                        <td className="border-r border-[#e7e5ef] px-3 py-2 font-semibold">
                          Start Date
                        </td>
                        <td className="px-3 py-2">March 10, 2025</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="font-semibold">2. Compensation &amp; Benefits</p>
                <ul className="list-disc space-y-1 pl-5">
                  <li>Basic Salary: 125,000 per month.</li>
                  <li>
                    Paid time off: 12 vacation days, 4 company holidays, and 20
                    sick days annually.
                  </li>
                  <li>Medical &amp; Social Security insurance.</li>
                  <li>Annual leave: 12 working days.</li>
                  <li>Annual bonus according to school policy.</li>
                </ul>

                <p className="font-semibold">3. Terms &amp; Conditions</p>
                <ul className="list-disc space-y-1 pl-5">
                  <li>Probation period of 6 months.</li>
                  <li>This offer is valid until March 15, 2025.</li>
                  <li>
                    If you accept this offer, please sign and return this
                    document before the offer expiration date.
                  </li>
                </ul>

                <p className="font-semibold">4. HR Contact</p>
                <div className="overflow-hidden rounded-lg border border-[#e7e5ef]">
                  <table className="w-full border-collapse text-[12px]">
                    <tbody>
                      <tr className="border-b border-[#e7e5ef] bg-[#fbfafd]">
                        <td className="w-1/3 border-r border-[#e7e5ef] px-3 py-2 font-semibold">
                          Name
                        </td>
                        <td className="px-3 py-2">[Manager FullName]</td>
                      </tr>
                      <tr className="border-b border-[#e7e5ef]">
                        <td className="border-r border-[#e7e5ef] px-3 py-2 font-semibold">
                          Position
                        </td>
                        <td className="px-3 py-2">[Manager Position]</td>
                      </tr>
                      <tr className="border-b border-[#e7e5ef] bg-[#fbfafd]">
                        <td className="border-r border-[#e7e5ef] px-3 py-2 font-semibold">
                          Email
                        </td>
                        <td className="px-3 py-2">[Manager Email]</td>
                      </tr>
                      <tr>
                        <td className="border-r border-[#e7e5ef] px-3 py-2 font-semibold">
                          Phone
                        </td>
                        <td className="px-3 py-2">[Manager Phone]</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center lg:absolute lg:bottom-6 lg:left-1/2 lg:mt-0 lg:-translate-x-1/2">
              <div className="flex items-center gap-3 rounded-xl border border-[#3a245d] bg-[#201333] px-4 py-2 text-xs font-semibold text-white shadow-[0_16px_30px_rgba(23,12,40,0.45)]">
                <button className="rounded-md bg-[#321f4f] px-2 py-1" type="button">
                  Undo
                </button>
                <button className="rounded-md bg-[#321f4f] px-2 py-1" type="button">
                  Redo
                </button>
                <button className="rounded-md bg-[#321f4f] px-2 py-1" type="button">
                  Reset
                </button>
                <span className="rounded-md bg-[#2f1f4b] px-2 py-1">100%</span>
              </div>
            </div>
          </section>

          <OfferLetterRightColumn />
        </div>
      </div>
    </main>
  );
}

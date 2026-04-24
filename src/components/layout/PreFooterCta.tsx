import Image from "next/image";
import { Mail, PhoneCall } from "lucide-react";

const PHONE_NUMBER = "9511409795";
const EMAIL_ADDRESS = "help@ngoschool.com";

const PreFooterCta = () => {
  return (
    <section className="bg-[#f3f5f2] py-6 sm:py-10 lg:py-12">
      <div className="mx-auto w-full max-w-[1620px] px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[20px] bg-[#28AA4A]">
          <div className="relative h-[200px] sm:h-[250px] md:h-[300px] lg:hidden">
            <Image
              src="/images/ngo-people.png"
              alt="NGO support team"
              fill
              className="object-contain object-bottom"
              priority={false}
            />
          </div>

          <Image
            src="/images/ngo-people.png"
            alt="NGO support team"
            width={620}
            height={620}
            className="pointer-events-none absolute left-[64px] bottom-0 hidden w-[520px] max-w-none lg:block"
            priority={false}
          />

          <div className="relative z-10 px-4 pb-5 pt-3 sm:px-7 sm:pb-8 sm:pt-5 lg:h-[500px] lg:pl-[44%] lg:pr-10 lg:pt-16">
            <h2 className="text-white font-bold leading-[1.2] text-[26px] sm:text-[30px] md:text-[36px] lg:text-[48px] max-w-[640px]">
              Empower Your NGO &amp;
              <br />
              Maximize Social Impact
            </h2>

            <div className="mt-4 sm:mt-5 lg:mt-8 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 lg:gap-4 max-w-[760px]">
              <a
                href={`tel:${PHONE_NUMBER.replace(/[^\d+]/g, "")}`}
                className="min-h-[100px] sm:h-[110px] lg:h-[120px] w-full md:max-w-[350px] rounded-[10px] bg-white/12 px-3 sm:px-4 lg:px-5 flex items-center gap-3"
              >
                <span className="h-[48px] w-[48px] sm:h-[56px] sm:w-[56px] lg:h-[62px] lg:w-[62px] rounded-full bg-white flex items-center justify-center flex-shrink-0">
                  <PhoneCall className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-[#28AA4A]" />
                </span>
                <span className="min-w-0">
                  <span className="block text-white/90 text-xs sm:text-sm lg:text-base leading-tight">Call Us Anytime</span>
                  <span className="block text-white font-bold text-lg sm:text-xl lg:text-[28px] leading-tight mt-1">{PHONE_NUMBER}</span>
                </span>
              </a>

              <a
                href={`mailto:${EMAIL_ADDRESS}`}
                className="min-h-[100px] sm:h-[110px] lg:h-[120px] w-full md:max-w-[350px] rounded-[10px] bg-white/12 px-3 sm:px-4 lg:px-5 flex items-center gap-3"
              >
                <span className="h-[48px] w-[48px] sm:h-[56px] sm:w-[56px] lg:h-[62px] lg:w-[62px] rounded-full bg-white flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-[#28AA4A]" />
                </span>
                <span className="min-w-0">
                  <span className="block text-white/90 text-xs sm:text-sm lg:text-base leading-tight">Email Us Anytime</span>
                  <span className="block text-white font-bold text-base sm:text-lg lg:text-[24px] leading-tight mt-1 break-all">{EMAIL_ADDRESS}</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreFooterCta;

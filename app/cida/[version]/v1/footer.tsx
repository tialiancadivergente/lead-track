export default function Footer() {
  return (
    <footer className="w-full bg-[#07242C] flex justify-center">
      <div
        className="
          w-full
          max-w-[1920px]

          h-[122px]
          pt-[48px]
          pb-[48px]
          px-[65px]
          flex
          items-center
          justify-center

          md:h-[142px]
          md:px-[430px]
        "
      >
        <p
          className="
            w-[350px]
            h-[26px]
            font-raleway
            font-normal
            text-[16px]
            leading-[100%]
            tracking-[0]
            text-center
            text-white

            md:w-[420px]
            md:h-[11px]
          "
        >
          2026 Aliança Divergente © Todos os Direitos Reservados.
        </p>
      </div>
    </footer>
  );
}
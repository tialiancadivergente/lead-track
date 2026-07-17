import Image from "next/image";

export default function Footer() {
  return (
    <div className="bg-[#6F6250] px-4 py-[80px]">
      <footer className="container mx-auto flex w-full flex-col gap-10 lg:w-[1080px]">
        <div className="flex flex-col items-center justify-between gap-8 lg:flex-row lg:items-start">
          <div className="order-2 text-center font-raleway text-[14px] font-normal text-white lg:order-1 lg:text-left">
            <p>Copyright © O Resgate dos Otimistas.</p>
            <p>Todos os direitos reservados.</p>
          </div>

          <div className="order-1 flex justify-center lg:order-2">
            <Image
              src="/images/oro/v12/logo.svg"
              alt="O Resgate dos Otimistas"
              width={220}
              height={80}
              className="h-auto w-[180px] object-contain lg:w-[220px]"
            />
          </div>

          <div className="order-3 text-center font-raleway text-[14px] font-normal text-white lg:text-right">
            <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-end">
              <a href="https://www.oresgatedosotimistas.com.br/politica-de-privacidade" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-80">
                Política de privacidade
              </a>

              <span aria-hidden="true">|</span>

              <a href="https://www.oresgatedosotimistas.com.br/termos-de-uso" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-80">
                Termos de uso
              </a>
            </div>

            <div className="mt-1 text-[14px]">
              <p>ALIANCA DIVERGENTE LTDA</p>
              <p>CNPJ: 59.301.463.0001-36</p>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[1080px] text-center font-raleway text-[14px] text-white">
          <h2 className="mb-4 font-bold uppercase">Aviso legal:</h2>

          <p className="mx-auto max-w-[1000px] leading-relaxed">
            Os resultados podem variar de pessoa para pessoa. Este método tem caráter educacional e de desenvolvimento pessoal, não garantindo ganhos financeiros imediatos ou específicos. O sucesso depende da aplicação prática de cada participante. Este site não é afiliado, endossado ou patrocinado pelo Google ou Meta.
          </p>
        </div>
      </footer>
    </div>
  );
}
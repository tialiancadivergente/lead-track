import Image from "next/image";

export default function Footer() {
    return (
        <div
            className="
                bg-[#031B22]

                bg-[url('/images/odml/v1/bg_rodape_mobile.webp')]

                md:bg-[url('/images/odml/v1/bg_rodape_desktop.webp')]

                bg-no-repeat
                bg-center
                bg-cover

                py-[100px]
            "
        >
            <footer className="container mx-auto sm:px-4 lg:w-[1080px] w-auto flex flex-col lg:flex-row items-center justify-between gap-2 lg:gap-0">
                
                <div className="font-normal font-raleway text-[14px] text-white hidden lg:block">
                    <p>
                        Copyright © O Resgate Dos Otimistas.
                    </p>
                    <p>
                        Todos os direitos reservados.
                    </p>
                </div>

                <Image
                    src="/images//v21/logo-alianca-divergente.png"
                    alt="Logomarca Aliança Divergente"
                    width={165}
                    height={32}
                    priority
                    className="object-contain md:w-[165px] w-[210px]" 
                />

                <div className="font-normal font-raleway text-[14px] text-white text-center lg:hidden block">
                    <p>
                        Copyright © O Resgate Dos Otimistas.
                    </p>
                    <p>
                        Todos os direitos reservados.
                    </p>
                </div>

            </footer>
        </div>
    )
}

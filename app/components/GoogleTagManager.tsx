"use client";

import { useEffect } from "react";
import TagManager from "react-gtm-module";
import useUserIP from "../hooks/useUserIP";


const GoogleTagManager = () => {
    const userIp = useUserIP(); // Captura o IP no carregamento
    console.log('meu ip =>', userIp);
    useEffect(() => {
        const defaultGtmId = 'GTM-NC7GGZBX';

        const getGtmIdByHostname = (hostname: string) => {
            // Normaliza host (ignora porta, se houver)
            const cleanHost = hostname.split(':')[0].toLowerCase();

            // Captura subdomínio (primeiro label)
            const [firstLabel] = cleanHost.split('.');

            // Mapeamento por subdomínio específico
            const map: Record<string, string> = {
                mt: 'GTM-K72SR8R4',
                gg: 'GTM-NNCP73G5',
                tt: 'GTM-WD86PJNQ',
            };

            // Se houver correspondência exata para o primeiro label, usa-a
            if (map[firstLabel]) return map[firstLabel];

            // Mantém o atual para o domínio principal e demais casos
            return defaultGtmId;
        };

        const host = typeof window !== 'undefined' ? window.location.hostname : '';
        const gtmId = host ? getGtmIdByHostname(host) : defaultGtmId;
        console.log('gtmId ====> ', gtmId)
        TagManager.initialize({ gtmId });
    }, []);

    return null; // Esse componente não precisa renderizar nada
};

export default GoogleTagManager;
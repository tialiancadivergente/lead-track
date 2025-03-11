"use client";

import { useEffect } from "react";
import TagManager from "react-gtm-module";
import useUserIP from "../hooks/useUserIP";

const GTM_ID = "GTM-NC7GGZBX"; // Substitua pelo seu ID do GTM

const GoogleTagManager = () => {
    const userIp = useUserIP(); // Captura o IP no carregamento
    console.log('meu ip', userIp);
    useEffect(() => {
        TagManager.initialize({ gtmId: GTM_ID });
    }, []);

    return null; // Esse componente não precisa renderizar nada
};

export default GoogleTagManager;
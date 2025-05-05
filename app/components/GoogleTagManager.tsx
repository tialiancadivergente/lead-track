"use client";

import { useEffect } from "react";
import TagManager from "react-gtm-module";
import useUserIP from "../hooks/useUserIP";


const GoogleTagManager = () => {
    const userIp = useUserIP(); // Captura o IP no carregamento
    console.log('meu ip', userIp);
    useEffect(() => {
        TagManager.initialize({ gtmId: 'GTM-NC7GGZBX'});
    }, []);

    return null; // Esse componente não precisa renderizar nada
};

export default GoogleTagManager;
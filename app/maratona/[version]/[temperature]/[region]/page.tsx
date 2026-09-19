"use client";

import { useParams } from "next/navigation";
import Formv1 from "@/app/maratona/[version]/v1";
import Formv2 from "@/app/maratona/[version]/v2";

export default function Home() {
	const { version, region } = useParams<{
		version: string;
		temperature: string;
		region: string;
	}>();

	if (region !== "euro" && region !== "eua") {
		return null;
	}

	if (version === "v2") {
		return <Formv2 />;
	}

	if (version === "v1") {
		return <Formv1 />;
	}

	return null;
}
"use client";

import { useParams } from "next/navigation";
import Formv1 from "@/app/maratona/[version]/v1";

export default function Home() {
	const { version, region } = useParams<{
		version: string;
		temperature: string;
		region: string;
	}>();

	if (version !== "v1") {
		return null;
	}

	if (region !== "euro" && region !== "eua") {
		return null;
	}

	return <Formv1 />;
}
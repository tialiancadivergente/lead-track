import SplashScreenOro from "@/app/components/SplashScreen/SplashScreenOro";
import { fetchPageConfigByAbbreviation } from "@/app/modules/lead-capture/page-config.server";
import Formv9 from "@/app/oro/page/[page]/[version]/v9";

type HomeParams = {
  page: string;
  version: string;
  headline: string;
  temperature: string;
  slug?: string[];
};

export default async function Home({
  params,
}: {
  params: Promise<HomeParams>;
}) {
  const { page } = await params;
  const pageConfig = await fetchPageConfigByAbbreviation(page);

  return (
    <SplashScreenOro>
      <Formv9 initialPageConfig={pageConfig} />
    </SplashScreenOro>
  );
}

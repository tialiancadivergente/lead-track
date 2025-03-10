import Header from "@/components/header"
import LeadSearch from "@/components/lead-search"
import Footer from "@/components/footer"

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="pt-24 pb-10">
        <div className="container mx-auto">
          <LeadSearch />
        </div>
      </div>
      <Footer />
    </main>
  )
}


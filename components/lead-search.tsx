import type React from "react"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"

interface Lead {
  email: string
  whatsapp: string
  date: string
}

export default function LeadSearch() {
  const [search, setSearch] = useState("")
  const [leads, setLeads] = useState<Lead[]>([])
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([])

  useEffect(() => {
    // Carregar leads do localStorage
    const storedLeads = JSON.parse(localStorage.getItem("leads") || "[]")
    setLeads(storedLeads)
    setFilteredLeads(storedLeads)
  }, [])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)

    if (value) {
      const filtered = leads.filter(
        (lead) => lead.email.toLowerCase().includes(value.toLowerCase()) || lead.whatsapp.includes(value),
      )
      setFilteredLeads(filtered)
    } else {
      setFilteredLeads(leads)
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h2 className="text-2xl text-primary font-semibold mb-6">Pesquisar Leads</h2>

      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-500" />
        </div>
        <input
          type="text"
          placeholder="Buscar por email ou WhatsApp"
          className="w-full px-4 py-3 pl-10 rounded bg-foreground/90 text-background"
          value={search}
          onChange={handleSearch}
        />
      </div>

      {filteredLeads.length > 0 ? (
        <div className="bg-secondary/30 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-secondary">
              <tr>
                <th className="p-3 text-left text-sm font-medium text-foreground/90">Email</th>
                <th className="p-3 text-left text-sm font-medium text-foreground/90">WhatsApp</th>
                <th className="p-3 text-left text-sm font-medium text-foreground/90">Data de Cadastro</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead, index) => (
                <tr key={index} className="border-t border-gray-700">
                  <td className="p-3 text-foreground/80">{lead.email}</td>
                  <td className="p-3 text-foreground/80">{lead.whatsapp}</td>
                  <td className="p-3 text-foreground/80">{new Date(lead.date).toLocaleDateString("pt-BR")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-foreground/70">
            {search ? "Nenhum lead encontrado com essa busca." : "Nenhum lead cadastrado ainda."}
          </p>
        </div>
      )}
    </div>
  )
}


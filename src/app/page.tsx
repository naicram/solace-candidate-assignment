"use client";

import { MultiSelect } from "@/components/multi-select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SearchSelect } from "@/components/search-select";
import { useEffect, useState } from "react";
import { cities, specialties } from "@/db/seed/advocates";
import { SearchInput } from "@/components/search-input";
import { AdvocatesTable } from "@/components/data-table";

export type Advocate = {
  id: number
  firstName: string
  lastName: string
  city: string
  degree: string
  specialties: string[]
  yearsOfExperience: number
  phoneNumber: string
}

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  // const [filteredAdvocates, setFilteredAdvocates] = useState([]);

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
      });
    });
  }, []);

  useEffect(() => {
    console.log("filtering advocates...");
    const response = fetch("/api/advocates").then((response) => {
      response.json().then(response => {
        const filteredAdvocates = response.data.filter((advocate: Advocate) => {
          return (
            (searchTerm.length === 0 || advocate.firstName.includes(searchTerm)) ||
            (searchTerm.length === 0 || advocate.lastName.includes(searchTerm))  ||
            (selectedCity === "all" || advocate.city.includes(selectedCity)) ||
            (selectedSpecialties.length === 0 || selectedSpecialties.some(specialty => advocate.specialties.includes(specialty)))
          );
        });
        setAdvocates(filteredAdvocates);
      });
    });
  }, [selectedCity, selectedSpecialties, searchTerm]);

  return (

    
      <main className="min-h-screen p-8">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Healthcare Advocate Directory</h1>
            <p className="text-muted-foreground">Find healthcare advocates by location and specialty</p>
          </div>
  
          <div className="rounded-lg border bg-card p-6">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="search">Search</Label>
                <SearchInput value={searchTerm} onChange={setSearchTerm} />
              </div>
  
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <SearchSelect options={cities} selected={selectedCity} onChange={setSelectedCity} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialties">Specialties</Label>
                <MultiSelect
                  options={specialties}
                  selected={selectedSpecialties}
                  onChange={setSelectedSpecialties}
                  placeholder="Select specialties..."
                />
              </div>
            </div>
          </div>
  
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {advocates.length} of {advocates.length} providers
              </p>
            </div>
            <AdvocatesTable advocates={advocates} />
          </div>
        </div>
      </main>
    
  );
}

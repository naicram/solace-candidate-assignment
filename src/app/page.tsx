"use client";

import { MultiSelect } from "@/components/multi-select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SearchSelect } from "@/components/search-select";
import { useEffect, useState } from "react";
import { cities, specialties } from "@/db/seed/advocates";
import { SearchInput } from "@/components/search-input";

type Advocate = {
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

  // const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const searchTerm = e.target.value;
  //   setSearchTerm(searchTerm);

  //   // document.getElementById("search-term").innerHTML = searchTerm;

  //   console.log("filtering advocates...");
  //   const filteredAdvocates = advocates.filter((advocate) => {
  //     return (
  //       advocate.firstName.includes(searchTerm) ||
  //       advocate.lastName.includes(searchTerm) ||
  //       advocate.city.includes(selectedCity) ||
  //       advocate.degree.includes(searchTerm) ||
  //       selectedSpecialties.some(specialty => advocate.specialties.includes(specialty)) ||
  //       advocate.yearsOfExperience.toString().includes(searchTerm)
  //     );
  //   });

  //   setAdvocates(filteredAdvocates);
  // };

  useEffect(() => {
    console.log("filtering advocates...");
    const response = fetch("/api/advocates").then((response) => {
      response.json().then(response => {
        const filteredAdvocates = response.data.filter((advocate: Advocate) => {
          return (
            advocate.firstName.includes(searchTerm) ||
            advocate.lastName.includes(searchTerm) ||
            advocate.city.includes(selectedCity) ||
            selectedSpecialties.some(specialty => advocate.specialties.includes(specialty))
          );
        });
        setAdvocates(filteredAdvocates);
      });
    });
  }, [selectedCity, selectedSpecialties, searchTerm]);

  // const onClick = () => {
  //   console.log(advocates);
  //   fetch("/api/advocates").then((response) => {
  //     response.json().then((jsonResponse) => {
  //       setAdvocates(jsonResponse.data);
  //     });
  //   });
  // };

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
            <table>
        <thead>
          <th>First Name</th>
          <th>Last Name</th>
          <th>City</th>
          <th>Degree</th>
          <th>Specialties</th>
          <th>Years of Experience</th>
          <th>Phone Number</th>
        </thead>
        <tbody>
          {advocates.map((advocate) => {
            return (
              <tr>
                <td>{advocate.firstName}</td>
                <td>{advocate.lastName}</td>
                <td>{advocate.city}</td>
                <td>{advocate.degree}</td>
                <td>
                  {advocate.specialties.map((s) => (
                    <div>{specialties.find((specialty) => specialty.value === s)?.label}</div>
                  ))}
                </td>
                <td>{advocate.yearsOfExperience}</td>
                <td>{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
          </div>
        </div>
      </main>
    
  );
}

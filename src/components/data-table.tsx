"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Advocate } from "@/app/page"
import { specialties } from "@/db/seed/advocates"
import { formatPhoneNumber } from "@/lib/utils"

interface AdvocatesTableProps {
  advocates: Advocate[]
}

export function AdvocatesTable({ advocates }: AdvocatesTableProps) {
  const [visibleCount, setVisibleCount] = useState(5)

  const formatCity = (city: string) => {
    const cityMap: Record<string, string> = {
      "new-york": "New York, NY",
      "los-angeles": "Los Angeles, CA",
      chicago: "Chicago, IL",
      houston: "Houston, TX",
      phoenix: "Phoenix, AZ",
      philadelphia: "Philadelphia, PA",
      "san-antonio": "San Antonio, TX",
      "san-diego": "San Diego, CA",
      dallas: "Dallas, TX",
      "san-jose": "San Jose, CA",
    }
    return cityMap[city] || city
  }

  const visibleAdvocates = advocates.slice(0, visibleCount)
  const hasMore = visibleCount < advocates.length

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Degree</TableHead>
              <TableHead>Specialties</TableHead>
              <TableHead>Years of Experience</TableHead>
              <TableHead>Phone Number</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {advocates.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                  No advocates found matching your filters.
                </TableCell>
              </TableRow>
            ) : (
              visibleAdvocates.map((advocate) => (
                <TableRow key={advocate.id}>
                  <TableCell className="font-medium">{advocate.firstName}</TableCell>
                  <TableCell className="font-medium">{advocate.lastName}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{formatCity(advocate.city)}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{advocate.degree}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {advocate.specialties.map((specialty) => (
                        <Badge key={specialty} variant="outline" className="text-xs  bg-[#97d4c4]">
                          {specialties.find((s) => s.value === specialty)?.label}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-md text-sm text-muted-foreground">{advocate.yearsOfExperience}</TableCell>
                  <TableCell className="max-w-md text-sm text-muted-foreground">{formatPhoneNumber(advocate.phoneNumber)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {hasMore && (
        <div className="flex justify-center">
          <Button variant="outline" onClick={() => setVisibleCount((prev) => prev + 5)}>
            Show More ({advocates.length - visibleCount} remaining)
          </Button>
        </div>
      )}
    </div>
  )
}

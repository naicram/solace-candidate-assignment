"use client"

import { useState } from "react"
import { Check, ChevronsUpDown, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"

type Option = {
    label: string
    value: string
}

interface MultiSelectProps {
    options: Option[]
    selected: string[]
    onChange: (selected: string[]) => void
    placeholder?: string
    className?: string
}

export const MultiSelect = ({ options, selected, onChange, placeholder="Select options...", className }: MultiSelectProps) => {
    const [open, setOpen] = useState(false)
    const maxVisibleBadges = 3

    const handleSelect = (value: string) => {
        if (selected.includes(value)) {
          onChange(selected.filter((item) => item !== value))
        } else {
          onChange([...selected, value])
        }
      }

    const handleUnselect = (item: string) => {
        onChange(selected.filter((i) => i !== item))
      }

    return (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className={cn("w-full justify-between", className)}
            >
              <div className="flex items-center gap-1 flex-1 overflow-hidden">
                {selected.length > 0 ? (
                  <>
                    {selected.slice(0, maxVisibleBadges).map((item) => {
                      const option = options.find((opt) => opt.value === item)
                      return (
                        <Badge
                          variant="secondary"
                          key={item}
                          className="shrink-0"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleUnselect(item)
                          }}
                        >
                          {option?.label}
                          <button
                            className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                handleUnselect(item)
                              }
                            }}
                            onMouseDown={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                            }}
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              handleUnselect(item)
                            }}
                          >
                            <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                          </button>
                        </Badge>
                      )
                    })}
                    {selected.length > maxVisibleBadges && (
                      <span className="text-sm text-muted-foreground whitespace-nowrap">
                        +{selected.length - maxVisibleBadges} more
                      </span>
                    )}
                  </>
                ) : (
                  <span className="text-muted-foreground">{placeholder}</span>
                )}
              </div>
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0" align="start">
            <Command>
              <CommandInput placeholder="Search..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {options.map((option) => {
                    const isSelected = selected.includes(option.value)
                    return (
                      <CommandItem key={option.value} onSelect={() => handleSelect(option.value)}>
                        <Check className={cn("mr-2 h-4 w-4", isSelected ? "opacity-100" : "opacity-0")} />
                        {option.label}
                      </CommandItem>
                    )
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      )
}
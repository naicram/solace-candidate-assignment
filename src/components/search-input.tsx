import { Input } from "./ui/input"

interface SearchInputProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
    className?: string
}

export const SearchInput = ({ value, onChange, placeholder="Search...", className }: SearchInputProps) => {
    return (
        <Input id="search" placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
    )
}

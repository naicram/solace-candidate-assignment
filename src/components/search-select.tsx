import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SearchSelectProps {
    options: { label: string, value: string }[]
    selected: string
    onChange: (value: string) => void
    placeholder?: string
    className?: string
}

export const SearchSelect = ({ options, selected, onChange, placeholder="Select options...", className }: SearchSelectProps) => {
    return (
        <Select value={selected} onValueChange={onChange}>
            <SelectTrigger>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {options.map((option) => (
                    <SelectItem key={option.value} value={option.label}>{option.label}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
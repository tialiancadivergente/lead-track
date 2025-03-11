"use client"
import { Label } from "@/components/ui/label"

interface CustomRadioProps {
  options: Array<{ value: string; label: string; weight?: number }>
  value: string
  onChange: (value: string) => void
}

export function CustomRadio({ options, value, onChange }: CustomRadioProps) {
  return (
    <div className="space-y-3">
      {options.map((option) => (
        <div
          key={option.value}
          className="flex items-center space-x-4 cursor-pointer py-1"
          onClick={() => onChange(option.value)}
        >
          <div
            className={`h-7 w-7 rounded-full border-2 ${
              value === option.value ? "border-white bg-white" : "border-white"
            } flex items-center justify-center`}
          >
            {value === option.value && <div className="h-3.5 w-3.5 rounded-full bg-blue-500"></div>}
          </div>
          <Label className="text-white cursor-pointer text-base">{option.label}</Label>
        </div>
      ))}
    </div>
  )
}


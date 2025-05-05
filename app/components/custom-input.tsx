"use client"
import { Label } from "@/components/ui/label"

interface CustomRadioProps {
  options: Array<{ value: string; label: string; weight?: number }>
  value: string
  onChange: (value: string) => void
}

export function CustomRadio({ options, value, onChange }: CustomRadioProps) {
  return (
    <div className="">
      {options.map((option) => (
        <div
          key={option.value}
          className="flex items-center space-x-4 cursor-pointer"
          onClick={() => onChange(option.value)}
        >
          <div
            className={`h-3 w-3 rounded-full border-2 ${
              value === option.value ? "border-white bg-white" : "border-white"
            } flex items-center justify-center`}
          >
            {value === option.value && <div className="h-2.5 w-2.5 rounded-full bg-blue-500"></div>}
          </div>
          <Label className="text-white cursor-pointer text-sm md:text-base">{option.label}</Label>
        </div>
      ))}
    </div>
  )
}


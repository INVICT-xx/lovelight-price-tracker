import { Button } from "./ui/button";
import { cn } from "../lib/utils";

const periods = [
  { label: 'Last Hour', value: '1h' },
  { label: 'Last 24 Hours', value: '24h' },
  { label: 'Last 30 Days', value: '30d' },
  { label: 'Last Year', value: '1y' },
];

interface TimeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const TimeSelector = ({ value, onChange }: TimeSelectorProps) => {
  return (
    <div className="flex justify-center gap-2 flex-wrap">
      {periods.map((period) => (
        <Button
          key={period.value}
          variant={value === period.value ? "default" : "outline"}
          className={cn(
            "transition-all duration-200",
            value === period.value && "shadow-lg"
          )}
          onClick={() => onChange(period.value)}
        >
          {period.label}
        </Button>
      ))}
    </div>
  );
};
import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Skeleton } from './ui/skeleton';

interface PriceTableProps {
  data: any[];
  period: string;
  isLoading: boolean;
}

export const PriceTable = ({ data, period, isLoading }: PriceTableProps) => {
  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="w-full h-12" />
        ))}
      </div>
    );
  }

  return (
    <div className="relative overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Time</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Change</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.slice(0, 10).map((entry, index) => {
            const priceChange = index > 0 ? entry.price - data[index - 1].price : 0;
            return (
              <TableRow key={entry.timestamp}>
                <TableCell>
                  {format(new Date(entry.timestamp), 'PPpp')}
                </TableCell>
                <TableCell>${entry.price}</TableCell>
                <TableCell className={priceChange >= 0 ? 'text-green-500' : 'text-red-500'}>
                  {priceChange !== 0 && (priceChange > 0 ? '+' : '')}{priceChange.toFixed(2)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
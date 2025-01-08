import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { Skeleton } from './ui/skeleton';

interface PriceChartProps {
  data: any[];
  period: string;
  isLoading: boolean;
}

export const PriceChart = ({ data, period, isLoading }: PriceChartProps) => {
  if (isLoading) {
    return <Skeleton className="w-full h-[300px]" />;
  }

  const formatXAxis = (timestamp: string) => {
    const date = new Date(timestamp);
    switch (period) {
      case '1h':
        return format(date, 'HH:mm');
      case '24h':
        return format(date, 'HH:mm');
      case '48h':
        return format(date, 'MM/dd HH:mm');
      case '1w':
        return format(date, 'EEE');
      case '30d':
        return format(date, 'MMM dd');
      case '1y':
        return format(date, 'MMM yyyy');
      default:
        return format(date, 'HH:mm');
    }
  };

  // Sort data by timestamp in ascending order
  const sortedData = [...data].sort((a, b) => {
    return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
  });

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer>
        <LineChart data={sortedData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
          <XAxis
            dataKey="timestamp"
            tickFormatter={formatXAxis}
            stroke="#6B7280"
          />
          <YAxis
            stroke="#6B7280"
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(17, 24, 39, 0.8)',
              border: 'none',
              borderRadius: '8px',
              padding: '12px',
            }}
            labelFormatter={(label) => format(new Date(label), 'PPpp')}
            formatter={(value: number) => [`$${value}`, 'Price']}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#34D399"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
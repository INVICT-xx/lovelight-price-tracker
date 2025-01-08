import { useEffect, useState } from 'react';
import { PriceChart } from '../components/PriceChart';
import { TimeSelector } from '../components/TimeSelector';
import { PriceTable } from '../components/PriceTable';
import { fetchPriceData } from '../utils/api';
import { useToast } from '../components/ui/use-toast';
import { Card } from '../components/ui/card';

const Index = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('24h');
  const [priceData, setPriceData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const loadData = async () => {
    try {
      setIsLoading(true);
      const data = await fetchPriceData();
      setPriceData(data);
    } catch (error) {
      toast({
        title: "Error fetching price data",
        description: "Please try again later",
        variant: "destructive",
      });
      console.error('Error fetching price data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 5 * 60 * 1000); // Poll every 5 minutes
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Power Price Tracker</h1>
          <p className="text-muted-foreground">Real-time electricity pricing dashboard</p>
        </header>

        <TimeSelector value={selectedPeriod} onChange={setSelectedPeriod} />

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Price Trends</h2>
            <PriceChart data={priceData} period={selectedPeriod} isLoading={isLoading} />
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Price History</h2>
            <PriceTable data={priceData} period={selectedPeriod} isLoading={isLoading} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
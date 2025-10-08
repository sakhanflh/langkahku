import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '../../components/utils/formatters';

export default function LineChartComponent({ chartData }) {
    return (
        <div className="bg-gray-700 rounded-xl md:rounded-2xl shadow-lg p-4 md:p-5 mb-6">
            <h2 className="text-xl font-semibold mb-4">Tren Aktivitas</h2>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={chartData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                        <XAxis dataKey="tanggal" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#1F2937',
                                borderColor: '#374151',
                                color: '#F3F4F6',
                              }}
                              formatter={(value, name) => {
                                switch (name) {
                                  case 'km':
                                    return [value, 'KM'];
                                  case 'order':
                                    return [value, 'Order'];
                                  case 'pendapatan':
                                    return [formatCurrency(value), 'Pendapatan'];
                                  case 'net':
                                    return [formatCurrency(value), 'Pendapatan Bersih'];
                                  default:
                                    return [value, name];
                                }
                              }}
                        />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="km"
                            stroke="#3B82F6"
                            strokeWidth={2}
                            activeDot={{ r: 8 }}
                            name="KM"
                        />
                        <Line
                            type="monotone"
                            dataKey="order"
                            stroke="#10B981"
                            strokeWidth={2}
                            name="Order"
                        />
                        <Line
                            type="monotone"
                            dataKey="pendapatan"
                            stroke="#F59E0B"
                            strokeWidth={2}
                            name="Pendapatan"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
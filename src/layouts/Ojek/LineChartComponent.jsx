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
                        <XAxis dataKey="date" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#F3F4F6' }}
                            formatter={(value, name) => {
                                if (name === 'income' || name === 'expense' || name === 'net') {
                                    return [formatCurrency(value), name === 'income' ? 'Pendapatan' : name === 'expense' ? 'Pengeluaran' : 'Bersih'];
                                }
                                return [value, name === 'km' ? 'KM' : 'Order'];
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
                            dataKey="orders"
                            stroke="#10B981"
                            strokeWidth={2}
                            name="Order"
                        />
                        <Line
                            type="monotone"
                            dataKey="income"
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
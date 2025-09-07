import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '../../components/utils/formatters';

export default function BarChartComponent({ chartData }) {
    return (
        <div className="bg-gray-700 rounded-xl md:rounded-2xl shadow-lg p-4 md:p-5 mb-6">
            <h2 className="text-xl font-semibold mb-4">Pendapatan vs Pengeluaran</h2>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                        <XAxis dataKey="date" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#F3F4F6' }}
                            formatter={(value) => formatCurrency(value)}
                        />
                        <Legend />
                        <Bar
                            dataKey="income"
                            fill="#10B981"
                            name="Pendapatan"
                            radius={[4, 4, 0, 0]}
                        />
                        <Bar
                            dataKey="expense"
                            fill="#EF4444"
                            name="Pengeluaran"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
import { useEffect, useState } from 'react';
import HeaderSection from '../layouts/Keuangan/HeaderSection';
import SummaryCards from '../layouts/Keuangan/SummaryCards';
import TransactionList from '../layouts/Keuangan/TransactionList';
import LoansSection from '../layouts/Keuangan/LoansSection';
import SavingsSection from '../layouts/Keuangan/SavingsSection';
import { getTransaksi, hapusTransaksi } from '../services/keuanganService';

export default function KeuanganPage() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true)
    const [selectedMonth, setSelectedMonth] = useState("Januari")
    const [selectedCategory, setSelectedCategory] = useState("Semua")

    const loans = [
        { id: 1, name: 'Kredit Motor', total: 18000000, paid: 9000000, dueDate: '12/12/2024' },
        { id: 2, name: 'Hutang Bank', total: 10000000, paid: 2500000, dueDate: '30/10/2024' },
    ];

    const savings = [
        { id: 1, name: 'Dana Darurat', target: 10000000, current: 6500000 },
        { id: 2, name: 'Liburan Akhir Tahun', target: 5000000, current: 2000000 },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getTransaksi()
                setTransactions(data)
            } catch (err) {
                console.error("Gagal fetch transaksi:", err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const handleDelete = async (id) => {
        if(!window.confirm("Yakin mau hapus transaksi ini?")) return;
        try {
            await hapusTransaksi(id);
            setTransactions(transactions.filter((t) => t._id !== id));
        } catch (err) {
            console.error("Gagal hapus transaksi:", err);
            alert("Gagal hapus transaksi");
        }
    };


    const totalIncome = transactions
        .filter((t) => t.jenis === "pemasukan")
        .reduce((sum, t) => sum + t.jumlah, 0)

    const totalExpense = transactions
        .filter((t) => t.jenis === "pengeluaran")
        .reduce((sum, t) => sum + t.jumlah, 0)

    const balance = totalIncome - totalExpense

    const savingsProgress = Math.round(
        (savings.reduce((a, s) => a + s.current, 0) /
            savings.reduce((a, s) => a + s.target, 0)) * 100
    )
    return (
        <div className="min-h-screen bg-gray-800 text-gray-100 p-4 md:p-6">
            <HeaderSection
                selectedMonth={selectedMonth}
                setSelectedMonth={setSelectedMonth}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />

            <SummaryCards
                totalIncome={totalIncome}
                totalExpense={totalExpense}
                balance={balance}
                savingsProgress={savingsProgress}
            />

            {loading ? (
                <p className="text-center text-gray-400">Memuat data transaksi...</p>
            ) : (
                <TransactionList transactions={transactions} onDelete={handleDelete}/>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                <LoansSection loans={loans} />
                <SavingsSection savings={savings} />
            </div>
        </div>
    );
}
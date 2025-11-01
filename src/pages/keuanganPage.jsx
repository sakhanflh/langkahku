import { useEffect, useState } from 'react';
import HeaderSection from '../layouts/Keuangan/HeaderSection';
import SummaryCards from '../layouts/Keuangan/SummaryCards';
import TransactionList from '../layouts/Keuangan/TransactionList';
import {
    editPengeluaranManual,
    getKeuangan,
    hapusPengeluaranManual,
    tambahPengeluaranManual
} from '../services/keuanganService';

export default function KeuanganPage() {
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    const [balance, setBalance] = useState(0);
    const [totalSavings, setTotalSavings] = useState(0);

    const today = new Date()
    const currentMonth = today.getMonth() + 1
    let currentWeek = Math.ceil(today.getDate() / 7)
    if (currentWeek > 4) currentWeek = 4

    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    const [selectedWeek, setSelectedWeek] = useState(currentWeek);

    // Fetch data keuangan
    const fetchKeuangan = async () => {
        setLoading(true);
        try {
            const data = await getKeuangan();
            setTransactions(data);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    // Filter transaksi berdasarkan bulan + minggu
    useEffect(() => {
        const filtered = transactions.filter(trx => {
            const date = new Date(trx.tanggal);
            const month = date.getMonth() + 1;
            let week = Math.ceil(date.getDate() / 7);
            if (week > 4) week = 4;

            if (month !== selectedMonth) return false;
            if (selectedWeek === "all") return true;
            return week === Number(selectedWeek);
        });
        setFilteredTransactions(filtered);

        // Hitung summary
        const income = filtered.reduce((acc, item) => acc + item.pendapatan, 0);
        const expense = filtered.reduce(
            (acc, item) => acc + (item.pengeluaranManual?.reduce((eAcc, e) => eAcc + e.nominal, 0) || 0),
            0
        );
        const savings = filtered.reduce((acc, item) => acc + (item.tabungan || 0), 0);
        const netBalance = filtered.reduce((acc, item) => acc + (item.pendapatanBersih || 0), 0);

        setTotalIncome(income);
        setTotalExpense(expense);
        setTotalSavings(savings);
        setBalance(netBalance);
    }, [transactions, selectedMonth, selectedWeek]);


    useEffect(() => {
        fetchKeuangan();
    }, []);

    // Tambah pengeluaran manual
    const handleAddExpense = async (keuanganId, kategori, nominal, catatan) => {
        try {
            await tambahPengeluaranManual({ keuanganId, kategori, nominal, catatan });
            fetchKeuangan();
        } catch (error) {
            console.error(error);
        }
    };

    // Edit pengeluaran manual
    const handleEdit = async (keuanganId, pengeluaranId, kategori, nominal, catatan) => {
        try {
            await editPengeluaranManual({ keuanganId, pengeluaranId, kategori, nominal, catatan });
            fetchKeuangan();
        } catch (error) {
            console.error(error);
        }
    };

    // Hapus pengeluaran manual
    const handleDelete = async (keuanganId, pengeluaranId) => {
        try {
            await hapusPengeluaranManual({ keuanganId, pengeluaranId });
            fetchKeuangan();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-800 text-gray-100 md:p-6">
            <HeaderSection
                selectedMonth={selectedMonth}
                setSelectedMonth={setSelectedMonth}
                selectedWeek={selectedWeek}
                setSelectedWeek={setSelectedWeek}
                onAddExpense={handleAddExpense}
                transactions={transactions}
            />

            <SummaryCards
                totalIncome={totalIncome}
                totalExpense={totalExpense}
                totalSavings={totalSavings}
                balance={balance}
            />
            <div className='grid grid-cols-1'>
                {loading ? (
                    <p className="text-center text-gray-400">Memuat data transaksi...</p>
                ) : (
                    <TransactionList
                        transactions={filteredTransactions}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                    />
                )}
            </div>
        </div>
    );
}

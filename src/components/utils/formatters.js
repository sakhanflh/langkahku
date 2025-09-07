// Format currency Rupiah
export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount);
};

// Menghitung pendapatan bersih
export const calculateNetIncome = (income, fuel, service) => {
    return income - (fuel + service);
};
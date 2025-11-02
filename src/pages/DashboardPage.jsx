import React, { useState } from 'react';
import { SummaryCards } from '../layouts/Dashboard/SummaryCards';
import { ChartWeekly } from '../layouts/Dashboard/ChartWeekly';

export function DashboardPage() {
    return (
        <div className="min-h-screen bg-gray-800 md:p-6">
            {/* Header */}
            <header className="mb-6">
                <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                <p className="text-gray-400">Ringkasan aktivitas dan pencapaian Anda</p>
            </header>

            {/* Ringkasan Cepat */}
            <div>
                <SummaryCards />
            </div>

            {/* Statistik */}
            <div>
                <ChartWeekly />
            </div>
        </div>
    );
};

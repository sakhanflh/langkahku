import { useState } from "react";
import { DompetRingkasan } from "../layouts/Dashboard/DompetRingkasan";
import { MoodRingkasan } from "../layouts/Dashboard/MoodRingkasan";
import { OjekOnlineRingkasan } from "../layouts/Dashboard/OjekOnlineRingkasan";
import { TodoListRingkasan } from "../layouts/Dashboard/TodoListRingkasan";
import MaxLayout from "../layouts/MaxLayout";
import { MainLayout } from "../layouts/MainLayout";

export default function DashboardPage() {
    return (
        <>
            <MaxLayout>
                <MainLayout>
                    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DompetRingkasan />
                        <MoodRingkasan />
                        <TodoListRingkasan />
                        <OjekOnlineRingkasan />
                    </div>
                </MainLayout>
            </MaxLayout>
        </>
    )
}
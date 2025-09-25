import { useEffect, useState } from 'react';
import HeaderSection from '../layouts/Todo/HeaderSection';
import GoalsSection from '../layouts/Todo/GoalsSection';
import TodoSection from '../layouts/Todo/TodoSection';
import ProgressSummary from '../layouts/Todo/ProgressSummary';
import { addTodo, deleteTodo, getTodo, updateTodo } from '../services/todoService';
import { getGoals, hapusGoal, tambahGoal, updateGoal } from '../services/goalService';

export default function GoalsAndTodoPage() {
    const [todos, setTodos] = useState([])
    const [goals, setGoals] = useState([])
    const [selectedFilter, setSelectedFilter] = useState("Hari ini")

    useEffect(() => {
        getTodo().then(setTodos)
        getGoals().then(setGoals)
    }, [])

    const handleAdd = async (type, data) => {
        if (type === "todo") {
            const newTodo = await addTodo(data)
            setTodos([...todos, newTodo.data])
        } else if (type === "goal") {
            const newGoal = await tambahGoal(data)
            setGoals([...goals, newGoal.data])
        }
    }

    const handleToggle = async (id) => {
        const current = todos.find(t => t._id === id)
        if (!current) return
        const update = await updateTodo(id, { selesai: !current.selesai })
        setTodos(todos.map(t => t._id === id ? update.data : t))
    }

    const handleToggleGoal = async (id) => {
        const current = goals.find(g => g._id === id);
        if (!current) return;
        const update = await updateGoal(id, { tercapai: !current.tercapai });
        setGoals(goals.map(g => g._id === id ? update.data : g));
    };

    const handleDelete = async (id) => {
        await deleteTodo(id)
        setTodos(todos.filter(t => t._id !== id))
    }

    const handleDeleteGoal = async (id) => {
        await hapusGoal(id)
        setGoals(goals.filter(t => t._id !== id))
    }

    const enrichedGoals = goals.map(goal => {
        const deadlineDate = new Date(goal.targetTanggal)
        const today = new Date()

        let status = "tertinggal"
        if (goal.progress >= 100) {
            status = "selesai"
        } else if (today <= deadlineDate) {
            status = "on-track"
        }

        return {...goal, status}
    })
    return (
        <div className="min-h-screen bg-gray-800 text-gray-100 md:p-6">
            <HeaderSection
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
                handleAdd={handleAdd}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <GoalsSection
                    goals={enrichedGoals}
                    toggleGoal={handleToggleGoal}
                    onDelete={handleDeleteGoal}
                />

                <div className="lg:col-span-1">
                    <TodoSection
                        todos={todos}
                        toggleTodo={handleToggle}
                        onDelete={handleDelete}
                    />
                    <ProgressSummary
                        goalsData={enrichedGoals}
                        todos={todos}
                    />
                </div>
            </div>
        </div>
    );
}
// export default function GoalCard({ goal }) {
//     return (
//         <div className="bg-gray-700 rounded-2xl shadow-md p-5 hover:shadow-lg transition-shadow">
//             <div className="flex justify-between items-start mb-3">
//                 <h3 className="font-medium text-lg">{goal.title}</h3>
//                 <span className={`text-xs px-2 py-1 rounded-full ${goal.status === 'on-track'
//                     ? 'bg-green-900 text-green-300'
//                     : 'bg-red-900 text-red-300'
//                     }`}>
//                     {goal.status === 'on-track' ? 'On Track' : 'Tertinggal'}
//                 </span>
//             </div>

//             <div className="mb-3">
//                 <div className="flex justify-between text-sm text-gray-400 mb-1">
//                     <span>Progress</span>
//                     <span>{goal.progress}%</span>
//                 </div>
//                 <div className="w-full bg-gray-600 rounded-full h-2.5">
//                     <div
//                         className={`h-2.5 rounded-full ${goal.status === 'on-track' ? 'bg-green-500' : 'bg-red-500'
//                             }`}
//                         style={{ width: `${goal.progress}%` }}
//                     ></div>
//                 </div>
//             </div>

//             <div className="flex justify-between items-center text-sm text-gray-400">
//                 <span>Deadline: {goal.deadline}</span>
//                 <button className="text-blue-400 hover:text-blue-300 text-xs">
//                     Lihat Detail
//                 </button>
//             </div>
//         </div>
//     );
// }
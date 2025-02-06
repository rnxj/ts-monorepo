"use client";

import apiClient from "@repo/api-client";
import { useEffect, useState } from "react";

type Task = {
  id: number;
  name: string;
  done: boolean;
  createdAt: string | null;
  updatedAt: string | null;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskName, setNewTaskName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [updatingTaskIds, setUpdatingTaskIds] = useState<number[]>([]);
  const [deletingTaskIds, setDeletingTaskIds] = useState<number[]>([]);
  const client = apiClient("/api");

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const response = await client.tasks.$get();
      const responseData = await response.json();

      if (Array.isArray(responseData)) {
        setTasks(responseData);
      } else {
        console.warn("Response is not an array:", responseData);
        setTasks([]);
      }
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      setTasks([]);
    } finally {
      setIsLoading(false);
    }
  };

  const createTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskName.trim() || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    try {
      await client.tasks.$post({
        json: {
          name: newTaskName,
          done: false,
        },
      });
      setNewTaskName("");
      await fetchTasks();
    } catch (error) {
      console.error("Failed to create task:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleTask = async (id: number, done: boolean) => {
    if (updatingTaskIds.includes(id)) {
      return;
    }

    setUpdatingTaskIds(prev => [...prev, id]);
    try {
      await client.tasks[":id"].$patch({
        param: { id },
        json: { done: !done },
      });
      await fetchTasks();
    } catch (error) {
      console.error("Failed to update task:", error);
    } finally {
      setUpdatingTaskIds(prev => prev.filter(taskId => taskId !== id));
    }
  };

  const deleteTask = async (id: number) => {
    if (deletingTaskIds.includes(id)) {
      return;
    }

    setDeletingTaskIds(prev => [...prev, id]);
    try {
      await client.tasks[":id"].$delete({
        param: { id },
      });
      await fetchTasks();
    } catch (error) {
      console.error("Failed to delete task:", error);
    } finally {
      setDeletingTaskIds(prev => prev.filter(taskId => taskId !== id));
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">Task Manager</h1>

        {/* Add Task Form */}
        <form onSubmit={createTask} className="mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              value={newTaskName}
              onChange={e => setNewTaskName(e.target.value)}
              placeholder="Enter new task..."
              disabled={isSubmitting}
              className="flex-1 rounded-md border-gray-300 px-4 py-2 text-black shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-blue-300"
            >
              {isSubmitting ? "Adding..." : "Add Task"}
            </button>
          </div>
        </form>

        {/* Task List */}
        <div className="divide-y rounded-lg bg-white shadow">
          {isLoading
            ? (
                <div className="p-4 text-center text-gray-500">
                  Loading tasks...
                </div>
              )
            : (
                <>
                  {tasks.map(task => (
                    <div key={task.id} className="flex items-center justify-between p-4">
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={task.done}
                          onChange={() => toggleTask(task.id, task.done)}
                          disabled={updatingTaskIds.includes(task.id)}
                          className="size-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:cursor-not-allowed"
                        />
                        <span className={`${task.done ? "text-gray-500 line-through" : "text-gray-900"}`}>
                          {task.name}
                        </span>
                      </div>
                      <button
                        onClick={() => deleteTask(task.id)}
                        disabled={deletingTaskIds.includes(task.id)}
                        className="text-red-600 hover:text-red-800 disabled:cursor-not-allowed disabled:text-red-300"
                      >
                        {deletingTaskIds.includes(task.id) ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  ))}
                  {tasks.length === 0 && (
                    <div className="p-4 text-center text-gray-500">
                      No tasks yet. Add one above!
                    </div>
                  )}
                </>
              )}
        </div>
      </div>
    </div>
  );
}

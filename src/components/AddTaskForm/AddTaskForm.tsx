import { addTask } from "@actions/taskAction";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/store";
import { FormEvent, useState } from "react";
import Button from "@components/ui/Button";
import Input from "@components/ui/Input";

import style from "./AddTaskForm.module.scss";

type TaskType = "homework" | "labwork" | "practicwork" | "general";
type PriorityType = "low" | "normal" | "high";

const AddTaskForm = ({ closeForm }: { closeForm: () => void }) => {
    const [isDay, setISDay] = useState(false);
    const [forGroup, setForGroup] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const loading = useSelector((state: RootState) => state.task.loading);
    const { user } = useSelector(
        (state: RootState) => state.auth
    );

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newTask = {
            title:
                (
                    event.currentTarget.elements.namedItem(
                        "title"
                    ) as HTMLInputElement
                )?.value ?? "",
            description:
                (
                    event.currentTarget.elements.namedItem(
                        "description"
                    ) as HTMLTextAreaElement
                )?.value ?? "",
            date:
                (
                    event.currentTarget.elements.namedItem(
                        "date"
                    ) as HTMLTextAreaElement
                )?.value ?? "",
            start_ts:
                (
                    event.currentTarget.elements.namedItem(
                        "startTs"
                    ) as HTMLInputElement
                )?.value ?? "",
            end_ts:
                (
                    event.currentTarget.elements.namedItem(
                        "endTs"
                    ) as HTMLInputElement
                )?.value ?? "",
            priority:
                ((
                    event.currentTarget.elements.namedItem(
                        "priority"
                    ) as HTMLSelectElement
                )?.value as PriorityType) ?? "normal",
            type:
                ((
                    event.currentTarget.elements.namedItem(
                        "taskType"
                    ) as HTMLSelectElement
                )?.value as TaskType) ?? "general",
        };
        try {
            await dispatch(addTask(newTask));
            closeForm();
        } catch (err) {
            if (err instanceof Error) {
                console.error(err.message);
            } else {
                console.error("Unknown error:", err);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className={style.form}>
            <h2>Создание новой задачи</h2>
            <div>
                <label htmlFor="title">Название задачи:</label>
                <Input type="text" id="title" name="title" required />
            </div>
            <div>
                <label htmlFor="description">Описание:</label>
                <textarea id="description" name="description"></textarea>
            </div>
            <div className={style.checkIsDay}>
                <label htmlFor="mode">
                    <span>Весь день</span>
                </label>
                <input
                    type="checkbox"
                    name="mode"
                    id="mode"
                    checked={isDay}
                    onChange={() => setISDay((prev) => !prev)}
                />
            </div>
            {user?.type == 'elder' && <div className={style.checkIsDay}>
                <label htmlFor="forGroup">
                    <span>Для группы</span>
                </label>
                <input
                    type="checkbox"
                    name="forGroup"
                    id="forGroup"
                    checked={forGroup}
                    onChange={() => setForGroup(prev => !prev)}
                />
            </div>}
            {isDay ? (
                <div>
                    <label htmlFor="date">День:</label>
                    <Input type="date" id="date" name="date" required />
                </div>
            ) : (
                <>
                    <div>
                        <label htmlFor="startTs">Начало:</label>
                        <Input
                            type="datetime-local"
                            id="startTs"
                            name="startTs"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="endTs">Окончание:</label>
                        <Input
                            type="datetime-local"
                            id="endTs"
                            name="endTs"
                            required
                        />
                    </div>
                </>
            )}

            <div>
                <label htmlFor="priority">Приоритет:</label>
                <select id="priority" name="priority">
                    <option value="low">Низкий</option>
                    <option value="normal">Нормальный</option>
                    <option value="high">Высокий</option>
                </select>
            </div>
            <div>
                <label htmlFor="taskType">Тип задачи:</label>
                <select id="taskType" name="taskType">
                    <option value="homework">Домашнее задание</option>
                    <option value="labwork">Лабораторная работа</option>
                    <option value="practicwork">Практическое занятие</option>
                    <option value="general">Общее дело</option>
                </select>
            </div>
            <Button disabled={loading} type="submit">
                {loading ? "Загрузка..." : "Создать"}
            </Button>
        </form>
    );
};

export default AddTaskForm;

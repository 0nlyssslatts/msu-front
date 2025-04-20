import React, { useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/store";

import styles from "./Calendar.module.scss";
import { fetchTaskDetails, fetchTasks } from "@actions/taskAction";
import Loader from "@components/Loader";

interface Event {
    type: string;
    event_id: string;
    title: string;
    start: string;
    end: string;
}

interface CalendarProps {
    events: Event[];
    gridType: "timeGridDay" | "timeGridWeek";
    onDatesChange?: (start: Date, end: Date) => void;
}

// Модальное окно для задач
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const TaskModalContent: React.FC<{ task; onClose: () => void }> = ({
    task,
    onClose,
}) => (
    <>
        <div className={styles.modalHeader}>
            <h2 className={styles.modalTitle}>Информация о задаче</h2>
            <button onClick={onClose} className={styles.closeButton}>
                ×
            </button>
        </div>
        <div className={styles.modalBody}>
            <p>
                <strong>Название:</strong> {task.title}
            </p>
            <p>
                <strong>Описание:</strong> {task.description || "—"}
            </p>
            <p>
                <strong>Приоритет:</strong> {task.priority}
            </p>
            {task.date && (
                <p>
                    <strong>Дата:</strong> {task.date}
                </p>
            )}
            {task.start_ts && (
                <p>
                    <strong>Начало:</strong>{" "}
                    {new Date(task.start_ts).toLocaleString()}
                </p>
            )}
            {task.end_ts && (
                <p>
                    <strong>Окончание:</strong>{" "}
                    {new Date(task.end_ts).toLocaleString()}
                </p>
            )}
            <p>
                <strong>Завершена:</strong> {task.completed ? "Да" : "Нет"}
            </p>
            <p>
                <strong>Для группы:</strong> {task.for_group ? "Да" : "Нет"}
            </p>
            <p>
                <strong>ID события:</strong> {task.event_id ?? "—"}
            </p>
        </div>
    </>
);

// Модальное окно для расписания
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const ScheduleModalContent: React.FC<{
    tasks;
    event: Event;
    onClose: () => void;
}> = ({ tasks, event, onClose }) => (
    <>
        <div className={styles.modalHeader}>
            <h2 className={styles.modalTitle}>
                Расписание события: {event.title}
            </h2>
            <button onClick={onClose} className={styles.closeButton}>
                ×
            </button>
        </div>
        <div className={styles.modalBody}>
            {tasks.length === 0 ? (
                <p>Ничего не найдено.</p>
            ) : (
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                tasks.map((task) => (
                    <div key={task.id} className={styles.taskItem}>
                        <p>
                            <strong>{task.title}</strong>
                        </p>
                        <p>{task.description}</p>
                        <hr />
                    </div>
                ))
            )}
        </div>
    </>
);

// Модальное окно по умолчанию
const DefaultModalContent: React.FC<{ event: Event; onClose: () => void }> = ({
    event,
    onClose,
}) => (
    <>
        <div className={styles.modalHeader}>
            <h2 className={styles.modalTitle}>Событие</h2>
            <button onClick={onClose} className={styles.closeButton}>
                ×
            </button>
        </div>
        <div className={styles.modalBody}>
            <p>
                <strong>Название:</strong> {event.title}
            </p>
            <p>
                <strong>Тип:</strong> {event.type}
            </p>
            <p>
                <strong>Начало:</strong>{" "}
                {new Date(event.start).toLocaleString()}
            </p>
            <p>
                <strong>Окончание:</strong>{" "}
                {new Date(event.end).toLocaleString()}
            </p>
        </div>
    </>
);

const Calendar = React.forwardRef<FullCalendar, CalendarProps>(
    ({ events, gridType, onDatesChange }, ref) => {
        const isInitial = useRef(true);
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
        const dispatch = useDispatch<AppDispatch>();
        const { selectedTask, tasks, loading, error } = useSelector(
            (state: RootState) => state.task
        );
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const handleEventClick = (info: any) => {
            const [type, event_id] = info.event.id.split("-");
            const event: Event = {
                type,
                event_id,
                title: info.event.title,
                start: info.event.start.toISOString(),
                end: info.event.end?.toISOString() || "",
            };

            setSelectedEvent(event);
            if (type === "task") {
                dispatch(fetchTaskDetails(event_id));
            }
            if (type === "schedule") {
                dispatch(fetchTasks({ event_id }));
            }
            setIsModalOpen(true);
        };

        const closeModal = () => {
            setIsModalOpen(false);
            setSelectedEvent(null);
        };

        const renderModalContent = () => {
            if (!selectedEvent) return null;
            switch (selectedEvent.type) {
                case "task":
                    if (loading) return <Loader />;
                    if (!selectedTask) return <p>Задача не найдена</p>;
                    return (
                        <TaskModalContent
                            task={selectedTask}
                            onClose={closeModal}
                        />
                    );
                case "schedule":
                    if (loading) return <Loader />;
                    if (error) return <p style={{ color: "red" }}>{error}</p>;
                    return (
                        <ScheduleModalContent
                            tasks={tasks}
                            event={selectedEvent}
                            onClose={closeModal}
                        />
                    );
                default:
                    return (
                        <DefaultModalContent
                            event={selectedEvent}
                            onClose={closeModal}
                        />
                    );
            }
        };

        return (
            <div>
                <FullCalendar
                    ref={ref}
                    plugins={[dayGridPlugin, timeGridPlugin]}
                    initialView={gridType}
                    datesSet={({ start, end }) => {
                        if (isInitial.current) {
                            isInitial.current = false;
                            return;
                        }
                        onDatesChange?.(start, end);
                    }}
                    initialDate={new Date()}
                    themeSystem="standard"
                    allDayText="День"
                    locale="ru"
                    slotLabelFormat={{
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                    }}
                    events={events}
                    height="85vh"
                    headerToolbar={{ center: "title", left: "", right: "" }}
                    slotMinTime="08:00:00"
                    slotMaxTime="23:59:00"
                    firstDay={1}
                    eventClick={handleEventClick}
                />

                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    contentLabel="Event Details"
                    style={{
                        overlay: {
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            zIndex: 1000,
                        },
                        content: {
                            margin: "auto",
                            height: "50%",
                            padding: "20px",
                            borderRadius: "8px",
                            backgroundColor: "#fff",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        },
                    }}
                >
                    {renderModalContent()}
                </Modal>
            </div>
        );
    }
);

export default Calendar;

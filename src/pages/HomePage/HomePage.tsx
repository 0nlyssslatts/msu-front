import Calendar from "@components/Calendar";
import { useRef, useMemo, useCallback, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/store";
import { getSchedule } from "@actions/scheduleActions";
import FullCalendar from "@fullcalendar/react";
import { addDays, format } from "date-fns";
import Button from "@components/ui/Button";

import style from "./HomePage.module.scss";
import { fetchTasks } from "@actions/taskAction";

const HomePage = () => {
    const calendar = useRef<FullCalendar | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const { items } = useSelector((state: RootState) => state.schedule);
    const { tasks } = useSelector((state: RootState) => state.task);
    const { user } = useSelector((state: RootState) => state.auth);

    const events = useMemo(() => {
        const scheduleEvents = items.map((item) => ({
            id: `schedule-${item.id}`,
            title: item.name,
            start: item.start_ts,
            end: item.end_ts,
        }));
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const taskEvents = tasks.map((task) => ({
            id: `task-${task.id}`,
            title: task.title,
            start: task.start_ts || task.date,
            end: task.end_ts || task.date,
            backgroundColor:
                task.priority === "high"
                    ? "#14005C"
                    : task.priority === "normal"
                    ? "#1D00C3"
                    : "#b9b9b9",
        }));

        return [...scheduleEvents, ...taskEvents];
    }, [items, tasks]);

    const handleDatesChange = useCallback(
        (start: Date, end: Date) => {
            const formattedStart = format(start, "yyyy-MM-dd");
            const formattedEnd = format(end, "yyyy-MM-dd");
            if (user) {
                dispatch(
                    getSchedule({
                        groupId: user.group_id,
                        start: formattedStart,
                        end: formattedEnd,
                    })
                );

                dispatch(
                    fetchTasks({
                        start: formattedStart,
                        end: formattedEnd,
                    })
                );
            }
        },
        [dispatch]
    );

    const nextDayHandler = () => calendar.current?.getApi().next();

    const prevDayHandler = () => calendar.current?.getApi().prev();

    useLayoutEffect(() => {
        handleDatesChange(new Date(), addDays(new Date(), 1));
    }, [handleDatesChange]);

    return (
        <section className={style.home}>
            <div className={style.home__header}>
                <h1>Главная</h1>
            </div>
            <div className={style.home__schedule}>
                <div className={style.home__schedule__buttons}>
                    <Button onClick={prevDayHandler}>{"<"}</Button>
                    <Button onClick={nextDayHandler}>{">"}</Button>
                </div>
                <Calendar
                    ref={calendar}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    events={events}
                    onDatesChange={handleDatesChange}
                    gridType="timeGridDay"
                />
            </div>
        </section>
    );
};

export default HomePage;

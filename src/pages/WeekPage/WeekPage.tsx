import Calendar from "@components/Calendar";
import Button from "@components/ui/Button";
import { useCallback, useLayoutEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/store";
import FullCalendar from "@fullcalendar/react";
import { getSchedule } from "@actions/scheduleActions";
import { endOfWeek, format, startOfWeek } from "date-fns";

import style from "./WeekPage.module.scss";

const WeekPage = () => {
    const calendar = useRef<FullCalendar | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const { items } = useSelector((state: RootState) => state.schedule);

    const events = useMemo(
        () =>
            items.map((item) => ({
                title: item.name,
                start: item.start_ts,
                end: item.end_ts,
            })),
        [items]
    );

    const handleDatesChange = useCallback(
        (start: Date, end: Date) => {
            dispatch(
                getSchedule({
                    groupId: 1,
                    start: format(start, "yyyy-MM-dd"),
                    end: format(end, "yyyy-MM-dd"),
                })
            );
        },
        [dispatch]
    );

    const nextWeekHandler = () => calendar.current?.getApi().next();

    const prevWeekHandler = () => calendar.current?.getApi().prev();

    useLayoutEffect(() => {
        const today = new Date();

        // Получаем начало и конец текущей недели
        const weekStart = startOfWeek(today, {
            weekStartsOn: 1, // Неделя начинается с понедельника
        });

        const weekEnd = endOfWeek(today, {
            weekStartsOn: 1,
        });
        handleDatesChange(weekStart, weekEnd);
    }, [handleDatesChange]);

    return (
        <section className={style.week}>
            <div className={style.week__header}>
                <h1>Расписание</h1>
            </div>
            <div className={style.week__schedule}>
                <div className={style.week__schedule__buttons}>
                    <Button onClick={prevWeekHandler}>{"<"}</Button>
                    <Button onClick={nextWeekHandler}>{">"}</Button>
                </div>
                <Calendar
                    ref={calendar}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    events={events}
                    onDatesChange={handleDatesChange}
                    gridType="timeGridWeek"
                />
            </div>
        </section>
    );
};
export default WeekPage;

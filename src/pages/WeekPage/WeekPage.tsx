import Calendar from "@components/Calendar";
import Button from "@components/ui/Button";
import { useCallback, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/store";
import FullCalendar from "@fullcalendar/react";
import { getSchedule } from "@actions/scheduleAction";
import { format } from "date-fns";

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
    return (
        <section className={style.week}>
            <div className={style.week__header}>
                <h1>Главная</h1>
            </div>
            <div className={style.week__schedule}>
                <div className={style.week__schedule__buttons}>
                    <Button onClick={prevWeekHandler}>{"<"}</Button>
                    <Button onClick={nextWeekHandler}>{">"}</Button>
                </div>
                <Calendar
                    ref={calendar}
                    events={events}
                    onDatesChange={handleDatesChange}
                    gridType="timeGridWeek"
                />
            </div>
        </section>
    );
};
export default WeekPage;

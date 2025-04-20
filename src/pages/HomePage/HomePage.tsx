import Calendar from "@components/Calendar";
import { useRef, useMemo, useCallback, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/store";
import { getSchedule } from "@actions/scheduleAction";
import FullCalendar from "@fullcalendar/react";
import { addDays, format } from "date-fns";
import Button from "@components/ui/Button";

import style from "./HomePage.module.scss";

const HomePage = () => {
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
                    events={events}
                    onDatesChange={handleDatesChange}
                    gridType="timeGridDay"
                />
            </div>
        </section>
    );
};

export default HomePage;

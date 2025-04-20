import Calendar from "@components/Calendar";
import { useRef, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/store";
import { getSchedule } from "@actions/scheduleAction";
import FullCalendar from "@fullcalendar/react";
import { format } from "date-fns";
import Button from "@components/ui/Button";
import { EventInput } from "@fullcalendar/core";

import style from "./HomePage.module.scss";
import { fetchTasks } from "@actions/taskAction";

const tasks = [
    {
      "id": 2,
      "title": "Лабораторная работа по физике: измерение температуры",
      "priority": "normal",
      "type": "labwork",
      "date": "2025-04-22",
      "start_ts": "2025-04-22T10:00:00",
      "end_ts": "2025-04-22T12:00:00"
    },
    {
      "id": 3,
      "title": "Практическая работа по программированию: создание калькулятора",
      "priority": "high",
      "type": "practicwork",
      "date": "2025-04-21",
    },
    {
      "id": 4,
      "title": "Прочитать главы 5-7 из учебника по химии",
      "priority": "low",
      "type": "homework",
      "date": null,
      "start_ts": null,
      "end_ts": null
    },
    {
      "id": 5,
      "title": "Общий тренинг по безопасности на работе",
      "priority": "normal",
      "type": "general",
      "date": "2025-04-23",
      "start_ts": "2025-04-23T09:00:00",
      "end_ts": "2025-04-23T17:00:00"
    }
]

const HomePage = () => {
    const calendar = useRef<FullCalendar | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const { items } = useSelector((state: RootState) => state.schedule);
    // const { tasks } = useSelector((state: RootState) => state.task);

    const events = useMemo<EventInput[]>(() => {
        const scheduleEvents: EventInput[] = items.map(item => ({
          id: `schedule-${item.id}`,
          title: item.name,
          start: item.start_ts,
          end:   item.end_ts,
          extendedProps: {
            type: "schedule" as const,
            data: item
          }
        }));
      
        const taskEvents: EventInput[] = tasks.map(task => ({
          id: `task-${task.id}`,
          title: task.title,
          start: task.start_ts ?? task.date ?? undefined,
          end:   task.end_ts   ?? task.date ?? undefined,
          backgroundColor:
            task.priority === "high"   ? "#14005C" :
            task.priority === "normal" ? "#1D00C3" :
                                         "#b9b9b9",
          extendedProps: {
            type: "task" as const,
            data: task
          }
        }));
      
        return [...scheduleEvents, ...taskEvents];
      }, [items, tasks]);
      
      const handleDatesChange = useCallback(
        (start: Date, end: Date) => {
          const formattedStart = format(start, "yyyy-MM-dd");
          const formattedEnd = format(end, "yyyy-MM-dd");
      
          dispatch(
            getSchedule({
              groupId: 1,
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
        },
        [dispatch]
      );

    const nextDayHandler = () => calendar.current?.getApi().next();

    const prevDayHandler = () => calendar.current?.getApi().prev();

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

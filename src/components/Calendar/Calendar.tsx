import React, { useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

interface Event {
    title: string;
    start: string;
    end: string;
}

interface CalendarProps {
    events: Event[];
    gridType: "timeGridDay" | "timeGridWeek";
    onDatesChange?: (start: Date, end: Date) => void;
}

const Calendar = React.forwardRef<FullCalendar, CalendarProps>(
    ({ events, gridType, onDatesChange }, ref) => {
        const isInitial = useRef(true);

        return (
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
                themeSystem="standard"
                locale="ru"
                events={events}
                height={700}
                headerToolbar={{ center: "title", left: "", right: "" }}
                slotMinTime="08:00:00"
                slotMaxTime="23:59:00"
            />
        );
    }
);

export default Calendar;

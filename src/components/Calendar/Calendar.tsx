import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const Calendar = () => {
    return (
        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridDay"
            themeSystem="standard"
            locale="ru"
            events={[
                {
                    title: "Задача1",
                    start: "2025-04-19T10:00:00",
                    end: "2025-04-19T12:00:00",
                },
                {
                    title: "Задача2",
                    start: "2025-04-19T12:05:00",
                    end: "2025-04-19T14:05:00",
                },
                {
                    title: "Задача3",
                    start: "2025-04-19T14:10:00",
                    end: "2025-04-19T16:10:00",
                },
            ]}
            height={700}
            headerToolbar={{
                right: "next",
                center: "title",
                left: "prev",
            }}
            slotMinTime="08:00:00"
            slotMaxTime="23:59:00"
        />
    );
};

export default Calendar;

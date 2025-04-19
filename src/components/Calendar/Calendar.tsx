import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

interface Event {
    title: string;
    start: string;
    end: string;
}

interface CalendarProps {
    events: Event[];
}

const Calendar: React.FC<CalendarProps> = ({ events }) => {
    return (
        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridDay"
            themeSystem="standard"
            locale="ru"
            events={events}
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

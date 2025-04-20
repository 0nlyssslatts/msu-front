import React, { useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import Modal from "react-modal";

import styles from './Calendar.module.scss';
import Button from "@components/ui/Button";

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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null); 

    const handleEventClick = (info: any) => {
      setSelectedEvent({
        title: info.event.title,
        start: info.event.start.toISOString(),
        end: info.event.end?.toISOString() || "",
      });
      setIsModalOpen(true); 
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
          themeSystem="standard"
          allDayText="День"
          locale="ru"
          slotLabelFormat={{
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          }}
          events={events}
          height="85vh"
          headerToolbar={{ center: "title", left: "", right: "" }}
          slotMinTime="08:00:00"
          slotMaxTime="23:59:00"
          eventClick={handleEventClick}
        />

        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
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
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Информация о задаче</h2>
          <span onClick={() => setIsModalOpen(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 50 50">
            <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
            </svg>
          </span>
          </div>
          {selectedEvent && (
            <div>
              <p><strong>Название:</strong> {selectedEvent.title}</p>
              <p><strong>Дата начала:</strong> {new Date(selectedEvent.start).toLocaleString()}</p>
              <p><strong>Дата окончания:</strong> {new Date(selectedEvent.end).toLocaleString()}</p>
            </div>
          )}
        </Modal>
      </div>
    );
  }
);

export default Calendar;

import Calendar from "@components/Calendar";
import { useLayoutEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/store";
import { getSchedule } from "@actions/scheduleAction";
import Loader from "@components/Loader";

const HomePage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { loading, items } = useSelector(
        (state: RootState) => state.schedule
    );
    useLayoutEffect(() => {
        const response = getSchedule({
            groupId: 1,
            start: "2025-04-19",
            end: "2025-04-20",
        });
        dispatch(response);
    }, []);

    if (loading) return <Loader />;

    return (
        <section>
            <div>
                <h1>Главная</h1>
            </div>
            <div>
                <Calendar
                    events={items.map((item) => {
                        return {
                            title: item.name,
                            start: item.start_ts,
                            end: item.end_ts,
                        };
                    })}
                />
            </div>
        </section>
    );
}; // 999

export default HomePage;

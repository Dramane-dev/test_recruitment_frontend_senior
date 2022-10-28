import React, { useState } from "react";
import { TEventProps } from "../types/TEventProps";
import "../css/Event.css";

export const EventComponent = (props: TEventProps) => {
    const [hour, setHour] = useState<string>(props.duration?.toFixed(2)?.toString().split(".")[0] as string);
    const [minute, setMinute] = useState<string>(
        props.duration?.toFixed(2)?.toString().split(".")[1].padEnd(0) as string
    );

    return (
        <>
            <div
                className="event"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    height: `${hour}${minute}px`,
                    border: `1px solid black`,
                    borderRadius: `${5}px`,
                    backgroundColor: "#D291BC",
                    // position: "absolute",
                    marginLeft: `${10}%`,
                    padding: `${2.5}%`,
                    width: "100%",
                    color: "#ffffff",
                    fontWeight: "bold",
                }}
            >
                {props.id}
            </div>
        </>
    );
};

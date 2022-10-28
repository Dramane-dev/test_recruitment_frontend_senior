import React, { useState, useEffect } from "react";
import "./App.css";
import { TInput } from "./types/TInput";
import { TScreenDimension } from "./types/TScreenDimensions";
import jsonDatas from "./input/input.json";
import { EventComponent } from "./components/Event";

export const App = () => {
    const [screenDimensions, setScreenDimensions] = useState<TScreenDimension>({
        height: window.innerHeight,
        width: window.innerWidth,
    });
    const [hours] = useState<number[]>([9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const [datas, setDatas] = useState<TInput[] | []>([]);

    const getEnglishHoursFormat = (event: TInput): number => {
        if (event) {
            let hour: string = event.start as string;
            let hourConverted: number = parseInt(hour.substring(0, 3));
            let englishHourFormat = hourConverted <= 12 ? hourConverted : hourConverted - 12;
            return englishHourFormat;
        }
        return 0;
    };

    const fillDatas = (values: TInput[]) => {
        let temporaryJsonDatas: TInput[] = [];

        values.map((value, index) => {
            let dataItem: TInput = {
                id: value["identifiant"],
                start: value["début"],
                duration: value["durée"],
            };

            temporaryJsonDatas.push(dataItem);
        });

        setDatas(temporaryJsonDatas);
    };

    const getScreenDimension = () => {
        setScreenDimensions({
            height: window.innerHeight,
            width: window.innerWidth,
        });
    };

    const generateUniqueKey = (num: number): string => {
        return Date.now() * num + (Math.random() + 1).toString(16).substring(7);
    };

    const convertMinToHour = (min: number): number => {
        return min / 60;
    };

    useEffect(() => {
        window.addEventListener("resize", getScreenDimension);
        fillDatas(jsonDatas);
        return () => window.removeEventListener("resize", getScreenDimension);
    }, [screenDimensions]);

    return (
        <>
            <div className="calendar">
                {hours.map((hour, hourIndex) => {
                    return (
                        <div
                            key={hourIndex}
                            className="hours"
                            style={{
                                height: Math.round(screenDimensions.height / 12),
                            }}
                        >
                            <p className="hour">{hourIndex > hours.indexOf(12) ? `${hour} pm` : `${hour} am`}</p>
                            {datas.map((data, dataIndex) => {
                                return hour === getEnglishHoursFormat(datas[dataIndex]) ? (
                                    // ? <p key={dataIndex} className="event">{ `Good ${getEnglishHoursFormat(datas[dataIndex])}` }</p>
                                    <EventComponent
                                        key={dataIndex}
                                        id={data.id}
                                        duration={convertMinToHour(data.duration as number)}
                                    />
                                ) : (
                                    <React.Fragment key={generateUniqueKey(dataIndex)}></React.Fragment>
                                );
                            })}
                        </div>
                    );
                })}
            </div>

            {/* <div className="calendar">
              {
                datas.map((hour, index) => {
                  return (
                    <div key={index} className="hours" style={{
                      height: Math.round(screenDimensions.height / 12)
                    }}>
                      {
                        hour.id
                      }
                    </div>
                  )
                })
              }
            </div> */}
        </>
    );
};

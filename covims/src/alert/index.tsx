import React from "react";

interface AlertProps {
    key: string;
    title: string;
    text: string;
    time: number
}

interface AlertState extends AlertProps {
}

function Alert(props: AlertProps) {
    return <div key={props.key}>
        <h4>{props.title}</h4>
        <p>{props.text}</p>
        <hr />
    </div>
}
export default Alert;

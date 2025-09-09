import React from "react";
import "../styles/TicketTag.css";

export default function TicketTag({ text }) {
  return <span className="ticket">{text}</span>;
}

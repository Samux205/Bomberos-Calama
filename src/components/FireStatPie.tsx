import React from "react";
import { PieChart, Pie, Cell } from "recharts";

interface FireStatPieProps {
  title: string;
  value: number;
  color: string;
  image: string;
}

export default function FireStatPie({
  title,
  value,
  color,
  image,
}: FireStatPieProps) {
  const data = [
    { name: "value", value },
    { name: "rest", value: 100 - value },
  ];

  return (
    <div style={{ textAlign: "center", margin: "1rem" }}>
      <h3 style={{ marginBottom: "0.5rem" }}>{title}</h3>

      <div style={{ position: "relative", width: 200, height: 200 }}>
        <PieChart width={200} height={200}>
          <Pie
            dataKey="value"
            data={data}
            innerRadius={60}
            outerRadius={90}
            startAngle={90}
            endAngle={-270}
          >
            <Cell fill={color} />
            <Cell fill="#e4e4e4" />
          </Pie>
        </PieChart>

        {/* 🔥 IMAGEN CENTRAL */}
        <img
          src={image}
          alt={title}
          style={{
            width: 55,
            height: 55,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            objectFit: "contain",
          }}
        />
      </div>

      <p style={{ fontWeight: "bold", marginTop: "0.5rem" }}>
        {value}%
      </p>
    </div>
  );
}

import { ResponsiveContainer, AreaChart, Area, Tooltip } from "recharts";

function StatChart({ data, dataKey, stroke }) {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      let info = "";
      if (payload[0].name == "perfectScore") {
        info = "perfect matches";
      }
      if (payload[0].name == "completed") {
        info = "completed interviews";
      }
      if (payload[0].name == "pending") {
        info = "pending interviews";
      }

      return (
        <div className="bg-white opacity-90 p-1">
          <p className="font-bold">{`${payload[0].payload.name}, 2021`}</p>
          <p className=" font-semibold">{`${payload[0].value} ${info !== "" ? info : dataKey}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="w-full h-20 mt-2">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart width={500} height={300} data={data}>
          <Tooltip
            content={<CustomTooltip />}
            labelFormatter={() => {
              return "Info";
            }}
          />
          <Area type="linear" dot r={2} dataKey={dataKey} stroke={stroke} fill={stroke} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default StatChart;

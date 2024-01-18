import { Button } from "@/components/ui/button";
import AnimatedNumbers from "react-animated-numbers";
import { Link, useSearchParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import domtoimage from "dom-to-image";
import i18next from "@/i18n/_index";
import { useLocalStorage } from "@uidotdev/usehooks";
import { History } from "../../hooks/voca/type";
import { LineChart, Line, ResponsiveContainer } from "recharts";

import { useRef } from "react";
function Result() {
  const container = useRef<HTMLDivElement>(null);
  const [searchParams] = useSearchParams();
  const [historys] = useLocalStorage<History[]>("history", []);
  const score = parseInt(searchParams.get("score") || "0", 10);
  const getLevel = (score: number): [number, string] => {
    if (score < 3000) {
      return [0, i18next.t("comment1")];
    } else if (score < 5000) {
      return [1, i18next.t("comment2")];
    } else if (score < 6000) {
      return [2, i18next.t("comment3")];
    } else if (score < 8000) {
      return [3, i18next.t("comment4")];
    } else if (score < 10000) {
      return [4, i18next.t("comment5")];
    } else if (score < 20000) {
      return [5, i18next.t("comment6")];
    } else {
      return [6, i18next.t("comment7")];
    }
  };
  const [level, comment] = getLevel(score);
  const handleSaveAsImage = () => {
    if (container.current) {
      console.log("copiedContent", container.current);
      const waterMark = document.createElement("div");
      waterMark.innerText =
        i18next.t("resultFrom") + " https://vocatest.online/";
      waterMark.setAttribute(
        "class",
        "absolute bottom-2 right-2 font-medium text-gray-400"
      );
      container.current.appendChild(waterMark);
      domtoimage
        .toPng(container.current)
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = "testvoca.png";
          link.click();
        })
        .catch((error) => {
          console.error("Error while saving as image:", error);
        });
    }
  };
  const prevData = historys.map((e) => e.score);
  console.log(prevData);
  const max = prevData.reduce((prev, curr) => (curr > prev ? curr : prev));
  const min = prevData.reduce((prev, curr) => (curr < prev ? curr : prev));
  const step = (max - min) / 10 || 1;
  const data = prevData.map((e) => ({ score: Math.floor(e / step) }));
  if (data.length === 1) {
    data.push(data[0]);
  }

  console.log(data);

  return (
    <div className="w-full h-screen pt-12 bg-white" ref={container}>
      <div className="w-full h-4/5 flex flex-col items-center space-y-1">
        <div className="text-5xl">{i18next.t("resultTitle")}</div>
        <Card className="w-11/12 pt-4  shadow-lg">
          <CardContent>
            <div>
              <AnimatedNumbers
                fontStyle={{ fontSize: "60px" }}
                includeComma={false}
                transitions={(index) => ({
                  type: "spring",
                  duration: index + 0.1,
                })}
                animateToNumber={score}
                className="justify-center"
              />
            </div>
            <div className="text-md text-center">{i18next.t("scoreLabal")}</div>
          </CardContent>
        </Card>
        <Card className="w-11/12 px-4shadow-lg">
          <CardContent className="w-full h-full space-y-2">
            <div className="h-8"></div>
            <Level level={level} />
            <div className="text-md text-center">{comment}</div>
          </CardContent>
        </Card>
        <Card className="w-11/12 shadow-lg h-36 grow">
          <CardContent className="w-full h-full space-y-2">
            <ResponsiveContainer width="100%" height="90%">
              <LineChart width={300} height={100} data={data}>
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#000000"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="text-md text-center">{i18next.t("history")}</div>
          </CardContent>
        </Card>
      </div>

      <div className="w-full h-1/5 flex flex-col sm:flex-row  space-y-1 sm:space-y-0 space-x-0 sm:space-x-1 justify-center items-center ">
        <Link to={"/test"}>
          <Button size={"lg"}>{i18next.t("again")}</Button>
        </Link>
        <Button
          size={"lg"}
          onClick={() => {
            handleSaveAsImage();
          }}
        >
          {i18next.t("save")}
        </Button>
      </div>
    </div>
  );
}

function Level({ level }: { level: number }) {
  const colors = [
    "bg-slate-200",
    "bg-slate-300",
    "bg-slate-400",
    "bg-slate-500",
    "bg-slate-600",
    "bg-slate-700",
    "bg-slate-950",
  ];
  const levels = colors.map((color, index) => (
    <div className="flex flex-col grow items-center space-y-1" key={color}>
      <div className={`rounded-sm h-2 sm:h-8 w-full  ${color}`}></div>
      {index === level && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4 sm:w-8 sm:h-8"
        >
          <path
            fillRule="evenodd"
            d="M11.47 2.47a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06l-6.22-6.22V21a.75.75 0 0 1-1.5 0V4.81l-6.22 6.22a.75.75 0 1 1-1.06-1.06l7.5-7.5Z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </div>
  ));
  return (
    <div className="w-full flex flex-row justify-between space-x-1">
      {levels}
    </div>
  );
}
export default Result;

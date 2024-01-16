import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AnimatedNumbers from "react-animated-numbers";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
function Index() {
  const [users, setUsers] = useState(0);
  useEffect(() => {
    fetch("https://worker.vocatest.online/", {
      method: "GET",
      headers: { "Content-Type": "text/plain", "x-signal": "get" },
    })
      .then((resp) => resp.text())
      .then((cstr) => parseInt(cstr, 10) || 0)
      .then((c) => setUsers(c))
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="w-full h-full">
      <div className="w-full h-1/2 flex flex-col items-center space-y-1">
        <div className="h-2/5"></div>
        <h1 className="text-5xl font-semibold">词汇量测试</h1>
        <p className="text-sm text-neutral-400">
          词库基于{" "}
          <a href="https://www.english-corpora.org/coca/" className="underline">
            COCA
          </a>
        </p>
      </div>
      <div className="w-full h-1/2 flex flex-col items-center space-y-1">
        <div className="h-2/5"></div>
        <Link to={"/test"}>
          <Button
            size={"lg"}
            onClick={() => {
              fetch("https://worker.vocatest.online/", {
                method: "GET",
              }).catch((err) => {
                console.log(err);
              });
            }}
          >
            开始
          </Button>
        </Link>
        <div className="h-2"></div>
        <div className="flex flex-row  space-x-1">
          <Badge variant={"outline"}>
            <AnimatedNumbers
              includeComma
              transitions={(index) => ({
                type: "spring",
                duration: index + 0.1,
              })}
              animateToNumber={users}
            />
          </Badge>
          <span>人参与过此测试</span>
        </div>
      </div>
    </div>
  );
}

export default Index;

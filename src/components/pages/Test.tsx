import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import useVoca from "../../hooks/voca/_index";
import { Candidate, History } from "../../hooks/voca/type";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { produce } from "immer";
import { useNavigate } from "react-router-dom";
import i18next from "@/i18n/_index";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useLocalStorage } from "@uidotdev/usehooks";

function Test() {
  const { loaded, candidate, progressRate, next, end } = useVoca({
    pageCount: 10,
    totalCount: 100,
  });
  const [disPlayCandidata, setDisPlayCandidata] = useState<Candidate[]>([]);
  useEffect(() => {
    setDisPlayCandidata(candidate);
  }, [candidate]);
  const [historys, saveHistorys] = useLocalStorage<History[]>("history", []);
  const navigate = useNavigate();

  if (!loaded) {
    return (
      <div className="w-full h-full flex items-center flex-col space-y-4">
        <div className="h-1/4"></div>
        <span className="loading loading-ring loading-lg"></span>
        <p>loading resource</p>
      </div>
    );
  }
  return (
    <div className="w-full h-full flex justify-center items-center flex-col">
      <div className="w-[102%] absolute top-0">
        <Progress value={progressRate} className="w-full h-2" />
      </div>
      <div className="flex justify-around items-start flex-col h-4/6">
        {disPlayCandidata.map((e) => (
          <div className="items-center flex space-x-2" key={e.content}>
            <Checkbox
              id={e.content}
              checked={e.marked}
              className="h-6 w-6"
              onCheckedChange={(checked) => {
                if (typeof checked === "boolean") {
                  setDisPlayCandidata(
                    produce(disPlayCandidata, (draft) => {
                      draft.forEach((item) => {
                        if (item.content === e.content) {
                          item.marked = checked;
                        }
                      });
                    })
                  );
                }
              }}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor={e.content}
                className="text-4xl font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {e.content}
              </label>
            </div>
          </div>
        ))}
      </div>
      <div className="h-16"></div>
      <div className="flex flex-row space-x-4">
        {progressRate > 100 && (
          <Button
            size={"lg"}
            onClick={() => {
              const score = end();
              navigate("/result?score=" + score.toString());
            }}
          >
            {i18next.t("end")}
          </Button>
        )}{" "}
        {progressRate === 100 ? (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size={"lg"}>{i18next.t("continue")}</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {i18next.t("endConfirmTitle")}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {i18next.t("endConfirmDesc")}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel
                  onClick={() => {
                    const score = end();
                    saveHistorys([
                      ...historys,
                      { time: new Date().getTime(), score: score },
                    ]);
                    navigate("/result?score=" + score.toString());
                  }}
                >
                  {i18next.t("end")}
                </AlertDialogCancel>
                <AlertDialogAction onClick={() => next(disPlayCandidata)}>
                  {i18next.t("continue")}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <>
            <Button
              size={"lg"}
              onClick={() => {
                next(disPlayCandidata);
              }}
            >
              {i18next.t("contiune")}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default Test;

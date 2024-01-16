import { useEffect, useRef, useState } from "react";
import { Candidate, Progress } from "./type";
import { assignCandidate } from "./assignment";
import { pickCandidate } from "./pick";
import { vocabularyAddup } from "./addup";
import { group } from "./group";

export default function useVoca({
  pageCount,
  totalCount,
}: {
  pageCount: number;
  totalCount: number;
}) {
  const levels = useRef([1, 2, 3, 4, 5]);
  const count = useRef(pageCount);
  const total = useRef(totalCount);
  const used = useRef(0);
  const voca = useRef<string[][]>([]);
  const vocaLevelGroup = useRef<number[]>([]);
  const progress = useRef<Progress[]>(
    levels.current.map(() => ({ passed: 0, used: 0 }))
  );
  const [progressRate, setProgressRate] = useState(0);
  const [candidate, setCandidate] = useState<Candidate[]>([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    fetch("https://file.vocatest.online/voca_coca.csv", { method: "GET" })
      .then((resp) => resp.text())
      .then((csv) => group(csv))
      .then((g) => {
        voca.current = g;
        vocaLevelGroup.current = g.map((gl) => gl.length);
      })
      .then(() => {
        next([]);
        setLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const next = (items: Candidate[]) => {
    items.forEach((item) => {
      const index = item.level - 1;
      const g = progress.current[index];
      if (g) {
        progress.current[index] = {
          used: ++g.used,
          passed: item.marked ? ++g.passed : g.passed,
        };
      }
      voca.current[index] = voca.current[index].filter(
        (v) => v != item.content
      );
      used.current++;
    });
    const assignment = assignCandidate(progress.current);
    setCandidate(pickCandidate(assignment, voca.current, count.current));
    setProgressRate(
      Math.round(((used.current + pageCount) / total.current) * 100)
    );

    const s = vocabularyAddup(progress.current, vocaLevelGroup.current);
    return s;
  };
  const end = () => {
    return vocabularyAddup(progress.current, vocaLevelGroup.current);
  };

  return { candidate, next, end, progressRate, loaded };
}

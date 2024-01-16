import * as lo from "lodash";
export function group(csv: string) {
  const rows = csv.split("\n");
  const peers = rows
    .map((row) => {
      const fileds = row.split(",");
      if (fileds.length != 2) {
        return;
      }
      const clazz = parseInt(fileds[1], 10);
      const peer: [string, number] = [fileds[0], clazz];
      return peer;
    })
    .filter((peer): peer is [string, number] => peer !== undefined);

  const group: string[][] = [[], [], [], [], []];
  peers.forEach(([voca, clazz]) => {
    if (clazz <= 5) {
      group[0].push(voca);
    } else if (clazz <= 10) {
      group[1].push(voca);
    } else if (clazz <= 15) {
      group[2].push(voca);
    } else if (clazz <= 20) {
      group[3].push(voca);
    } else {
      group[4].push(voca);
    }
  });
  console.log(
    "group",
    group.map((g) => g.length)
  );
  return group.map((g) => lo.shuffle(g));
}

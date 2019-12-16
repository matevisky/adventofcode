let input = `10 ORE => 10 A
1 ORE => 1 B
7 A, 1 B => 1 C
7 A, 1 C => 1 D
7 A, 1 D => 1 E
7 A, 1 E => 1 FUEL`

input = `9 ORE => 2 A
8 ORE => 3 B
7 ORE => 5 C
3 A, 4 B => 1 AB
5 B, 7 C => 1 BC
4 C, 1 A => 1 CA
2 AB, 3 BC, 4 CA => 1 FUEL`

input = `14 FTHZP => 8 NXVR
103 ORE => 1 RHWM
3 JQLZ, 13 ZWNK, 4 JLBM => 4 GTNG
2 VZLV, 2 ZWNK, 3 WNVTN => 5 NWQSK
170 ORE => 4 JZXV
5 PCML, 12 BHVK => 3 PLMZW
2 QCHGV => 9 PCHB
2 NBVQN => 7 NMWJT
1 VXVP, 1 TRPXQ => 9 WQHG
7 JLBM, 26 NMWJT => 8 WVHS
32 TBPB, 1 BHVK => 9 LCQZ
1 KNBSR => 4 PWTQ
155 ORE => 1 VXVP
4 LCQZ => 7 DGTV
143 ORE => 4 FMWHV
1 QBFR, 1 QCHGV, 9 LCMK => 5 GRTNC
20 NXVR, 2 PLMZW => 3 LHPC
1 GTNG, 33 VZLV, 5 LHPC, 4 WVHS, 2 PLMZW, 1 GRTNC, 1 LCQZ => 2 BMKLF
1 SQRH, 3 RJSR, 2 DZTDK, 14 WVHS, 9 PCHB, 9 NWQSK, 1 PCML => 7 RSXWV
1 LCMK, 5 WVHS, 1 DZVH => 1 JQLZ
117 ORE => 6 VDND
3 VDND => 1 FTHZP
1 PWTQ, 1 VZWZ, 13 NBVQN => 9 PCML
1 RHWM => 1 FRLXT
5 WBHBG, 1 JZXV => 3 QCHGV
6 JZXV => 7 WBHBG
14 FMWHV => 2 TRPXQ
22 FTHZP, 4 XMCX => 8 ZWNK
8 LCXZ => 9 QBFR
21 QCHGV => 6 QTQDQ
4 GTNG => 4 DZTDK
1 VDND, 2 VXVP => 8 KNBSR
8 XMBW => 8 NBVQN
3 SPQKS => 2 LTSHN
3 VZWZ => 6 XSXB
1 XSXB => 5 WNVTN
1 LHPH, 33 DZVH, 8 PCHB => 9 VZWZ
5 XMBW, 1 WVHS => 9 QPXNT
1 GBJFW, 3 XHFZ, 22 JLBM => 3 LCXZ
17 KNBSR => 7 XMBW
8 WVHS => 8 VZLV
2 NMWJT, 7 NXVR, 6 LNVPT => 9 TWVWC
1 SQRH => 9 RJSR
8 JLBM, 15 GBJFW => 5 TBPB
15 DGTV => 7 TVXN
11 KJPQ, 10 VDND => 6 SQRH
2 TRPXQ => 2 DZVH
10 WBHBG, 1 KJPQ => 5 JLBM
12 PCHB => 9 BHVK
5 WQHG => 5 SPQKS
7 PWTQ, 13 TRPXQ => 4 MKFD
2 NBVQN, 2 TBPB, 6 BHVK => 5 LNVPT
3 MKFD, 15 KNBSR, 2 WBHBG => 3 KJPQ
3 MKFD => 6 LCMK
1 PWTQ, 1 QTQDQ, 4 LNVPT => 9 WVXD
2 PCHB, 14 KNBSR, 5 LTSHN => 1 GBJFW
1 DGTV, 1 TVXN, 21 LHPC, 4 GBJFW, 11 TWVWC, 1 WQHG, 18 LCXZ => 4 KJNJ
96 RHWM, 6 KJNJ, 1 BMKLF, 20 TVXN, 16 RSXWV, 3 RJSR, 53 QPXNT, 26 WVXD => 1 FUEL
1 FRLXT => 4 LHPH
2 XHFZ => 6 XMCX
2 XMBW, 22 FTHZP => 9 XHFZ`

const loadMap = input => {
  const ruleMap = {}

  input.split("\n")
    .forEach(line => {
      const [l, r] = line.split(" => ")
      const lr = Number(r.split(" ")[0])
      const rr = r.split(" ")[1]
      ruleMap[rr] = ruleMap[rr] || { from: [], to: [], need: 0, produce: null }
      ruleMap[rr] = { ...ruleMap[rr], produce: lr };
      l.split(", ").forEach(li => {
        const lli = Number(li.split(" ")[0])
        const rli = li.split(" ")[1]
        ruleMap[rr].from.push({ item: rli, need: lli });
        ruleMap[rli] = ruleMap[rli] || { from: [], to: [], need: 0, produce: null }
        ruleMap[rli].to.push(rr);
      })
    });

  return ruleMap
}

const initMap = (ruleMap, start = 1) => {
  ruleMap['FUEL'].need = start;
  return ruleMap
}

const getMapTop = ruleMap => Object.keys(ruleMap).find(i => ruleMap[i].to.length == 0)
const explodeNode = (ruleMap, nodeKey) => {
  const node = ruleMap[nodeKey]
  const need = node.need
  const produce = node.produce
  const multiplier = Math.ceil(need / produce)
  // console.log({ node, need, produce, multiplier })
  node.from.forEach(i => {
    ruleMap[i.item].need += i.need * multiplier
  })

}
const removeNode = (ruleMap, nodeKey) => {
  delete (ruleMap[nodeKey]);
  Object.keys(ruleMap).forEach(i => ruleMap[i].to = ruleMap[i].to.filter(j => j != nodeKey))
}

const runTest = startOre => {
  let ruleMap = loadMap(input);
  initMap(ruleMap, startOre);

  let step = 0;
  let topNode = null;
  do {
    step++
    if (step > 1000) break;
    topNode = getMapTop(ruleMap);
    // console.log(step, ': topnode', topNode);
    if (topNode == "ORE") break;
    explodeNode(ruleMap, topNode);
    removeNode(ruleMap, topNode);
  } while (topNode)

  return ruleMap.ORE.need
}
// for (let i = 1144296; i < 2144296)
console.log(1000000000000 - runTest(1893569));
// console.log(ruleMap.size);
// console.log(1000000000000 / 180697)




test("dummy", () => { })

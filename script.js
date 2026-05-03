const TEAMS = [
  "Phượng",
  "Thống Nhất",
  "Miêu Nha",
  "Đoàn Kết",
  "Tự Do",
  "Trung Niên",
];

const SCH = [
  {
    id: 1,
    date: "24/4",
    dow: "Sáu",
    time: "18:00",
    h: "Phượng",
    a: "Thống Nhất",
  },
  {
    id: 2,
    date: "24/4",
    dow: "Sáu",
    time: "19:30",
    h: "Miêu Nha",
    a: "Đoàn Kết",
  },
  {
    id: 3,
    date: "26/4",
    dow: "CN",
    time: "15:30",
    h: "Tự Do",
    a: "Trung Niên",
  },
  { id: 4, date: "26/4", dow: "CN", time: "17:30", h: "Phượng", a: "Đoàn Kết" },
  { id: 5, date: "29/4", dow: "Tư", time: "18:00", h: "Miêu Nha", a: "Tự Do" },
  {
    id: 6,
    date: "29/4",
    dow: "Tư",
    time: "19:30",
    h: "Phượng",
    a: "Trung Niên",
  },
  {
    id: 7,
    date: "1/5",
    dow: "Thứ 6",
    time: "16:00",
    h: "Thống Nhất",
    a: "Trung Niên",
  },
  { id: 8, date: "1/5", dow: "Thứ 6", time: "17:30", h: "Phượng", a: "Tự Do" },
  { id: 9, date: "3/5", dow: "CN", time: "15:00", h: "Đoàn Kết", a: "Tự Do" },
  {
    id: 10,
    date: "3/5",
    dow: "CN",
    time: "16:30",
    h: "Thống Nhất",
    a: "Miêu Nha",
  },
  {
    id: 11,
    date: "5/5",
    dow: "Ba",
    time: "18:00",
    h: "Trung Niên",
    a: "Miêu Nha",
  },
  {
    id: 12,
    date: "5/5",
    dow: "Ba",
    time: "19:30",
    h: "Đoàn Kết",
    a: "Thống Nhất",
  },
  {
    id: 13,
    date: "7/5",
    dow: "Năm",
    time: "18:00",
    h: "Phượng",
    a: "Miêu Nha",
  },
  {
    id: 14,
    date: "7/5",
    dow: "Năm",
    time: "19:30",
    h: "Tự Do",
    a: "Thống Nhất",
  },
  {
    id: 15,
    date: "8/5",
    dow: "Sáu",
    time: "18:00",
    h: "Trung Niên",
    a: "Đoàn Kết",
  },
  {
    id: 16,
    date: "10/5",
    dow: "CN",
    time: "15:30",
    h: "PLAYOFF",
    a: "PLAYOFF",
    isPlayoff: true,
  },
  {
    id: 17,
    date: "13/5",
    dow: "Tư",
    time: "15:30",
    h: "FINAL",
    a: "FINAL",
    isFinal: true,
  },
];

let SC = {
  1: { h: "1", a: "0" },
  2: { h: "8", a: "1" },
  3: { h: "0", a: "1" },
  4: { h: "3", a: "3" },
  5: { h: "3", a: "2" },
  6: { h: "0", a: "1" },
  7: { h: "3", a: "1" },
  8: { h: "3", a: "2" },
  9: { h: "4", a: "3" },
  10: { h: "2", a: "5" },
  // 11: { h: "8", a: "1" },
  // 12: { h: "8", a: "1" },
  // 13: { h: "8", a: "1" },
  // 14: { h: "8", a: "1" },
  // 15: { h: "8", a: "1" },
  // 16: { h: "8", a: "1" },
  // 17: { h: "8", a: "1" },
};

function getHeadToHead(team1, team2) {
  let pts1 = 0,
    pts2 = 0,
    gf1 = 0,
    gf2 = 0;

  SCH.forEach((m) => {
    if (m.isPlayoff || m.isFinal) return;
    const r = SC[m.id];
    if (!r || r.h === "" || r.a === "") return;
    const h = +r.h,
      a = +r.a;
    if (isNaN(h) || isNaN(a)) return;

    if ((m.h === team1 && m.a === team2) || (m.h === team2 && m.a === team1)) {
      if (m.h === team1) {
        gf1 += h;
        gf2 += a;
        if (h > a) pts1 += 3;
        else if (h < a) pts2 += 3;
        else {
          pts1++;
          pts2++;
        }
      } else {
        gf1 += a;
        gf2 += h;
        if (a > h) pts1 += 3;
        else if (a < h) pts2 += 3;
        else {
          pts1++;
          pts2++;
        }
      }
    }
  });

  if (pts1 !== pts2) return pts2 - pts1;
  if (gf1 !== gf2) return gf2 - gf1;
  return 0;
}

function getRank() {
  const s = {};
  TEAMS.forEach((t) => {
    s[t] = { t, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 };
  });

  SCH.forEach((m) => {
    if (m.isPlayoff || m.isFinal) return;

    const r = SC[m.id];
    if (!r || r.h === "" || r.a === "") return;
    const h = +r.h,
      a = +r.a;
    if (isNaN(h) || isNaN(a)) return;

    s[m.h].p++;
    s[m.a].p++;
    s[m.h].gf += h;
    s[m.h].ga += a;
    s[m.a].gf += a;
    s[m.a].ga += h;

    if (h > a) {
      s[m.h].w++;
      s[m.h].pts += 3;
      s[m.a].l++;
    } else if (h < a) {
      s[m.a].w++;
      s[m.a].pts += 3;
      s[m.h].l++;
    } else {
      s[m.h].d++;
      s[m.a].d++;
      s[m.h].pts++;
      s[m.a].pts++;
    }
  });

  return Object.values(s).sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts;
    const h2h = getHeadToHead(a.t, b.t);
    if (h2h !== 0) return h2h;
    return b.gf - b.ga - (a.gf - a.ga);
  });
}

function getPlayoffTeams() {
  const rank = getRank();
  return { team2: rank[1]?.t || "Hạng 2", team3: rank[2]?.t || "Hạng 3" };
}

function getFinalTeams() {
  const rank = getRank();
  const playoffResult = SC[16];
  let playoffWinner = "Thắng Playoff";

  if (playoffResult && playoffResult.h !== "" && playoffResult.a !== "") {
    const h = +playoffResult.h,
      a = +playoffResult.a;
    if (!isNaN(h) && !isNaN(a)) {
      const { team2, team3 } = getPlayoffTeams();
      playoffWinner = h > a ? team2 : team3;
    }
  }

  return { team1: rank[0]?.t || "Hạng 1", playoffWinner };
}

function renderRank() {
  const rows = getRank();
  const groupMatches = SCH.filter((m) => !m.isPlayoff && !m.isFinal);
  const played = groupMatches.filter((m) => {
    const r = SC[m.id];
    return r && r.h !== "";
  }).length;
  const goals = rows.reduce((s, r) => s + r.gf, 0);

  document.getElementById("statChips").innerHTML = `
    <div class="chip"><div class="chip-val">${rows.length}</div><div class="chip-lab">Đội</div></div>
    <div class="chip"><div class="chip-val">${groupMatches.length}</div><div class="chip-lab">Trận VB</div></div>
    <div class="chip"><div class="chip-val">${played}</div><div class="chip-lab">Đã đá</div></div>
    <div class="chip"><div class="chip-val">${goals}</div><div class="chip-lab">Bàn thắng</div></div>`;

  document.getElementById("rankRows").innerHTML = rows
    .map((r, i) => {
      const cls = ["", "r1", "r2", "r3"][i] || "";
      const pcls = ["p1", "p2", "p3", "pn", "pn", "pn"][i];
      const gd = r.gf - r.ga;
      return `<div class="rank-row ${i < 3 ? "top3" : ""} ${cls}">
      <div><span class="pos ${pcls}">${i + 1}</span></div>
      <div class="rname">${r.t}</div>
      <div class="rc">${r.w}</div>
      <div class="rc">${r.d}</div>
      <div class="rc">${r.l}</div>
      <div class="rc">${gd > 0 ? "+" + gd : gd}</div>
      <div class="rc">${r.gf}</div>
      <div class="rpts">${r.pts}</div>
    </div>`;
    })
    .join("");
}

function renderMatches() {
  const byDate = {};
  const { team2, team3 } = getPlayoffTeams();
  const { team1, playoffWinner } = getFinalTeams();

  SCH.forEach((m) => {
    if (!byDate[m.date]) byDate[m.date] = { dow: m.dow, ms: [] };
    byDate[m.date].ms.push(m);
  });

  document.getElementById("matchList").innerHTML = Object.entries(byDate)
    .map(([d, v]) => {
      const cards = v.ms
        .map((m) => {
          const r = SC[m.id] || { h: "", a: "" };
          const done = r.h !== "" && r.a !== "";

          let homeTeam = m.h;
          let awayTeam = m.a;
          let specialClass = "";

          if (m.isPlayoff) {
            homeTeam = team2;
            awayTeam = team3;
            specialClass = " playoff-match";
          } else if (m.isFinal) {
            homeTeam = team1;
            awayTeam = playoffWinner;
            specialClass = " final-match";
          }

          return `<div class="mcard${done ? " done" : ""}${specialClass}" id="mc${m.id}">
        <div class="mcard-inner">
          <div class="mt">${homeTeam}</div>
          <div class="mscore">
            <div class="mscore-nums">
              <div class="sn${done ? " active" : ""}">${done ? r.h : "–"}</div>
              <span class="ssep">:</span>
              <div class="sn${done ? " active" : ""}">${done ? r.a : "–"}</div>
            </div>
            <div class="mtime">${m.time} &nbsp;·&nbsp; <span class="${done ? "sp-done" : "sp-up"} status-pill">${done ? "Đã thi đấu" : "Chưa đá"}</span></div>
          </div>
          <div class="mt r">${awayTeam}</div>
        </div>
      </div>`;
        })
        .join("");

      return `<div class="match-group">
      <div class="mg-header"><span class="mg-date">${v.dow}, ${d}/2025</span><div class="mg-line"></div></div>
      ${cards}</div>`;
    })
    .join("");
}

function updateNext() {
  const next = SCH.find((m) => !SC[m.id] || SC[m.id].h === "");

  // Update hero status
  const heroEyebrow = document.querySelector(".hero-eyebrow");
  const eyebrowText = document.querySelector(".eyebrow-text");
  const liveDot = document.querySelector(".live-dot");

  if (!next) {
    // Get champion from final match
    const finalResult = SC[17];
    let champion = "Chưa xác định";

    if (finalResult && finalResult.h !== "" && finalResult.a !== "") {
      const h = +finalResult.h,
        a = +finalResult.a;
      if (!isNaN(h) && !isNaN(a)) {
        const { team1, playoffWinner } = getFinalTeams();
        champion = h > a ? team1 : playoffWinner;
      }
    }

    // Hide "Trận tiếp theo" label
    document.querySelector(".next-label").style.display = "none";
    document.querySelector(".next-vs").style.display = "none";

    document.getElementById("nHome").textContent = `🏆 ${champion}`;
    document.getElementById("nAway").textContent = "";
    document.getElementById("nextMeta").innerHTML =
      '<span class="next-tag final-badge">👑 VÔ ĐỊCH</span>';

    // Update status to completed
    eyebrowText.textContent = "Đã kết thúc";
    liveDot.style.background = "#fbbf24";
    liveDot.style.animation = "none";
    return;
  }

  // Show label when tournament is ongoing
  document.querySelector(".next-label").style.display = "block";

  let homeTeam = next.h;
  let awayTeam = next.a;

  if (next.isPlayoff) {
    const { team2, team3 } = getPlayoffTeams();
    homeTeam = team2;
    awayTeam = team3;
  } else if (next.isFinal) {
    const { team1, playoffWinner } = getFinalTeams();
    homeTeam = team1;
    awayTeam = playoffWinner;
  }

  document.getElementById("nHome").textContent = homeTeam;
  document.getElementById("nAway").textContent = awayTeam;

  let stageBadge = "";
  if (next.isPlayoff) {
    stageBadge = '<span class="next-tag playoff-badge">🏆 PLAYOFF</span>';
  } else if (next.isFinal) {
    stageBadge = '<span class="next-tag final-badge">👑 CHUNG KẾT</span>';
  }

  document.getElementById("nextMeta").innerHTML =
    `${stageBadge}<span class="next-tag">${next.dow}, ${next.date}/2025</span><span class="next-tag">${next.time}</span>`;
}

function switchTab(name, btn) {
  document
    .querySelectorAll(".tab-btn")
    .forEach((b) => b.classList.remove("on"));
  document.querySelectorAll(".pane").forEach((p) => p.classList.remove("on"));
  btn.classList.add("on");
  document.getElementById("pane-" + name).classList.add("on");
}

let toastT;

function toast(msg) {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toastT);
  toastT = setTimeout(() => el.classList.remove("show"), 2800);
}

// Initialize on page load
renderRank();
renderMatches();
updateNext();

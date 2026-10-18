/* Keep the date and 12-hour clock in sync with local time.
   The clock updates every second; the date only changes at midnight. */
const clock = document.getElementById("clock");
const dateEl = document.getElementById("date");
const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

function tick() {
	const d = new Date();
	const hours = d.getHours();
	const h = hours % 12 || 12;
	const m = String(d.getMinutes()).padStart(2, "0");
	const s = String(d.getSeconds()).padStart(2, "0");
	const ap = hours >= 12 ? "PM" : "AM";
	clock.textContent = `${String(h).padStart(2, "0")}:${m}:${s} ${ap}`;
	dateEl.textContent = `${DAYS[d.getDay()]} · ${MONTHS[d.getMonth()]} ${d.getDate()} ${d.getFullYear()}`;
}
tick();
setInterval(tick, 1000);

/* Category filters: show every card ("all") or only cards whose
   data-cat matches the selected filter. Changing the filter resets
   keyboard focus to the first visible card. */
const filterEls = document.querySelectorAll("#filters li");
const cards = document.querySelectorAll(".card");

filterEls.forEach((el) => {
	el.addEventListener("click", () => {
		filterEls.forEach((e) => e.classList.remove("active"));
		el.classList.add("active");
		const f = el.dataset.filter;
		cards.forEach((c) => {
			c.classList.toggle("hidden", f !== "all" && c.dataset.cat !== f);
		});
		focusedIdx = 0;
		updateFocus();
	});
});

/* Sort options. "date" keeps the feed's authored order, which is
   newest first; the other options sort by rating, read count, or read
   time. Sorting only reorders the DOM, so the card data stays intact. */
const sortEls = document.querySelectorAll("#sorts li");
const feed = document.getElementById("feed");

sortEls.forEach((el) => {
	el.addEventListener("click", () => {
		sortEls.forEach((e) => e.classList.remove("active"));
		el.classList.add("active");
		const s = el.dataset.sort;
		const arr = Array.from(cards);
		arr.sort((a, b) => {
			if (s === "date") return arr.indexOf(a) - arr.indexOf(b);
			if (s === "rating")
				return parseFloat(b.dataset.rating) - parseFloat(a.dataset.rating);
			if (s === "reads")
				return parseInt(b.dataset.reads) - parseInt(a.dataset.reads);
			if (s === "time") return parseInt(a.dataset.time) - parseInt(b.dataset.time);
		});
		arr.forEach((c) => feed.appendChild(c));
	});
});

/* Keyboard navigation:
   - j/k or the down/up arrow keys move focus between visible cards.
   - m toggles the read state of the focused card.
   - o or Enter simulates opening the focused card.
   - r clears the read state from every card.
   - / moves the cursor into the command bar. */
let focusedIdx = 0;
const cmd = document.getElementById("cmd");

function visibleCards() {
	return Array.from(cards).filter((c) => !c.classList.contains("hidden"));
}

function updateFocus() {
	const vis = visibleCards();
	cards.forEach((c) => c.classList.remove("focused"));
	if (vis[focusedIdx]) {
		vis[focusedIdx].classList.add("focused");
		vis[focusedIdx].scrollIntoView({ behavior: "smooth", block: "nearest" });
	}
}

window.addEventListener("keydown", (e) => {
	if (document.activeElement === cmd) {
		if (e.key === "Escape") {
			cmd.blur();
			cmd.value = "";
		}
		return;
	}

	const vis = visibleCards();

	if (e.key === "j" || e.key === "ArrowDown") {
		e.preventDefault();
		focusedIdx = Math.min(vis.length - 1, focusedIdx + 1);
		updateFocus();
	}
	if (e.key === "k" || e.key === "ArrowUp") {
		e.preventDefault();
		focusedIdx = Math.max(0, focusedIdx - 1);
		updateFocus();
	}
	if (e.key === "m") {
		if (vis[focusedIdx]) vis[focusedIdx].classList.toggle("read");
	}
	if (e.key === "o" || e.key === "Enter") {
		if (vis[focusedIdx]) {
			vis[focusedIdx].style.transform = "scale(0.98)";
			setTimeout(() => (vis[focusedIdx].style.transform = ""), 150);
		}
	}
	if (e.key === "/") {
		e.preventDefault();
		cmd.focus();
	}
	if (e.key === "r") {
		cards.forEach((c) => c.classList.remove("read"));
	}
});

updateFocus();

/* Clicking a card moves keyboard focus to it, so j/k continues
   from the card the user last selected. */
cards.forEach((c, i) => {
	c.addEventListener("click", () => {
		const vis = visibleCards();
		focusedIdx = vis.indexOf(c);
		updateFocus();
	});
});

/* Command bar. Supported commands:
   - "filter <name>" or "f <name>" applies a category filter, e.g. "f email".
   - "mark all read" marks every card as read.
   - "unread" or "reset" clears all read marks.
   - Anything else is treated as a keyword search across titles and
     descriptions. Press Escape while the bar is focused to clear it. */
cmd.addEventListener("keydown", (e) => {
	if (e.key === "Enter") {
		const v = cmd.value.toLowerCase().trim();
		if (v.startsWith("filter ") || v.startsWith("f ")) {
			const tag = v.split(" ")[1];
			const btn = Array.from(filterEls).find((el) => el.dataset.filter === tag);
			if (btn) btn.click();
		} else if (v === "mark all read") {
			cards.forEach((c) => c.classList.add("read"));
		} else if (v === "unread" || v === "reset") {
			cards.forEach((c) => c.classList.remove("read"));
		} else if (v) {
			// Any other input is a keyword search.
			cards.forEach((c) => {
				const t = (
					c.querySelector("h2").textContent +
					" " +
					c.querySelector("p").textContent
				).toLowerCase();
				c.classList.toggle("hidden", !t.includes(v));
			});
		}
		cmd.value = "";
	}
});

/* ⌘K on macOS or Ctrl+K elsewhere focuses the command bar. */
window.addEventListener("keydown", (e) => {
	if ((e.metaKey || e.ctrlKey) && e.key === "k") {
		e.preventDefault();
		cmd.focus();
	}
});

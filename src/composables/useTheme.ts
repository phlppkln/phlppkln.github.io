import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";

export type Theme = "light" | "dark";

/**
 * Light/dark theme. The visitor's OS setting decides, via
 * `prefers-color-scheme` in styles.css. The topbar toggle is only an
 * override for the current visit: it sets `data-theme` on <html>, nothing
 * is stored, and a change of the OS setting hands control back to it.
 */
export function useTheme() {
	const media = window.matchMedia("(prefers-color-scheme: dark)");
	const theme = ref<Theme>(media.matches ? "dark" : "light");

	function onSystemChange(event: MediaQueryListEvent) {
		delete document.documentElement.dataset.theme;
		theme.value = event.matches ? "dark" : "light";
	}

	function apply() {
		theme.value = theme.value === "dark" ? "light" : "dark";
		document.documentElement.dataset.theme = theme.value;
	}

	/**
	 * The new theme spreads over the page as a circle growing out of the
	 * toggle, via a view transition: the browser snapshots the old page and
	 * the new one is clipped open on top of it. Without the API, or with
	 * reduced motion, the switch is simply instant.
	 */
	function toggle(event?: Event) {
		const origin = event?.currentTarget;
		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		if (!document.startViewTransition || reduced || !(origin instanceof Element)) {
			apply();
			return;
		}

		const rect = origin.getBoundingClientRect();
		const x = rect.left + rect.width / 2;
		const y = rect.top + rect.height / 2;
		const radius = Math.hypot(
			Math.max(x, window.innerWidth - x),
			Math.max(y, window.innerHeight - y),
		);

		const transition = document.startViewTransition(async () => {
			apply();
			await nextTick();
		});

		transition.ready.then(() => {
			document.documentElement.animate(
				{
					clipPath: [
						`circle(0px at ${x}px ${y}px)`,
						`circle(${radius}px at ${x}px ${y}px)`,
					],
				},
				{
					duration: 1200,
					easing: "cubic-bezier(0.22, 0.61, 0.24, 1)",
					pseudoElement: "::view-transition-new(root)",
				},
			);
		});
	}

	onMounted(() => media.addEventListener("change", onSystemChange));
	onBeforeUnmount(() => media.removeEventListener("change", onSystemChange));

	return { theme, toggle };
}

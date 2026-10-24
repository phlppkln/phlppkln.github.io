<script setup lang="ts">
import { ref } from "vue";
import { playground, playgroundIntro } from "../data/playground";

const expanded = ref(false);
</script>

<template>
	<!--
		Same disclosure pattern as ProjectCard (0fr → 1fr grid row, content
		kept in the DOM for print), but a quieter surface: these are
		unfinished side projects, not case studies.
	-->
	<article class="playground" :class="{ 'playground--open': expanded }">
		<h3 class="visually-hidden">Playground</h3>

		<button
			class="playground-head"
			type="button"
			:aria-expanded="expanded"
			aria-controls="playground-items"
			:aria-label="`Playground — ${expanded ? 'show less' : 'show more'}`"
			@click="expanded = !expanded"
		>
			<span class="meta">
				<span>Work in progress</span>
				<span class="meta-sep" aria-hidden="true">·</span>
				<span>{{ playground.length }} {{ playground.length === 1 ? "project" : "projects" }}</span>
				<span class="chevron" aria-hidden="true"></span>
			</span>
			<span class="title">Playground</span>
			<span class="subtitle">{{ playgroundIntro }}</span>
		</button>

		<div
			id="playground-items"
			class="disclosure"
			:class="{ 'is-open': expanded }"
			role="region"
			aria-label="Playground — projects"
		>
			<div class="disclosure-clip">
				<ul class="items">
					<li v-for="item in playground" :key="item.id" class="item">
						<a :href="item.href" target="_blank" rel="noopener" class="item-title">
							{{ item.title }}
						</a>
						<p>{{ item.description }}</p>
						<span class="tags">
							<span v-for="tag in item.tags" :key="tag" class="tag">{{ tag }}</span>
						</span>
					</li>
				</ul>
			</div>
		</div>
	</article>
</template>

<style scoped>
.playground {
	position: relative;
	margin-top: 1.25rem;
	border: 1px dashed var(--line-strong);
	border-radius: var(--radius-lg);
	transition: border-color var(--base) var(--ease);
}

.playground:hover,
.playground--open {
	border-color: var(--muted);
}

@supports selector(:has(*)) {
	.playground:has(.playground-head:focus-visible) {
		outline: 2px solid var(--accent);
		outline-offset: 3px;
	}

	.playground-head:focus-visible {
		outline: none;
	}
}

.playground-head {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 0.4rem;
	width: 100%;
	padding: 1.25rem 1.5rem;
	background: none;
	border: 0;
	font: inherit;
	color: inherit;
	text-align: left;
	cursor: pointer;
}

.meta {
	display: flex;
	align-items: center;
	gap: 0.5rem;
	width: 100%;
	font-family: var(--font-heading);
	font-size: 0.7rem;
	font-weight: 500;
	text-transform: uppercase;
	letter-spacing: 0.11em;
	color: var(--faint);
}

.meta-sep {
	color: var(--line-strong);
}

.chevron {
	flex: none;
	width: 0.5rem;
	height: 0.5rem;
	margin-left: auto;
	margin-top: -0.2rem;
	border-right: 1px solid var(--muted);
	border-bottom: 1px solid var(--muted);
	transform: rotate(45deg);
	transition:
		transform var(--base) var(--ease),
		border-color var(--fast) var(--ease);
}

.playground--open .chevron {
	transform: rotate(-135deg) translate(-0.15rem, -0.15rem);
}

.playground:hover .chevron {
	border-color: var(--accent);
}

.title {
	font-family: var(--font-heading);
	font-size: 1.1rem;
	font-weight: 500;
	line-height: 1.3;
	letter-spacing: -0.012em;
	color: var(--text);
	transition: color var(--fast) var(--ease);
}

.playground:hover .title {
	color: var(--accent);
}

.subtitle {
	font-size: 0.925rem;
	line-height: 1.5;
	color: var(--muted);
}

/* ── Disclosure ────────────────────────────────────────────────── */

.disclosure {
	display: grid;
	grid-template-rows: 0fr;
	transition: grid-template-rows var(--base) var(--ease);
}

.disclosure.is-open {
	grid-template-rows: 1fr;
}

.disclosure-clip {
	overflow: hidden;
}

.disclosure:not(.is-open) .disclosure-clip {
	visibility: hidden;
	transition: visibility 0s linear var(--base);
}

.disclosure.is-open .disclosure-clip {
	visibility: visible;
	transition: visibility 0s;
}

.items {
	list-style: none;
	padding: 0 1.5rem 1.5rem;
}

.item {
	padding-top: 1.1rem;
	border-top: 1px solid var(--line);
}

.item + .item {
	margin-top: 1.1rem;
}

.item-title {
	font-family: var(--font-heading);
	font-weight: 500;
}

.item p {
	max-width: 70ch;
	margin: 0.35rem 0 0.6rem;
	font-size: 0.925rem;
	line-height: 1.7;
}

.tags {
	display: flex;
	flex-wrap: wrap;
	gap: 0.3rem;
}

.tag {
	padding: 0.15rem 0.5rem;
	border-radius: var(--radius);
	background: var(--surface-sunken);
	font-size: 0.72rem;
	letter-spacing: 0.01em;
	line-height: 1.6;
	color: var(--muted);
}

@media (max-width: 40rem) {
	.playground-head {
		padding: 1.25rem;
	}

	.items {
		padding: 0 1.25rem 1.25rem;
	}
}

/* ── Print ─────────────────────────────────────────────────────── */

@media print {
	.playground {
		break-inside: avoid;
	}

	.disclosure {
		grid-template-rows: 1fr !important;
	}

	.disclosure-clip {
		visibility: visible !important;
		overflow: visible !important;
	}

	.chevron {
		display: none;
	}
}
</style>

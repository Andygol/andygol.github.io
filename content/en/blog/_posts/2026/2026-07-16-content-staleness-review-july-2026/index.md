---
layout: blog
title: 'Content Staleness Review: A Cross-Language Audit of the Kubernetes Docs'
date: 2026-07-15
tags:
  - localization
  - translation
  - documentation
  - Kubernetes
  - k8s
slug: content-staleness-review-july-2026
---

[Kubernetes](https://kubernetes.io/) (also known as K8s) is an open-source platform for deploying, scaling, and managing containerized applications. Originally developed by Google and now maintained by the [Cloud Native Computing Foundation](https://www.cncf.io/), it has become the de facto standard for container orchestration — used by organizations of all sizes, from startups to the largest enterprises. Like any rapidly evolving technology, Kubernetes demands accurate and up-to-date documentation for its users worldwide.

The Kubernetes project maintains an official documentation website at [kubernetes.io](https://kubernetes.io/). It covers everything from basic concepts ("What is a Pod?") to advanced operational tasks ("Encrypting confidential data at rest"). Because Kubernetes has a global user base, the documentation is translated into 16 languages — but maintaining those translations is a significant challenge.

As the English source material evolves with each release, translated pages must be updated to match. When a translation falls behind, readers may encounter information that no longer reflects the current state of the project. This is a challenge that, to some extent, touches most languages.

Below is a systematic cross-language audit of the `content/` directory — the folder in the repository that contains every documentation page. I inspected every `.md` file across all languages, measuring two dimensions:

- **Coverage**: what fraction of English pages have been translated
- **Staleness**: for translated pages, whether the localized version was updated after changes were made to the English source

All data reflects `git log` timestamps as of July 15, 2026.

---

## Overall numbers {#overall-numbers}

| Dimension | Value |
|-----------|-------|
| Languages | 16 non-English |
| English content (non-blog) | 1,687 `.md` files |
| English blog posts | 750 |
| Total non-English files | ~7,400 |

---

## Coverage: What fraction of English is translated? {#coverage}

The gap between the most and least translated languages is enormous:

| Language | Coverage (docs/) | Files (docs/) | Notes |
|----------|:----------------:|:-------------:|-------|
| Ukrainian [[*]](#ukr-note)  | **99%** | 1,674 | Nearly complete parity with English |
| Chinese | **89%** | 1,596 | Very well maintained |
| Japanese | **31%** | 552 | |
| Korean | **31%** | 541 | |
| French | **20%** | 358 | |
| Portuguese (BR) | **17%** | 350 | |
| Indonesian | **14%** | 281 | |
| Vietnamese | **12%** | 208 | |
| Spanish | **11%** | 231 | |
| Persian (Farsi) | **10%** | 155 | |
| German | **7%** | 133 | |
| Russian | **7%** | 141 | |
| Bengali | **6%** | 93 | |
| Hindi | **6%** | 107 | |
| Polish | **4%** | 81 | |
| Italian | **3%** | 61 | Lowest coverage |

<a name="ukr-note"></a>

> **[*] Ukrainian data note**: The Ukrainian numbers above include the content proposed in [PR #48551](https://github.com/kubernetes/website/pull/48551) — a large-scale translation that is currently open and not yet merged into `main`. Without that PR, Ukrainian's current coverage in the `main` branch is **4%** (69 docs files) with **29% staleness** (22 of 75 shared files stale). See the language summary below for the full comparison.

Key takeaways:

- **Italian**, **Polish**, **Hindi**, and **Bengali** have translated fewer than 100 documentation pages — less than 6% of English. Core concept pages (`architecture`, `security`, `storage`, `workloads`) are largely missing.
- **Ukrainian** (with the content of [PR #48551](https://github.com/kubernetes/website/pull/48551)) is the standout: as the sole author and maintainer [[**]](#cta), I have translated essentially everything. Without that PR, Ukrainian sits at just **4% coverage** — the current state in `main`.
- **Chinese** is close behind at 89%, though still missing ~180 pages.
- The remaining 12 languages cluster between 3% and 31%. Most of these projects need more contributors to grow.

<a name="cta"></a>

> [**] I hope other willing contributors will join this work and finally bring a complete translation to the Kubernetes documentation.

### Coverage by content section {#coverage-by-section}

The "reference" section (`docs/reference/`) is the largest by far — 1,163 English files, mostly auto-generated API reference. Coverage here is generally low outside Ukrainian and Chinese, largely because reference pages are mechanically generated and impractical to translate manually.

| Section | EN pages | Best translated | Worst translated |
|---------|:--------:|:---------------|:-----------------|
| Concepts | 176 | <ul><li>**uk** 100%</li><li>**ja** 94%</li><li>**zh-cn** 94%</li></ul> | <ul><li>**hi** 2% (5 pages)</li></ul> |
| Tasks | 222 | <ul><li>**uk** 100%</li><li>**zh-cn** 99%</li></ul> | <ul><li>**pl** 0.5% (1 page)</li></ul> |
| Tutorials | 43 | <ul><li>**uk** 100%</li><li>**zh-cn** 93%</li></ul> | <ul><li>**it** 4% (2 pages)</li></ul> |
| Reference | 1,163 | <ul><li>**uk** 100%</li><li>**zh-cn** 94%</li></ul> | <ul><li>**pl** 1% (15 pages)</li></ul> |
| Blog | 750 | <ul><li>**zh-cn** 46%</li><li>**uk** 10%</li></ul> | 10 languages have 0–3 posts |

### The blog problem {#blog-problem}

Of the 750 English blog posts, only **Chinese** (349 posts, 46%) and **Ukrainian** (80 posts, 10%) have meaningful translation coverage. Japanese has 45, Korean has 10. The other 10 languages have 0–3 posts each, and four languages — **Persian**, **Hindi**, **Polish**, and **Russian** — have **zero** blog posts.

Blog posts document releases, deprecations, and community updates. When these go untranslated, non-English readers miss important announcements about the project.

---

## Staleness: How fresh are the existing translations? {#staleness}

Coverage tells us *how much* is translated. Staleness tells us *how current* those translations are. The last commit date of each translated file was compared against its English counterpart.

| Language | Stale files | Staleness % | Worst offenders |
|----------|:-----------:|:-----------:|:----------------|
| Ukrainian [[*]](#ukr-note)  | 0 / 1,674 | **0%** | None — perfectly synced |
| Persian | 5 / 169 | **2%** | Small corpus, well maintained |
| Polish | 3 / 84 | **3%** | |
| Chinese | 49 / 1,506 | **3%** | |
| Vietnamese | 46 / 213 | **21%** | |
| Hindi | 29 / 109 | **26%** | |
| Bengali | 31 / 110 | **28%** | |
| Japanese | 196 / 539 | **36%** | |
| Portuguese (BR) | 114 / 293 | **38%** | |
| French | 135 / 343 | **39%** | |
| Italian | 26 / 60 | **43%** | |
| German | 59 / 122 | **48%** | |
| Russian | 68 / 132 | **51%** | |
| Korean | 310 / 535 | **57%** | |
| Spanish | 119 / 198 | **60%** | |
| Indonesian | 155 / 252 | **61%** | Worst staleness |

### Critically stale — files untouched since 2019–2020 {#critically-stale}

The most concerning pattern: several languages have core documents that have not been updated since **2019 or early 2020** — meaning they describe Kubernetes as it was 6–7 years ago.

**Languages stuck on ancient versions**

| Page | Languages | Years of last update |
|------|-----------|----------------------|
| `docs/concepts/architecture/_index.md` | **id**<br/>**es**<br/>**it**<br/>**vi**<br/>**ru** | 2019<br/>2021<br/>2021<br/>2021<br/>2022 |
| `docs/concepts/overview/_index.md` | **id**<br/>**vi**<br/>**es**<br/>**it** | 2019<br/>2019<br/>2021<br/>2021 |
| `docs/concepts/workloads/_index.md` | **es**<br/>**id**<br/>**fr** | 2019<br/>2019<br/>2021 |
| `docs/concepts/services-networking/_index.md` | **id**<br/>**es**<br/>**fr** | 2019<br/>2021<br/>2021 |
| `docs/concepts/security/_index.md` | **fr**<br/>**es** | 2019<br/>2021 |
| `community/code-of-conduct.md` | **es**<br/>**fr**<br/>**it** | 2019<br/>2019<br/>2020 |

These are the pages Kubernetes users will most likely read first. Presenting 6-year-old content means readers may be relying on information that no longer reflects the current state of Kubernetes.

### Important pages stale in many languages {#important-pages-stale}

The `docs/home/_index.md` page (the landing page) is **stale in 13 out of 16 languages**. The `docs/concepts/overview/_index.md` is stale in **11 languages**.

---

## Summary {#summary}

### 🟢 Good health {#good-health}

- **Ukrainian (uk)**: with [PR #48551](https://github.com/kubernetes/website/pull/48551) merged, Ukrainian reaches **99% coverage** with **0% staleness** — every English page has a Ukrainian counterpart that I keep current as the sole author and maintainer. Without that PR, however, the current `main` branch sits at just **4% coverage** (69 docs files) and **29% staleness**: the existing pages cover basic concepts, glossary terms, and a handful of tutorials, while 1,612 English pages have no Ukrainian counterpart at all.
- **Chinese (zh-cn)**: 89% coverage, 3% stale. Excellent — actively maintained, blog heavily translated.
- **Persian (fa)**: 10% coverage, but 98% of existing pages are fresh. The team maintains quality even with a small corpus.

### 🟡 Needs attention {#needs-attention}

- **Japanese (ja)**: Good coverage (31%), but 36% of files are stale. Concepts and tasks are largely present but aging.
- **French (fr)**: 20% coverage, 39% stale. Setup section is complete, but concepts are outdated.
- **Portuguese (pt-br)**: 17% coverage, 38% stale. Steady work but aging content.
- **Vietnamese (vi)**: 12% coverage, 21% stale. Small team, decent freshness ratio.
- **German (de)**: 7% coverage, 48% stale. Half of the translated pages need updating.
- **Bengali (bn)**: 6% coverage, 28% stale. Releases section is fully translated — a good starting point.
- **Hindi (hi)**: 6% coverage, 26% stale. Small, but reasonably maintained.
- **Italian (it)**: 3% coverage, 43% stale. Very few pages, and half need updates.

### 🔴 Urgent attention {#urgent-attention}

- **Indonesian (id)**: 61% stale. Core architecture pages haven't been touched since 2019. This is the most stale language overall.
- **Spanish (es)**: 60% stale. Concepts section frozen since 2021. Blog absent.
- **Korean (ko)**: 57% stale. Despite having 541 docs pages (31% coverage), more than half are behind English.
- **Russian (ru)**: 51% stale. Small coverage (7%) and half of what exists is outdated.

---

## Recommendations {#recommendations}

1. **Establish deprecation rules for documentation**: other Kubernetes components follow formal deprecation policies — documentation should too. Kubernetes [releases](https://kubernetes.io/releases/#release-history) new minor versions approximately every 3 months, with patch releases in between, and maintains only the three most recent minor releases (~1 year of support per release). Staleness thresholds should align with this cycle — minor releases define the general freshness window, while patch releases (especially security advisories) may require faster documentation updates for critical pages. Below is a proposed tiered system:

   | Level | Lag behind English source | Position in release cycle | Status | Action |
   |-------|--------------------------|---------------------------|--------|--------|
   | **Fresh** | < 3 months | Within current release | 🟢 Current | — |
   | **Stale** | 3–12 months | 1–4 releases behind (within documented support window) | 🟡 Degrading | GitHub Action files an issue tagged `translation/stale` |
   | **Dormant** | 1–2 years | 4–8 releases behind (past support window) | 🟠 Inactive | Page shows a banner: "This translation was last updated on {date}. The English source has been modified since." |
   | **Archived** | > 2 years | > 8 releases behind | 🔴 Archived | Page removed from main navigation, preserved as a historical artifact accessible via the [versioned documentation](https://kubernetes.io/docs/home/supported-doc-versions/) for its corresponding Kubernetes release.

   The boundary between **Stale** and **Dormant** (~1 year) mirrors the [Kubernetes patch support window](https://kubernetes.io/releases/#release-history) — once a minor version reaches end of life, its documentation should be considered dormant unless actively updated. Patch releases don't reset the staleness clock by themselves; the timer is driven by minor releases. However, pages that document security-sensitive features (authentication, authorization, network policies) should be reviewed after every patch release that touches the related components.

2. **Archive or deprecate dormant languages**: languages with <5% coverage and no recent activity (Italian, Polish) should consider either a revival push or a documented "maintenance mode" status.

3. **Prioritize core concept pages**: `architecture`, `overview`, `workloads`, `security`, and `services-networking` are the most-read pages. Ensure they are translated and current in every language that claims coverage.

4. **Fix the blog gap**: blog posts are the primary channel for deprecation notices, release announcements, and security advisories. Languages with blog coverage below 5% risk their readers missing critical information.

5. **Remove tooling barriers for localization teams**: many language teams are still working with git-based workflows that make drift detection and sync tedious. As discussed in the PS below, purpose-built translation platforms handle freshness checks natively — they notify translators exactly which strings changed, eliminating the need for manual `git log` comparisons or custom scripts. Adopting such tools would free teams to focus on translation quality rather than manual diffing.

---

## Methodology {#methodology}

- **Scope**: all `.md` files under `content/{lang}/` (excluding auto-generated reference submodules where applicable).
- **Coverage**: for each language, files existing in `content/{lang}/` are compared against `content/en/`. Blog posts are counted separately.
- **Staleness**: for each file present in both English and the translation, the author date of the most recent commit touching that file is compared. A file is "stale" if the English commit is newer than the translation commit.
- **Date**: all data collected on 2026-07-15.
- **Limitations**: `git log` timestamps reflect the *last commit that touched the file*, not when the *content* was last reviewed. A file could be substantively stale even if recently touched by a CI or formatting commit.

---

> ### PS. Translation tooling discussion
>
> The challenge of keeping translations current is not new. Since February 2024, the community has been discussing better tooling for Kubernetes localization in [GitHub Discussion #45209](https://github.com/kubernetes/website/discussions/45209). Key points from that discussion:
>
> - **Centralized translation platforms** (Crowdin, Transifex, Weblate) have been proposed and evaluated. These platforms offer automatic drift detection — when the English source changes, translators are notified of exactly which strings need updating, eliminating the need to manually diff files.
> - **Sentence/paragraph-level review** instead of whole-PR review: multiple translators can work on the same page simultaneously, and reviewers can approve individual segments rather than holding up an entire PR.
> - **Translation Memory (TM)** and **Machine Translation (MT)** suggestions speed up repetitive translations and ensure consistency across the documentation.
> - **Streamlined contributor onboarding**: CLA signing could be done once on the platform, removing friction at the PR stage.
> - A **testing initiative** was formed ([issue #45756](https://github.com/kubernetes/website/issues/45756)) with volunteers from **pt-br**, **ko**, **uk**, and **ar** teams, but stalled due to SIG Docs capacity.
> - More recently, an **LFX mentorship project** (2026) prototyped a Markdown-aware triage script for drift detection between English and localized pages — see the [project blog post](https://www.kubernetes.dev/blog/2026/06/26/human-centered-automation-kubernetes-localization-ai-era/).
>
> The consensus from the discussion is that while git works well for code, purpose-built tooling could significantly reduce the maintenance burden on localization teams. If you have thoughts on this, join the conversation in [#45209](https://github.com/kubernetes/website/discussions/45209).

---

*Localization teams are encouraged to use this data as a starting point for targeted updates. If you're interested in helping with any of these languages, see the [Kubernetes localization guide](https://kubernetes.io/docs/contribute/localization/).*

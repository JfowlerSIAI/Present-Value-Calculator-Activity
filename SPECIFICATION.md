# Present Value Visual Calculator — browser specification (v1)

- **Decided:** 2026-10-01, by Eric McKee. David Friedman's review is invited; changes requested after review become a specification revision.
- **Reference:** Proposal 24, recorded in DESIGN.md from the Living Paper program descriptions (reviewed 2026-09-30). The live page was unavailable during planning. Fresh code; no legacy code imported.

## Learning objective and source mechanics

Make discounting and addition of dated cash flows visible. Preserve the source's selectable payments, adjustable rate, bars whose discounted height changes with date, and present-date shadows stacked to show their sum. Future-value and inflation versions are distinct source extensions and are deferred.

## Decisions and additions

- Explorer with four optional self-checked prompts, no grading. Signed payments, keyboard/table editing, and prompts are additions to the recorded mechanics.
- Whole years 0–30, effective annual rate 0–25% in 0.1 percentage-point steps; 1–12 payments of −$10,000 to $10,000 in cents. Zero and coincident payments are legal. Dates are relative to today, year 0.
- PV = amount / (1 + rate/100)^year. Keep full precision through summation; round only displayed currency to two decimals. Report discounted receipts, outflows (positive magnitude), and net PV.
- Initial example: −$2,000 at year 0; $1,000 at years 1, 2, 3; rate 10%. Net PV is $486.85. Reset restores this example and clears prompt progress. Add appends $1,000 at year 5 and selects it; Remove deletes the selected payment (disabled at one) and selects the adjacent survivor.
- Select payments using native buttons in the table. Edit amounts/dates in the table; move selected dates with Earlier/Later, or horizontal dragging snapped to whole years. Buttons stop at years 0 and 30. Amounts change only through numeric controls. Rate has linked numeric/range inputs.
- Timeline spans years 0–30. Outline bars show face amounts and hatched bars show discounted heights, on one dollar scale. Offsets distinguish coincident dates without changing their date. Separate positive/negative stacks at today, on that same scale, show each PV contribution. Selected contribution has a connecting guide and stronger border; zero flows have a visible zero marker. Auto-scale to include all face amounts and both stacks.
- Equivalent table: payment, amount, year, discount factor, PV. Selected-payment explanation includes the worked formula. Selection never depends on distinguishing colors.
- Reject blank, nonfinite, out-of-range, fractional-year, or off-step entries with associated errors and aria-invalid. Preserve the last valid model until corrected. Other valid controls may still operate, without clearing unrelated invalid drafts.
- Prompt buttons load fresh scenarios and clear prior completion: (1) $1,000 at year 5, 10%: move it earlier without changing amount/rate; (2) same baseline: raise rate without changing amount/date; (3) $1,000 at years 1 and 3, 10%: set rate to zero without changing flows; (4) +$1,000 at year 2 and −$1,000 at year 5, 10%: move the outflow to year 2 without changing amounts/rate. Check gives current not-yet/done feedback and the mathematical explanation. Progress is evaluated on Check, and cleared by edits after a successful check.

## Interfaces and accessibility

Local classic scripts: js/model.js exposes PresentValueModel in a browser and CommonJS in Node; js/graph.js renders SVG; js/app.js controls the page. The model validates inputs, calculates factors/PVs/totals, provides defaults/prompt scenarios, and checks prompts without DOM access. No persistence, URL sharing, service, analytics, multiplayer, or build framework.

Native controls provide the complete keyboard and single-pointer route. SVG is a labelled image with a generated text summary; table and formula carry all values. Visible unobscured focus, stable focus during edits, appropriate focus after removal/scenario loading, polite announcements, 44px primary controls, responsive reflow, and reduced motion are required. Preserve WT/Engler branding and credits. Functional checks do not establish WCAG conformance; formal WCAG 2.2/2.1 AA audit including Parsing and both reports follow David's feedback before teaching release.

## Acceptance and freeze

Verify $1,000 at year 1/10% = $909.09, years 1–3 = $2,486.85, and initial net = $486.85. Test zero rate/year/amount, negative payments, cancellation, coincident dates, all limits and invalid inputs, unrounded summation, and monotonic discounting. Browser-check editing, selection, drag and alternatives, all prompts, keyboard focus, file opening, and 1280/640/375/320px layouts; smoke-check all seven collection pages. Record evidence and limitations in VERIFICATION.md (in the authoring collection).

Commit and push privately, then freeze at verified v1 until the user returns with David's review instructions. No publishing, deployment, outreach, monitoring, or further feature work. The existing two frozen games remain unchanged.

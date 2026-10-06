# Present Value Visual Calculator — source-based design brief

Proposal 24. Source reviewed 2026-09-30: [Program Descriptions](http://daviddfriedman.com/Living_Paper/Program_Descriptions/program_descriptions.htm) and [Living Paper index](http://daviddfriedman.com/Living_Paper/living_paper.htm).

**This records the source brief.** Eric selected this activity and resolved the browser choices in [SPECIFICATION.md](SPECIFICATION.md), implemented as interactive v1 on 2026-10-01. It is frozen pending David's review instructions.

## Learning objective

Make discounting and the addition of dated cash flows visible.

## Confirmed mechanics in the source

- Students choose payment amounts and positions in time. A payment is represented by a bar whose discounted height changes as its date moves.
- A shadow on the present-date axis shows the numerical present value. Stacking payment shadows represents the sum of their present values.
- Students can select individual payments and adjust the interest rate to see the calculation change.
- The source separately describes a future-value version, accumulating earlier payments to a selected future date.
- A third described version introduces real interest, inflation, and real versus nominal amounts.

## Optional variants and adaptation notes

- Future-value and inflation modes are distinct extensions; both are deferred from v1.
- Preserve the visual demonstration while providing editable amounts/dates and an equivalent cash-flow table, rather than requiring dragging.

## Questions for David and the browser specification

1. What time unit and compounding convention should the first version use?
2. Are negative payments and negative rates in scope, and what limits should apply?
3. Should the first activity support present value alone or future value as well?
4. What numeric example and explanation best fit the intended course?

## Source and accessibility constraints

No dedicated Present Value archive is linked on the Living Paper index.

Write fresh browser code by default; follow source-use notes (in the authoring collection) before any reuse. Keep keyboard and single-pointer alternatives for drawing/dragging, labeled numeric data and text/table equivalents for visual output, and verified focus/reflow behavior. These adaptation requirements do not imply that the original desktop UI meets current accessibility standards.

## Next task

Wait for David's review instructions; after unfreezing, fold his feedback into the specification and implementation, then perform the release accessibility audit.

SPECIFICATION.md resolves the questions above: whole years, annual compounding, signed payments and nonnegative rates, present value alone, and an investment example. These are Eric's decisions; David's review is invited.

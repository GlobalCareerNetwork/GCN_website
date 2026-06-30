# GCN Website — Migration & Build Protocol

## Identity & Branch Rules
- GitHub account must be Kesshhavvvv. Confirm this before any session begins — if wrong, stop immediately.
- Active branch: feature-nextjs-migration (branched off hero-globe-logo-updates). Never commit to main.
- Brand primary color: #9e221a — resolve any conflicting red token values to this single value.

## How to start any new feature/stage:
1. Read all files you plan to touch before writing anything.
2. State exactly what you're changing and why.
3. Identify server/client boundaries upfront.
4. Identify any new database tables needed — write migration SQL first, stop for approval before building anything that depends on it. Note: this project currently has no database. Flag clearly if you believe one is needed rather than adding one unasked.

## Self-Check Protocol (run after every stage, before every commit):
1. npx tsc --noEmit — zero type errors
2. npm run build — zero errors
3. npm run lint — zero warnings
4. curl all routes — confirm 200/307 on each
5. curl response time — under 2s per route
6. Server/client boundary audit — no async client components
7. New database tables — confirm migration ran
8. Confirm GitHub auth is Kesshhavvvv

## Self-Healing Rule:
If any of the 8 checks fail, fix it and restart from step 1. Never commit until all 8 pass. Never ask for review until all 8 pass — except at explicit STOP points defined in a task prompt.

## Stage Structure Template:
Every stage follows this pattern:
- Read all relevant files first
- State the plan before writing code
- Write code
- Run all 8 self-check steps
- Commit with descriptive message
- Push to feature-nextjs-migration
- Report what changed + all 8 check results
- Continue automatically to next stage UNLESS the task prompt explicitly says STOP

## Commit Message Format:
feat: [what was added]
fix: [what was fixed]
perf: [performance improvement]
security: [security change]
chore: [maintenance]

## Reporting Requirements (every stage):
- Every file changed and why
- All 8 self-check results with actual command output, not paraphrased summaries
- Response time numbers from curl
- Any product/design decision made on my behalf, especially ambiguous calls — document clearly rather than silently guessing
- Confirmation of what stage starts next

## Hard Stop Conditions:
Stop immediately and wait for explicit user input if you encounter:
- A genuine blocker not covered above — missing credentials, a destructive operation, anything requiring a real external account, payment, or institutional access
- Any task prompt that explicitly says STOP at a given stage
- 3 consecutive failed self-checks on the same stage

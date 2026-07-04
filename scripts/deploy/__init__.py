"""P1a theme deploy-gate checks (migration-consistency + themed-render smoke).

Standalone, dependency-light gate modules invoked by ``p1a_theme_gate.sh`` and
the ``theme-deploy-gate`` CI workflow. They live OUTSIDE ``backend/app`` on
purpose: they are deploy tooling, not shipped application code, so the lean
``quality / quality`` gate does not measure them under its ``backend/app``
coverage scope. Their own 100% line+branch coverage is enforced by the gate's
dedicated coverage run (``scripts/deploy/.coveragerc``).
"""

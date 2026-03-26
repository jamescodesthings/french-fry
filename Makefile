SHELL := bash
.ONESHELL:
.SILENT:
.SHELLFLAGS := -euo pipefail -c

define docker-compose-run
	docker compose build
	docker compose run --service-ports --rm $(1) && exit_status=$$? || exit_status=$$?
	[ "$exit_status" -ne 0 ] && docker compose ps && docker compose logs
	docker compose down
	(exit $exit_status)
endef

make serve:
	$(call docker-compose-run,serve)
.PHONY: serve
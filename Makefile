# -------- Build & Deploy --------
build and start:
	docker-compose up -d --build

restart:
	docker-compose down && docker-compose up --build -d

stop:
	docker-compose down

logs:
	docker-compose logs -f api

# -------- Database --------
migrate:
	docker-compose exec api npm run migration:run:prod

seed:
	docker-compose exec api npm run seed:prod

# -------- Tests  --------
test:
	docker-compose exec api npm run test

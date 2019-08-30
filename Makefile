SHELL:=/bin/bash

wipe-all: down remove_stopped_containers wipe-volumes wipe-images wipe-containers

wipe-volumes:
	@if [[ -n "$$(docker volume ls -qf dangling=true)" ]]; then\
		docker volume rm -f $$(docker volume ls -qf dangling=true);\
  fi
	@docker volume ls -qf dangling=true | xargs -r docker volume rm

wipe-images:
	@if [[ -n "$$(docker images --filter "dangling=true" -q --no-trunc)" ]]; then\
		docker rmi -f $$(docker images --filter "dangling=true" -q --no-trunc);\
	fi
	@if [[ -n "$$(docker images | grep "none" | awk '/ / { print $3 }')" ]]; then\
		docker rmi -f $$(docker images | grep "none" | awk '/ / { print $3 }');\
	fi

wipe-containers:
	@if [[ -n "$$(docker ps -qa --no-trunc --filter "status=exited")" ]]; then\
		docker rm -f $$(docker ps -qa --no-trunc --filter "status=exited");\
	fi

down:
	@docker-compose down
	@docker-compose kill

remove_stopped_containers:
	@docker-compose rm -v

install-docker:
	@echo "Installing Docker"

	@sudo apt-get update

	@sudo apt-get install \
		apt-transport-https \
		ca-certificates \
		curl \
		software-properties-common -y

	@curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

	@sudo add-apt-repository \
		"deb [arch=amd64] https://download.docker.com/linux/ubuntu \
		$$(lsb_release -cs) \
		stable"

	@sudo apt-get update

	@sudo apt-get --yes --no-install-recommends install docker-ce

	@sudo usermod --append --groups docker "$$USER"

	@sudo systemctl enable docker

	@echo "Waiting for Docker to start..."

	@sleep 3

	@sudo curl -L https://github.com/docker/compose/releases/download/1.22.0/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose

	@sudo chmod +x /usr/local/bin/docker-compose
	@sleep 5
	@echo "Docker Installed successfully"

install-docker-if-not-already-installed:
	@if [ -z "$$(which docker)" ]; then\
		make install-docker;\
	fi

build-all-docker-images:
	@docker-compose build --force-rm

start-management-services:
	@docker-compose up -d

stop-management-services:
	@docker-compose stop

dirty-up: start-dependencies start-management-services

set-up: install-docker-if-not-already-installed build-all-docker-images

reset: wipe-all set-up down set-up-db

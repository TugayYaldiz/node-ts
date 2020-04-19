#!/usr/bin/env bash

PROJECT_NAME="node_ts_boilerplate"

BLUE="\\033[1;34m"
GREEN="\\033[1;32m"
NORMAL="\\033[0;39m"
ENVIRONMENTS=( DEV PROD STAGING )

print_help() {
    echo -e "$BLUE Available environments $NORMAL"
    for e in "${ENVIRONMENTS[@]}"
    do
        [[ $ENV == $e ]] && echo -e "$GREEN  - $e (current) $NORMAL" || echo "  - $e";
    done
    echo ""
    echo -e "$BLUE Available commands $NORMAL"
    echo -e "  > build [:services]      Build or rebuild services"
    echo -e "  > docker [:command]      Run a docker command"
    echo -e "  > logs [:service]        View output from containers"
    echo -e "  > start [:services]      Create and start containers"
    echo -e "  > status                 List containers"
    echo -e "  > stop [:services]       Stop services"
    echo -e "  > restore-test-db        Re-creates testing database for tests"
}

docker_command() {
    command="docker-compose -p ${PROJECT_NAME} -f docker-compose.yml "

    case "$ENV" in
        "PROD")
            file_prefix="prod"
            ;;
        "STAGING")
            file_prefix="staging"
            ;;
        *)
            file_prefix="dev"
            ;;
    esac

    command+="-f docker-compose.$file_prefix.yml $@"

    echo -e "$BLUE \r     Command:$NORMAL $command"
    echo -e ""
    eval ${command}
}

build() {
    docker_command build
}

docker() {
    docker_command $@
}

logs() {
    docker_command logs -f --tail 50 $1
}

status() {
    docker_command ps
}

restore-test-db() {
    remove='mongo test --eval "db.dropDatabase()"'
    restore="mongorestore -d test ./code/mocks/test"
    docker_command exec -T mongo_db ${remove}
    docker_command exec -T mongo_db ${restore}
}

start() {
    if [ -z ${1} ]
    then
        services="mongo_db"
    else
        services="${1}"
    fi
    docker_command up -d ${services}
}

stop() {
    if [ -z ${1} ]
    then
        services=""
    else
        services="${1}"
    fi
    docker_command stop ${services}
}

if [ -z "$1" ]
then
    print_help
else
    case "$ENV" in
        "PROD")
            env_str="production"
            ;;
        "STAGING")
            env_str="staging"
            ;;
        *)
            env_str="development"
            ;;
    esac
    echo -e "$BLUE \r Environment:$NORMAL $env_str"
    "$@"
fi

if [ ! -z "$1" ] && [ ! -z "$2" ] && [ "$1" = "upgrade-nocodb-deploy" ]; then
  heroku container:login
  docker pull nocodb/nocodb:latest
  docker tag nocodb/nocodb:latest registry.heroku.com/"$2"/web
  docker push registry.heroku.com/"$2"/web
  heroku container:release -a "$2" web
elif [ ! -z "$1" ] && [ "$1" = "deploy-integration" ]; then
  git push heroku main
else
  echo "Missing/invalid parameter to execute scripts.sh"
fi
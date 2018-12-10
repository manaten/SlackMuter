# SlackMuter
Auto mark as read for all mute channels.

# start

```sh
yarn build
SLACK_TOKEN="xoxp-xxxx" yarn start
```

# deploy to dokku

```sh
# initialize
git remote add dokku <your-dokku-hostname>:<your-app-name>
git push dokku master
dokku config:set <your-app-name> SLACK_TOKEN="xoxp-xxxx"

# deploy
yarn deploy
```

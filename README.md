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
git remote add dokku your-dokku-url
git push dokku master

yarn deploy
```

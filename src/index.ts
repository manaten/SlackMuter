import { RTMClient , WebClient } from '@slack/client';
import axios from 'axios';

const { SLACK_TOKEN = '' } = process.env;

const rtmClint = new RTMClient(SLACK_TOKEN);
rtmClint.start();

const webClient = new WebClient(SLACK_TOKEN);
let mutedChannels: string[] = [];

const main = async () => {
  const res = await axios.get(`https://slack.com/api/users.prefs.get?token=${SLACK_TOKEN}`);
  mutedChannels = res.data.prefs.muted_channels.split(',');
  console.log(`muletChannels = [ ${mutedChannels.join(', ')} ]`); // eslint-disable-line no-console

  rtmClint.on('pref_change', (ev) => {
    if (ev.name === 'muted_channels') {
      mutedChannels = ev.value.split(',');
      console.log(`muletChannels = [ ${mutedChannels.join(', ')} ]`); // eslint-disable-line no-console
    }
  });

  rtmClint.on('message', async (ev) => {
    try {
      if (mutedChannels.filter(c => c === ev.channel).length === 0) {
        return;
      }

      if (/^C/.test(ev.channel)) {
        await webClient.channels.mark({ channel: ev.channel, ts: ev.ts });
      }
      if (/^G/.test(ev.channel)) {
        await webClient.groups.mark({ channel: ev.channel, ts: ev.ts });
      }
      if (/^U/.test(ev.channel)) {
        await webClient.im.mark({ channel: ev.channel, ts: ev.ts });
      }
      console.log(`Mark message as read. channel:${ev.channel} ts:${ev.ts}`); // eslint-disable-line no-console
    } catch(e) {
      console.error('[ERROR] ' + e.message); // eslint-disable-line no-console
    }
  });
};
main();

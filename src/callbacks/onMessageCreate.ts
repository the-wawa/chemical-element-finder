import { Colors, EmbedBuilder } from "discord.js";
import type { Client, OmitPartialGroupDMChannel, Message } from "discord.js";

import Finder from "../utils/finder";
import { checkMessage, setMessageTimeout } from "../utils/checkMessage";

let titleList: Array<string> = [
    "Congratulations!",
    "Great work!",
    "Splendid!",
    "Nice one!",
    "Awesome!"
];

export default function onMessageCreate(client: Client, message: OmitPartialGroupDMChannel<Message<boolean>>)
{
    if (message.author.id === client.user?.id || message.guildId == null || !checkMessage(message))
        return;

    let status = (new Finder(message.content)).getMatchingElements();
    if (status.isComplete)
    {
        setMessageTimeout(message.guildId);

        let embed: EmbedBuilder = new EmbedBuilder()
            .setTitle( titleList[ Math.floor( Math.random() * titleList.length ) ] )
            .setColor(Colors.LightGrey)
            .setDescription("Your message can be written down with nothing but chemical elements:\n* "
                + status.elementNames.join(", "));

        message.reply({ embeds: [embed] }).then(console.log).catch(console.error);
    }
}
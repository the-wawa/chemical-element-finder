import type { OmitPartialGroupDMChannel, Message } from "discord.js";

let timeoutList: {[key: string]: number} = {};

export function checkMessage(message: OmitPartialGroupDMChannel<Message<boolean>>): boolean
{
    let lastMessage = timeoutList[message.guildId ?? ""];
    if (lastMessage != undefined && Date.now() - lastMessage < 10000)
        return false;

    if (message.content.length < 10 || message.content.length > 100)
        return false;

    return true;
}

export function setMessageTimeout(guildId: string)
{
    timeoutList[guildId] = Date.now();
}
/**
 * @packageDocumentation
 * @module index
 */

import translate from "./scapers/translate"
import deepseekv1 from "./scapers/deepseek-coder-67b"

import { anoboy } from "./scapers/anoboy"
import { aio } from "./scapers/aio"

import * as func from "./utils/general"
import * as jawdalSholat from "./scapers/jadwal-sholat"
import * as Tiktok from "./scapers/tiktok"
import * as AniList from "./scapers/AniList"
import * as Github from "./scapers/github"
import * as Pin from "./scapers/pinterest"
import * as Animexin from "./scapers/Animexin"

export { anoboy, aio, translate, deepseekv1 }

export { AniList, Github, Pin, Tiktok, Animexin, func, jawdalSholat }
